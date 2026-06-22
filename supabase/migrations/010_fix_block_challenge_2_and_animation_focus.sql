-- CodeStart v0.9.2
-- Ajusta a regra do Desafio de Blocos 2 para aceitar qualquer rota válida até a estrela.
-- O foco visual da animação é corrigido no frontend; esta migration corrige apenas os dados do Supabase.

update public.activities
set activity_data = jsonb_set(
  activity_data,
  '{require_goal}',
  'true'::jsonb,
  true
),
error_feedback = 'Ainda não foi dessa vez. O importante é levar LOGIC até a estrela sem bater no obstáculo. Revise a direção inicial, as viradas e tente novamente.'
where title = 'Desafio de blocos 2: Curva para a estrela'
  and activity_type = 'block_programming';
