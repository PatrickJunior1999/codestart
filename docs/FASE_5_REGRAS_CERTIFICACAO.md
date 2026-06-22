# Fase 5 — Regras reais de conclusão, avaliação final e certificado

Esta fase transforma o CodeStart de protótipo funcional em uma trilha com regras acadêmicas mais consistentes.

## O que mudou

- O quiz do módulo só fica realmente liberado após a atividade prática ser concluída corretamente.
- A função `submit_quiz_attempt` agora só marca o módulo como concluído quando:
  - a atividade prática do módulo foi concluída corretamente; e
  - o quiz do módulo teve nota igual ou superior a 70%.
- O próximo módulo só é desbloqueado quando o módulo anterior aparece como `completed` na tabela `progress`.
- Foi criada a rota `/avaliacao-final`.
- Foram criadas tabelas seguras para avaliação final:
  - `final_assessment_questions`
  - `final_assessment_answer_keys`
- O gabarito da avaliação final fica protegido no banco.
- Foi criada a função `submit_final_assessment` para corrigir a avaliação final no Supabase.
- Foi criada a função `issue_certificate` para emitir certificado apenas quando os requisitos forem cumpridos.
- Foi criada a função `validate_certificate` para validação pública por código.

## Migration necessária

Execute no Supabase:

```sql
supabase/migrations/005_completion_rules_final_assessment_certificates.sql
```

## Fluxo de teste recomendado

1. Faça login.
2. Abra o Módulo 1.
3. Confirme que o quiz aparece bloqueado enquanto a atividade não for concluída.
4. Faça a atividade prática.
5. Volte ao módulo e confirme que o quiz foi liberado.
6. Faça o quiz e obtenha 70% ou mais.
7. Verifique se o módulo foi salvo em `progress` como `completed`.
8. Repita o fluxo nos demais módulos.
9. Salve o Projeto Final em `/projeto-final`.
10. Abra `/avaliacao-final`.
11. Faça a avaliação final e obtenha 70% ou mais.
12. Abra `/certificado` e emita o certificado.
13. Abra a validação pública em `/validar/CODIGO_DO_CERTIFICADO`.

## Consultas úteis

### Ver módulos concluídos

```sql
select
  p.full_name,
  p.email,
  m.order_index,
  m.title,
  pr.status,
  pr.score,
  pr.xp_earned,
  pr.completed_at
from public.progress pr
join public.profiles p on p.id = pr.user_id
join public.modules m on m.id = pr.module_id
order by p.email, m.order_index;
```

### Ver atividades concluídas

```sql
select
  p.full_name,
  p.email,
  m.order_index,
  a.title as atividade,
  aa.is_correct,
  aa.completed_at
from public.activity_attempts aa
join public.profiles p on p.id = aa.user_id
join public.activities a on a.id = aa.activity_id
join public.modules m on m.id = a.module_id
order by aa.completed_at desc;
```

### Ver avaliação final

```sql
select
  p.full_name,
  p.email,
  faa.score,
  faa.correct_answers,
  faa.total_questions,
  faa.completed_at
from public.final_assessment_attempts faa
join public.profiles p on p.id = faa.user_id
order by faa.completed_at desc;
```

### Ver certificados emitidos

```sql
select
  p.full_name,
  p.email,
  c.certificate_code,
  c.course_name,
  c.workload_hours,
  c.issued_at,
  c.status
from public.certificates c
join public.profiles p on p.id = c.user_id
order by c.issued_at desc;
```
