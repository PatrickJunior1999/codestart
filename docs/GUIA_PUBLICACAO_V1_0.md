# Guia de publicação — CodeStart v1.0

Este guia descreve o fluxo recomendado para publicar o CodeStart em produção usando GitHub + Vercel ou Netlify + Supabase.

## 1. Antes de publicar

Confira localmente:

```bash
npm install
npm run build
npm run preview
```

Depois teste no navegador:

- cadastro de aluno;
- login;
- módulos;
- atividade prática;
- quiz;
- projeto final;
- avaliação final;
- emissão de certificado;
- validação pública do certificado;
- relatório de progresso;
- painel administrativo;
- status do sistema em `/admin/status`.

## 2. Publicação no GitHub

Na pasta do projeto:

```bash
git init
git add .
git commit -m "Publica CodeStart v1.0"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/codestart.git
git push -u origin main
```

Atenção: não envie `.env.local` para o GitHub. Ele já está no `.gitignore`.

## 3. Publicação na Vercel

1. Acesse a Vercel.
2. Importe o repositório GitHub.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Configure as variáveis de ambiente:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_DO_SUPABASE
VITE_APP_CERTIFICATE_BASE_URL=https://SEU-DOMINIO/validar
```

O arquivo `vercel.json` já evita erro 404 em rotas internas como `/dashboard`, `/admin` e `/validar/CODIGO`.

## 4. Publicação na Netlify

1. Acesse a Netlify.
2. Importe o repositório GitHub.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Configure as mesmas variáveis de ambiente.

O arquivo `public/_redirects` já evita erro 404 em rotas internas.

## 5. Configuração do Supabase em produção

Em **Authentication → URL Configuration**:

- Site URL: `https://SEU-DOMINIO`
- Redirect URLs:
  - `https://SEU-DOMINIO`
  - `https://SEU-DOMINIO/**`
  - `http://localhost:5173`
  - `http://localhost:5173/**`

Em desenvolvimento, a confirmação de e-mail pode ficar desativada. Em produção, você pode ativar caso queira um fluxo mais seguro.

## 6. Depois de publicar

Entre como administrador e acesse:

```text
/admin/status
```

O status deve confirmar:

- Supabase conectado;
- variáveis de ambiente configuradas;
- módulos carregados;
- lições carregadas;
- atividades carregadas;
- quizzes carregados;
- função de validação de certificado ativa;
- função administrativa ativa.

## 7. Ajuste do certificado

A variável `VITE_APP_CERTIFICATE_BASE_URL` precisa apontar para a URL pública correta. Exemplo:

```env
VITE_APP_CERTIFICATE_BASE_URL=https://codestart.vercel.app/validar
```

Isso garante que o QR Code do certificado leve para a página pública de validação.
