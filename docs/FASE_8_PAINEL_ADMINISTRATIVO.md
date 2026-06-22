# Fase 8 — Painel Administrativo

Esta fase ajusta o escopo da área de acompanhamento. Em vez de um perfil de professor, o CodeStart passa a usar um perfil de **administrador**, mais coerente com a proposta do projeto.

O sistema continua sendo um curso online autoinstrucional. O painel administrativo é uma área reservada para a equipe responsável acompanhar desempenho, conclusões e certificados.

## Nova rota

```text
/admin
```

A rota antiga `/painel-professor` foi mantida apenas como redirecionamento para `/admin`, evitando quebra caso ela tenha sido acessada antes.

## Perfis do sistema

Fluxo principal:

```text
student → aluno comum
admin   → equipe responsável pelo projeto
```

Por segurança, o cadastro público cria usuários comuns. O papel de administrador deve ser definido manualmente no Supabase.

## O que o painel mostra

- total de alunos cadastrados;
- progresso médio;
- quantidade de alunos prontos para certificação;
- quantidade de certificados emitidos;
- lista de alunos com:
  - nome;
  - e-mail;
  - escola;
  - turma;
  - módulos concluídos;
  - XP total;
  - situação do projeto final;
  - melhor nota da avaliação final;
  - status do certificado;
  - data de cadastro.

## Segurança

A leitura consolidada é feita pela função:

```text
get_admin_dashboard_report()
```

A função verifica o papel do usuário autenticado na tabela `profiles` e só retorna dados se o perfil for:

```text
admin
```

Alunos comuns não conseguem visualizar o painel.

## Como liberar acesso administrativo

No Supabase, depois de criar a conta normalmente pelo cadastro do sistema, rode no SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'SEU_EMAIL_AQUI';
```

Depois o usuário precisa sair e entrar novamente no CodeStart para o perfil ser recarregado.

## Migration necessária

Execute:

```text
supabase/migrations/007_admin_dashboard_report.sql
```

## Justificativa de escopo

O painel administrativo não transforma o CodeStart em uma plataforma escolar completa. Ele serve para a equipe do projeto de extensão acompanhar resultados e gerar evidências de participação, aprendizagem e certificação.
