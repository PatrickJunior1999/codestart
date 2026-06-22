# Fase 3 — Conteúdo e Quizzes

## Objetivo

Popular o banco do Supabase com o conteúdo pedagógico inicial dos 8 módulos, atividades práticas e quizzes com gabarito protegido.

## Arquivo SQL

Execute no SQL Editor do Supabase:

```text
supabase/migrations/003_seed_course_content_and_quizzes.sql
```

## O que esta migration faz

- Insere lições dos 8 módulos;
- Insere atividades práticas iniciais;
- Insere 40 questões de quiz;
- Distribui respostas corretas entre A, B, C e D;
- Cria/atualiza a função `submit_quiz_attempt`;
- Salva tentativa de quiz;
- Conclui módulo automaticamente quando a nota é maior ou igual a 70%;
- Registra XP no progresso.

## Teste recomendado

1. Faça login no CodeStart.
2. Abra o Módulo 1.
3. Verifique se as lições aparecem.
4. Clique em “Ir para o quiz”.
5. Responda todas as questões.
6. Envie as respostas.
7. Confirme se o resultado aparece.
8. Se aprovado, confira no Supabase se a tabela `progress` recebeu o módulo concluído.
