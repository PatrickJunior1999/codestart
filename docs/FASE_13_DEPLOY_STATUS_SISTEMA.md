# Fase 13 — Preparação para deploy e status do sistema

Esta fase prepara o CodeStart para publicação em Vercel ou Netlify e adiciona uma tela administrativa de diagnóstico.

## Novidades

- Nova rota administrativa: `/admin/status`.
- Tela de status do sistema com verificação de:
  - URL do Supabase;
  - chave pública do Supabase;
  - base de validação do certificado;
  - sessão autenticada;
  - quantidade de módulos, lições, atividades, quizzes e questões da avaliação final;
  - função do painel administrativo;
  - função pública de validação de certificado.
- Arquivo `vercel.json` para fallback de SPA.
- Arquivo `public/_redirects` para fallback de SPA no Netlify.
- Arquivo `public/robots.txt`.
- Arquivo `.env.production.example`.

## Por que isso é importante

Aplicações React com React Router precisam de fallback para `index.html` em produção. Sem isso, rotas como `/certificado`, `/admin` ou `/validar/CODIGO` podem retornar erro 404 quando acessadas diretamente.

A tela `/admin/status` ajuda a detectar problemas antes da apresentação ou publicação, principalmente:

- URL do Supabase errada;
- uso acidental da URL com `/rest/v1`;
- QR Code apontando para localhost;
- migrations não executadas;
- funções RPC ausentes.

## Variáveis de ambiente em produção

Configure na Vercel ou Netlify:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_DO_SUPABASE
VITE_APP_CERTIFICATE_BASE_URL=https://SEU-DOMINIO/validar
```

Nunca use a secret key do Supabase no frontend.

## Configuração do Supabase Auth

Depois do deploy, acesse:

```text
Supabase → Authentication → URL Configuration
```

Configure:

```text
Site URL: https://SEU-DOMINIO
Redirect URLs:
https://SEU-DOMINIO
https://SEU-DOMINIO/**
http://localhost:5173
http://localhost:5173/**
```

## Checklist final

1. Rodar `npm install`.
2. Rodar `npm run build`.
3. Publicar no Vercel ou Netlify.
4. Configurar variáveis de ambiente.
5. Atualizar as URLs no Supabase Auth.
6. Entrar como admin.
7. Acessar `/admin/status`.
8. Confirmar que não há erros críticos.
9. Emitir um certificado de teste.
10. Validar o QR Code no domínio publicado.
