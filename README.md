# CodeStart: Explorando o Mundo da Programação

Versão: **1.0.0 — Pacote de publicação e entrega final**

O CodeStart é um curso online autoinstrucional e gamificado para introdução à lógica de programação, pensamento computacional, pseudocódigo, programação em blocos e código visual.

Fluxo principal:

```text
Cadastro → Login → Centro de Missões → Conteúdo → Atividades → Quizzes → Projeto Final → Avaliação Final → Certificado
```

A área administrativa existe apenas para a equipe responsável pelo projeto acompanhar resultados e evidências de participação.

## Stack

- React + Vite + TypeScript
- Supabase Auth
- Supabase Postgres
- Row Level Security
- HTML5 Canvas
- QR Code para validação de certificado
- Impressão/PDF pelo navegador

## Rodando localmente

```bash
npm install
npm run dev
```

Crie um arquivo `.env.local` com base em `.env.example`:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_DO_SUPABASE
VITE_APP_CERTIFICATE_BASE_URL=http://localhost:5173/validar
```

## Build local

```bash
npm run build
npm run preview
```

## Migrations

Execute no Supabase, em ordem:

```text
001_initial_schema.sql
002_auth_profile_improvements.sql
003_seed_course_content_and_quizzes.sql
004_activity_attempts_permissions.sql
005_completion_rules_final_assessment_certificates.sql
006_fix_certificate_generation.sql
007_admin_dashboard_report.sql
008_visual_pedagogical_rework.sql
009_block_challenges_navigation_patch.sql
010_fix_block_challenge_2_and_animation_focus.sql
011_pseudocode_visual_guided_activities.sql
```

## Regras principais

Módulo concluído:

```text
atividade prática concluída + quiz aprovado com 70% ou mais
```

Avaliação final liberada:

```text
todos os módulos concluídos + projeto final salvo
```

Certificado liberado:

```text
todos os módulos concluídos + projeto final salvo + avaliação final com 70% ou mais
```

## Rotas principais

- `/` — página inicial
- `/sobre` — apresentação do curso
- `/privacidade` — política de privacidade/LGPD
- `/termos` — termos de uso
- `/dashboard` — centro de missões
- `/modulo/:moduleId` — conteúdo do módulo
- `/modulo/:moduleId/atividade` — atividades práticas
- `/modulo/:moduleId/quiz` — quiz do módulo
- `/projeto-final` — projeto final
- `/avaliacao-final` — avaliação final
- `/certificado` — emissão e visualização do certificado
- `/validar/:codigo` — validação pública do certificado
- `/meu-progresso` — relatório individual
- `/admin` — painel administrativo
- `/admin/status` — diagnóstico para publicação

## Administrador

Ninguém escolhe ser administrador no cadastro. Para liberar acesso administrativo, promova o usuário pelo Supabase:

```sql
update public.profiles
set role = 'admin'
where email = 'SEU_EMAIL_AQUI';
```

Depois saia e entre novamente no sistema.

## Publicação

Use os arquivos:

- `DEPLOY.md`
- `TESTES_FINAIS.md`
- `docs/GUIA_PUBLICACAO_V1_0.md`
- `docs/CHECKLIST_TESTES_FINAIS_V1_0.md`

Antes de publicar, configure as variáveis de produção na Vercel ou Netlify:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_DO_SUPABASE
VITE_APP_CERTIFICATE_BASE_URL=https://SEU-DOMINIO/validar
```

Depois de publicar, acesse `/admin/status` com um usuário administrador para validar o ambiente.

## Documentação útil

- `docs/FASE_14_PUBLICACAO_V1_0.md`
- `docs/ROTEIRO_APRESENTACAO_V1_0.md`
- `docs/GUIA_PUBLICACAO_V1_0.md`
- `docs/CHECKLIST_TESTES_FINAIS_V1_0.md`


## Atualização v1.0.2

- Módulo 8 e Projeto Final agora usam imagem de referência visual em vez de código pronto.
- Editor visual inicia em branco para estimular resolução própria do aluno.
- Ajuda de comandos passou a mostrar sintaxe genérica, sem entregar uma solução.
- Cadastro preparado para confirmação de e-mail pelo Supabase Auth.
- Adicionada migration `012_visual_reference_email_validation_patch.sql` para remover `starter_code` das atividades já cadastradas no banco.
