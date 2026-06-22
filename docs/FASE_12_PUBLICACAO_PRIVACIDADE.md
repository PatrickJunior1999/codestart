# Fase 12 — Preparação para publicação, páginas institucionais e LGPD

## Objetivo

A fase 12 organiza o CodeStart para uma entrega mais próxima de produção, adicionando páginas públicas de contextualização, privacidade e termos de uso.

## O que foi implementado

- Nova rota pública `/sobre`.
- Nova rota pública `/privacidade`.
- Nova rota pública `/termos`.
- Link para “Sobre o curso” na tela inicial.
- Links de privacidade e termos no cadastro.
- Link “Sobre” no topo do ambiente autenticado.
- Explicação pública da proposta pedagógica, carga horária, público-alvo e critérios de certificação.
- Texto simples de privacidade e LGPD para justificar uso de dados de cadastro, progresso, atividades e certificado.
- Termos de uso para reforçar o caráter educacional do curso.

## Páginas criadas

### `/sobre`

Apresenta:

- proposta do CodeStart;
- público-alvo;
- metodologia por missões;
- funcionamento do curso;
- critérios de certificação;
- papel do mascote LOGIC.

### `/privacidade`

Explica:

- quais dados são coletados;
- finalidade do uso;
- validação pública do certificado;
- acesso administrativo;
- segurança e uso do Supabase;
- possibilidade de solicitação de revisão/correção/exclusão em cenário real.

### `/termos`

Explica:

- uso educacional;
- responsabilidade da conta do aluno;
- regras de certificação;
- projeto final;
- área administrativa restrita.

## Observação importante

Os textos desta fase são adequados para protótipo acadêmico/projeto de extensão. Para uso institucional real, recomenda-se revisão jurídica ou validação pela instituição responsável.

## Critério de aceite

A fase está validada se:

- `/sobre` abre sem login;
- `/privacidade` abre sem login;
- `/termos` abre sem login;
- o cadastro exibe links para privacidade e termos;
- o topo autenticado exibe acesso rápido para “Sobre”;
- nenhuma regra de banco, certificado ou progresso foi quebrada.
