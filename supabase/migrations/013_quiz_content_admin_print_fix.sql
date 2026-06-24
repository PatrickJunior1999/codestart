-- CodeStart v1.0.4
-- Ajusta questões que falavam sobre metodologia/projeto e corrige foco das avaliações
-- para conteúdos dos módulos. A correção de impressão do painel admin é no frontend.

-- =========================================================
-- 1. Quiz do Módulo 8: remover perguntas sobre justificativa da ferramenta/projeto
-- =========================================================

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select
    m.id,
    'Qual comando desenha uma linha do ponto (40, 310) até o ponto (440, 310)?',
    'linha 40 310 440 310',
    'retangulo 40 310 440 310',
    'circulo 40 310 440 310',
    'cor 40 310 440 310',
    3
  from public.modules m
  where m.order_index = 8
  on conflict (module_id, order_index) do update
  set question = excluded.question,
      option_a = excluded.option_a,
      option_b = excluded.option_b,
      option_c = excluded.option_c,
      option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select
  id,
  'A',
  'O comando linha usa quatro coordenadas: x inicial, y inicial, x final e y final.'
from q
on conflict (question_id) do update
set correct_option = excluded.correct_option,
    explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select
    m.id,
    'Para desenhar uma árvore simples no editor visual, qual combinação de formas faz mais sentido?',
    'Apenas uma linha solta no meio da tela.',
    'Retângulo para o tronco e círculos para a copa.',
    'Somente um triângulo sem cor.',
    'Apenas escrever o nome árvore no editor.',
    5
  from public.modules m
  where m.order_index = 8
  on conflict (module_id, order_index) do update
  set question = excluded.question,
      option_a = excluded.option_a,
      option_b = excluded.option_b,
      option_c = excluded.option_c,
      option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select
  id,
  'B',
  'Uma árvore pode ser decomposta em formas simples: retângulo para tronco e círculos para folhas/copa.'
from q
on conflict (question_id) do update
set correct_option = excluded.correct_option,
    explanation = excluded.explanation;

-- =========================================================
-- 2. Avaliação final: trocar perguntas sobre projeto/metodologia por conteúdo
-- =========================================================

insert into public.final_assessment_questions (
  order_index,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  is_active
)
values
(
  7,
  'Em um desafio de blocos, LOGIC precisa andar cinco casas em linha reta. Qual solução representa melhor o uso de repetição?',
  'Colocar comandos aleatórios até o LOGIC se mover.',
  'Usar uma estrutura “repita 5 vezes” com o comando andar dentro dela.',
  'Virar direita cinco vezes sem andar.',
  'Usar apenas um comando de cor.',
  true
),
(
  9,
  'No editor visual, qual comando representa corretamente um triângulo usando três pontos?',
  'triangulo 100 100 60',
  'retangulo 60 120 180',
  'triangulo 70 180 170 90 270 180',
  'circulo 70 180 170 90 270 180',
  true
),
(
  10,
  'Para construir uma cena com casa, árvore e sol, qual estratégia mostra melhor a decomposição do problema?',
  'Tentar desenhar tudo com um único comando, sem planejar.',
  'Separar a cena em partes: casa, árvore, sol e chão, escolhendo formas para cada parte.',
  'Usar somente comandos de cor e nenhum desenho.',
  'Ignorar a posição dos objetos na tela.',
  true
)
on conflict (order_index) do update
set question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d,
    is_active = excluded.is_active;

with answer_keys(order_index, correct_option, explanation) as (
  values
  (7, 'B', 'A repetição permite executar o mesmo comando várias vezes com menos blocos e mais organização.'),
  (9, 'C', 'O triângulo é definido por três pontos, ou seja, seis coordenadas: x1 y1, x2 y2 e x3 y3.'),
  (10, 'B', 'Decompor a cena em partes menores facilita planejar os comandos e organizar o desenho.')
)
insert into public.final_assessment_answer_keys (question_id, correct_option, explanation)
select q.id, k.correct_option, k.explanation
from public.final_assessment_questions q
join answer_keys k on k.order_index = q.order_index
on conflict (question_id) do update
set correct_option = excluded.correct_option,
    explanation = excluded.explanation;
