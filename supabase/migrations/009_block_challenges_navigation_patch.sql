-- CodeStart v0.9.1
-- Ajustes dos desafios de blocos e correção de navegação no frontend.
-- Execute esta migration apenas se a 008 já tiver sido aplicada.

update public.activities a
set
  title = 'Desafio de blocos 2: Curva para a estrela',
  statement = 'LOGIC precisa virar antes de chegar ao objetivo. A estrela está no último quadrado da linha de baixo.',
  activity_data = '{"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["andar", "virar direita", "andar", "andar", "virar esquerda", "andar"], "require_goal": true, "maze": {"rows": 3, "cols": 3, "start": [0, 0], "goal": [2, 2], "direction": "east", "obstacles": [[0, 2]]}}'::jsonb,
  success_feedback = 'Excelente! Você fez a curva correta e levou LOGIC até a estrela no final do tabuleiro.',
  error_feedback = 'Ainda não chegou ao objetivo. Pense na curva: avance, vire para baixo, desça e depois vire para a estrela.'
from public.modules m
where a.module_id = m.id
  and m.order_index = 6
  and a.order_index = 2;

update public.activities a
set
  title = 'Desafio de blocos 3: Desviando do obstáculo',
  statement = 'Monte um caminho que desvie dos obstáculos e leve LOGIC até a estrela na parte superior do mapa.',
  activity_data = '{"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["virar direita", "andar", "andar", "virar esquerda", "andar", "andar", "andar", "virar esquerda", "andar", "andar", "virar esquerda", "andar"], "maze": {"rows": 3, "cols": 4, "start": [0, 0], "goal": [0, 2], "direction": "east", "obstacles": [[0, 1], [1, 2]]}}'::jsonb,
  success_feedback = 'Muito bem! Você desviou dos obstáculos e alcançou o objetivo.',
  error_feedback = 'Observe onde estão os obstáculos. O caminho direto está bloqueado, então será preciso contornar pelo mapa.'
from public.modules m
where a.module_id = m.id
  and m.order_index = 6
  and a.order_index = 3;

update public.activities a
set
  title = 'Desafio de blocos 4: Labirinto com menor caminho',
  statement = 'Chegue até a estrela usando a menor quantidade possível de movimentos de andar. O tabuleiro agora tem 5x5 e obstáculos formando um pequeno labirinto.',
  activity_data = '{"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["andar", "virar direita", "andar", "andar", "virar esquerda", "andar", "andar", "virar direita", "andar", "andar", "virar esquerda", "andar"], "max_moves": 8, "require_goal": true, "maze": {"rows": 5, "cols": 5, "start": [0, 0], "goal": [4, 4], "direction": "east", "obstacles": [[0, 2], [1, 0], [1, 2], [1, 4], [2, 4], [3, 1], [3, 2]]}}'::jsonb,
  success_feedback = 'Excelente! Você encontrou o menor caminho e levou LOGIC até a estrela sem bater nos obstáculos.',
  error_feedback = 'Ainda não foi dessa vez. Verifique a direção do LOGIC, evite os obstáculos e tente chegar à estrela com menos movimentos.'
from public.modules m
where a.module_id = m.id
  and m.order_index = 6
  and a.order_index = 4;
