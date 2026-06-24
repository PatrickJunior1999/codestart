# Massa de teste para o Painel Administrativo

Este projeto inclui o script `scripts/seed-admin-report.mjs` para criar uma base fictícia de alunos no Supabase.

## O que ele cria

- 34 alunos fictícios;
- 18 alunos com curso concluído;
- 16 alunos em diferentes estágios do curso;
- perfis com nomes, escolas e turmas fictícias;
- progresso nos módulos;
- tentativas de atividades;
- tentativas de quiz;
- projetos finais para concluintes;
- avaliação final para concluintes;
- certificados emitidos para concluintes.

Todos os e-mails usam o domínio fictício:

```text
@codestart.test
```

A senha padrão dessas contas é:

```text
Teste123!
```

## Como configurar

Crie o arquivo `.env.seed` na raiz do projeto:

```env
SUPABASE_URL=https://muvedygfipyqhbrqsyvt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY_AQUI
```

A `SUPABASE_SERVICE_ROLE_KEY` deve ser copiada do Supabase em:

```text
Project Settings → API → service_role key
```

Nunca coloque essa chave no GitHub, Vercel ou código frontend.

## Como executar

Na raiz do projeto, execute:

```bash
npm run seed:admin-report
```

Ou diretamente:

```bash
node scripts/seed-admin-report.mjs
```

Depois acesse:

```text
https://codestart-ivory.vercel.app/admin
```

ou localmente:

```text
http://localhost:5173/admin
```

## Como apagar a massa fictícia

Execute novamente o script. Ele limpa os usuários `@codestart.test` antes de recriar a massa.

Se quiser remover manualmente, use a interface do Supabase Authentication para excluir os usuários com domínio `@codestart.test`.
