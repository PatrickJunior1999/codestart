# CodeStart v1.0.6 — Verificação de e-mail e recuperação de senha

Esta versão prepara o fluxo completo de autenticação por e-mail no Supabase:

- cadastro com redirecionamento para `/login?confirmed=1` após confirmação de e-mail;
- mensagem de login para e-mail confirmado;
- botão para reenviar e-mail de confirmação;
- recuperação de senha com redirecionamento para `/nova-senha`;
- página pública `/nova-senha` para definir a nova senha;
- tratamento de mensagens comuns de autenticação, como e-mail não confirmado, credenciais inválidas e rate limit.

## Configuração necessária no Supabase

Em `Authentication > URL Configuration`:

- Site URL: `https://codestart-ivory.vercel.app`
- Redirect URLs:
  - `https://codestart-ivory.vercel.app`
  - `https://codestart-ivory.vercel.app/**`
  - `http://localhost:5173`
  - `http://localhost:5173/**`

Em `Authentication > Providers > Email`:

- manter Email provider ativado;
- ativar `Confirm email` para exigir confirmação de cadastro;
- manter recuperação de senha habilitada.

## Recomendações

O provedor padrão de e-mails do Supabase possui limites baixos. Para uso real com muitos alunos, configure SMTP próprio em `Authentication > Emails > SMTP Settings`.

## Testes

1. Criar conta com e-mail real.
2. Confirmar pelo link recebido.
3. Fazer login.
4. Acessar `Esqueci minha senha`.
5. Receber o e-mail de recuperação.
6. Abrir `/nova-senha` pelo link.
7. Definir nova senha.
8. Fazer login com a nova senha.
