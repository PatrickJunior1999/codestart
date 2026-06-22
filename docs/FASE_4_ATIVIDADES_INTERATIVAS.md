# Fase 4 — Atividades Interativas

A versão v0.4 implementa a camada prática do CodeStart.

## Funcionalidades implementadas

- Renderização de atividades a partir da tabela `activities`;
- Atividade de ordenação;
- Atividade de associação;
- Atividade de programação em blocos;
- Editor visual seguro com Canvas;
- Salvamento das tentativas em `activity_attempts`;
- Projeto final com salvamento em `final_projects`.

## Migration obrigatória

Execute no Supabase:

```sql
supabase/migrations/004_activity_attempts_permissions.sql
```

## Critérios de aceite

- O aluno acessa `/modulo/:id/atividade`;
- A atividade é carregada pelo Supabase;
- A tentativa é salva no banco;
- O editor visual não executa JavaScript livre;
- O projeto final é salvo em `final_projects`;
- O fluxo continua até o quiz.
