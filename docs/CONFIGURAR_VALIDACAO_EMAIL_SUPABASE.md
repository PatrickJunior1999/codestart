# Configurar validação de e-mail no Supabase

Esta versão já está preparada no frontend para confirmação de e-mail:

- o cadastro usa `emailRedirectTo` apontando para `/login?email_confirmed=1`;
- a tela de login mostra mensagem amigável quando o e-mail foi confirmado;
- se o usuário tentar entrar sem confirmar, o sistema informa que é necessário verificar a caixa de entrada.

## Passo a passo no Supabase

1. Acesse o projeto no Supabase.
2. Vá em **Authentication**.
3. Entre em **Providers** ou **Sign In / Providers**.
4. Abra o provedor **Email**.
5. Ative a opção de confirmação de e-mail, normalmente chamada de **Confirm email**.
6. Salve.

## URLs que precisam estar liberadas

Em **Authentication → URL Configuration**, mantenha:

```text
Site URL:
https://codestart-ivory.vercel.app
```

Em **Redirect URLs**, mantenha:

```text
https://codestart-ivory.vercel.app
https://codestart-ivory.vercel.app/**
http://localhost:5173
http://localhost:5173/**
```

## Fluxo esperado

1. Aluno cria conta.
2. Supabase envia e-mail de confirmação.
3. Aluno clica no link enviado.
4. Aluno volta para `/login?email_confirmed=1`.
5. Sistema mostra a mensagem de e-mail confirmado.
6. Aluno faz login normalmente.

## Observação

Se estiver testando localmente, o e-mail também pode redirecionar para `http://localhost:5173/login?email_confirmed=1`, desde que o localhost esteja cadastrado em Redirect URLs.
