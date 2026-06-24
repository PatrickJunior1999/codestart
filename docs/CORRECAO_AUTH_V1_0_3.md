# Correção Auth v1.0.3

Esta versão corrige instabilidade no login real com Supabase.

## Problema observado

Em produção, após entrar com uma conta real, a interface podia abrir rapidamente, voltar para a tela de login e depois exibir `Request rate limit reached`.

## Causa provável

O `AuthContext` carregava o perfil do usuário fazendo uma consulta ao Supabase dentro do callback `onAuthStateChange`. Isso pode causar travamento/instabilidade no cliente `supabase-js` e disparar novas tentativas de autenticação.

## Correção

- O callback `onAuthStateChange` agora apenas agenda a hidratação da sessão com `setTimeout(..., 0)`.
- O login com e-mail/senha agora hidrata o perfil antes de redirecionar o usuário.
- A mensagem de rate limit foi traduzida para uma orientação mais amigável.

## Observação

Não há nova migration nesta versão. Basta atualizar o código, rodar build e enviar para o GitHub/Vercel.
