-- CodeStart v0.5
-- Regras reais de conclusão, avaliação final e emissão de certificado verificável.

create extension if not exists "pgcrypto";

grant usage on schema public to anon, authenticated;

-- =========================================================
-- 1. Avaliação final
-- =========================================================

create table if not exists public.final_assessment_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  order_index int not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.final_assessment_answer_keys (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null unique references public.final_assessment_questions(id) on delete cascade,
  correct_option char(1) not null check (correct_option in ('A', 'B', 'C', 'D')),
  explanation text not null,
  created_at timestamptz not null default now()
);

alter table public.final_assessment_questions enable row level security;
alter table public.final_assessment_answer_keys enable row level security;
alter table public.final_assessment_attempts enable row level security;

drop policy if exists "Qualquer pessoa pode visualizar avaliação final ativa" on public.final_assessment_questions;
create policy "Qualquer pessoa pode visualizar avaliação final ativa"
on public.final_assessment_questions
for select
to anon, authenticated
using (is_active = true);

-- Intencionalmente sem SELECT público na tabela final_assessment_answer_keys.

drop policy if exists "Aluno pode visualizar suas avaliações finais" on public.final_assessment_attempts;
create policy "Aluno pode visualizar suas avaliações finais"
on public.final_assessment_attempts
for select
to authenticated
using (auth.uid() = user_id);

grant select on public.final_assessment_questions to anon, authenticated;
grant select on public.final_assessment_attempts to authenticated;

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
(1, 'Uma turma precisa organizar uma feira de ciências. Qual ação representa melhor a decomposição do problema?', 'Escolher apenas uma pessoa para resolver tudo sozinha.', 'Dividir o trabalho em etapas como tema, materiais, apresentação e organização do espaço.', 'Começar a apresentação sem planejamento.', 'Ignorar tarefas pequenas para economizar tempo.', true),
(2, 'Em um jogo, o personagem deve andar três casas, virar à direita e andar mais duas. O que essa descrição representa?', 'Uma sequência de instruções.', 'Uma senha criptografada.', 'Um erro de repetição.', 'Um banco de dados.', true),
(3, 'Ao perceber que todo labirinto começa com a mesma sequência de movimentos, o estudante está usando qual habilidade?', 'Abstração de dados pessoais.', 'Reconhecimento de padrões.', 'Exclusão de comandos.', 'Instalação de programas.', true),
(4, 'Qual alternativa melhor descreve um algoritmo?', 'Um desenho feito sem lógica definida.', 'Uma lista de passos organizada para resolver um problema.', 'Um erro que impede o programa de funcionar.', 'Um programa que só funciona com internet.', true),
(5, 'Na regra “se a senha estiver correta, permitir acesso; senão, mostrar erro”, qual conceito aparece?', 'Repetição obrigatória.', 'Variável visual.', 'Condicional.', 'Aleatoriedade.', true),
(6, 'Quando usamos “repita 5 vezes: andar”, qual problema estamos evitando?', 'Digitar o mesmo comando várias vezes sem necessidade.', 'Criar uma decisão falsa.', 'Transformar texto em imagem.', 'Apagar a lógica do programa.', true),
(7, 'Em programação em blocos, qual é a principal vantagem pedagógica?', 'Eliminar completamente o raciocínio lógico.', 'Facilitar a visualização da sequência e da estrutura dos comandos.', 'Substituir qualquer necessidade de pensar.', 'Impedir o uso de condições.', true),
(8, 'O bloco “andar” pode ser relacionado em código textual a qual comando?', 'andar();', 'se();', 'repita();', 'cor azul;', true),
(9, 'No editor visual do CodeStart, por que usamos comandos controlados em vez de JavaScript livre?', 'Para dificultar o uso do sistema.', 'Para impedir qualquer criatividade.', 'Para manter a atividade segura e adequada ao objetivo educacional.', 'Para remover a necessidade de salvar dados.', true),
(10, 'Qual conjunto atende melhor ao projeto final visual?', 'Apenas escrever uma frase sem comandos.', 'Usar pelo menos cor, círculo, retângulo e linha em uma sequência lógica.', 'Usar somente comandos inválidos.', 'Salvar o projeto sem prévia.', true)
on conflict (order_index) do update
set question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d,
    is_active = excluded.is_active;

with answer_keys(order_index, correct_option, explanation) as (
  values
  (1, 'B', 'Decompor é dividir um problema maior em partes menores e manejáveis.'),
  (2, 'A', 'A descrição apresenta uma sequência ordenada de comandos.'),
  (3, 'B', 'Identificar comportamentos repetidos é reconhecimento de padrões.'),
  (4, 'B', 'Algoritmo é uma sequência organizada de passos para resolver um problema.'),
  (5, 'C', 'A estrutura se/senão representa uma decisão condicional.'),
  (6, 'A', 'Laços evitam repetição manual desnecessária de comandos iguais.'),
  (7, 'B', 'Blocos ajudam o aluno a visualizar sequência, repetição e condição.'),
  (8, 'A', 'O bloco andar pode ser representado por um comando textual como andar();.'),
  (9, 'C', 'A linguagem controlada reduz riscos e mantém o foco pedagógico.'),
  (10, 'B', 'O projeto final precisa demonstrar comandos visuais e sequência lógica.')
)
insert into public.final_assessment_answer_keys (question_id, correct_option, explanation)
select q.id, k.correct_option, k.explanation
from public.final_assessment_questions q
join answer_keys k on k.order_index = q.order_index
on conflict (question_id) do update
set correct_option = excluded.correct_option,
    explanation = excluded.explanation;

-- =========================================================
-- 2. Estado real de conclusão do módulo
-- =========================================================

create or replace function public.get_module_completion_state(
  p_module_id uuid
)
returns table (
  total_activities int,
  completed_activities int,
  activity_completed boolean,
  best_quiz_score numeric,
  quiz_passed boolean,
  module_completed boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  return query
  with activity_stats as (
    select
      count(a.id)::int as total_activities,
      count(aa.id)::int as completed_activities
    from public.activities a
    left join public.activity_attempts aa
      on aa.activity_id = a.id
      and aa.user_id = v_user_id
      and aa.is_correct = true
    where a.module_id = p_module_id
  ),
  quiz_stats as (
    select coalesce(max(qa.score), 0)::numeric as best_quiz_score
    from public.quiz_attempts qa
    where qa.user_id = v_user_id
      and qa.module_id = p_module_id
  ),
  progress_stats as (
    select exists (
      select 1
      from public.progress pr
      where pr.user_id = v_user_id
        and pr.module_id = p_module_id
        and pr.status = 'completed'
    ) as module_completed
  )
  select
    ast.total_activities,
    ast.completed_activities,
    (ast.total_activities = 0 or ast.completed_activities >= ast.total_activities) as activity_completed,
    qs.best_quiz_score,
    (qs.best_quiz_score >= 70) as quiz_passed,
    ps.module_completed
  from activity_stats ast, quiz_stats qs, progress_stats ps;
end;
$$;

grant execute on function public.get_module_completion_state(uuid) to authenticated;

-- =========================================================
-- 3. Correção do quiz com regra real de conclusão
-- =========================================================

drop function if exists public.submit_quiz_attempt(uuid, jsonb);

create function public.submit_quiz_attempt(
  p_module_id uuid,
  p_answers jsonb
)
returns table (
  score numeric,
  total_questions int,
  correct_answers int,
  passed boolean,
  module_completed boolean,
  completion_message text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_total int;
  v_correct int;
  v_score numeric;
  v_passed boolean;
  v_xp int;
  v_total_activities int;
  v_completed_activities int;
  v_activity_completed boolean;
  v_module_completed boolean;
  v_message text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  select count(*)
  into v_total
  from public.quiz_questions
  where module_id = p_module_id;

  if v_total = 0 then
    raise exception 'Este módulo não possui questões cadastradas.';
  end if;

  select count(*)
  into v_correct
  from jsonb_to_recordset(p_answers)
  as ans(question_id uuid, selected_option text)
  join public.quiz_answer_keys key
    on key.question_id = ans.question_id
  join public.quiz_questions q
    on q.id = ans.question_id
  where q.module_id = p_module_id
    and upper(ans.selected_option) = key.correct_option;

  v_score := round((v_correct::numeric / v_total::numeric) * 100, 2);
  v_passed := v_score >= 70;

  insert into public.quiz_attempts (
    user_id,
    module_id,
    score,
    total_questions,
    correct_answers,
    answers
  )
  values (
    v_user_id,
    p_module_id,
    v_score,
    v_total,
    v_correct,
    p_answers
  );

  select count(*)
  into v_total_activities
  from public.activities
  where module_id = p_module_id;

  select count(*)
  into v_completed_activities
  from public.activities a
  join public.activity_attempts aa
    on aa.activity_id = a.id
  where a.module_id = p_module_id
    and aa.user_id = v_user_id
    and aa.is_correct = true;

  v_activity_completed := v_total_activities = 0 or v_completed_activities >= v_total_activities;
  v_module_completed := v_passed and v_activity_completed;

  if v_module_completed then
    select xp_reward
    into v_xp
    from public.modules
    where id = p_module_id;

    insert into public.progress (
      user_id,
      module_id,
      status,
      score,
      xp_earned,
      started_at,
      completed_at
    )
    values (
      v_user_id,
      p_module_id,
      'completed',
      v_score,
      v_xp,
      now(),
      now()
    )
    on conflict (user_id, module_id)
    do update set
      status = 'completed',
      score = greatest(coalesce(public.progress.score, 0), excluded.score),
      xp_earned = greatest(coalesce(public.progress.xp_earned, 0), excluded.xp_earned),
      completed_at = coalesce(public.progress.completed_at, now()),
      updated_at = now();

    v_message := 'Atividade prática concluída e quiz aprovado. Módulo concluído.';
  elsif v_passed and not v_activity_completed then
    v_message := 'Quiz aprovado, mas o módulo ainda exige atividade prática concluída.';
  else
    v_message := 'Quiz abaixo de 70%. Revise o conteúdo e tente novamente.';
  end if;

  return query
  select v_score, v_total, v_correct, v_passed, v_module_completed, v_message;
end;
$$;

grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;

-- =========================================================
-- 4. Correção da avaliação final
-- =========================================================

create or replace function public.submit_final_assessment(
  p_answers jsonb
)
returns table (
  score numeric,
  total_questions int,
  correct_answers int,
  passed boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_total int;
  v_correct int;
  v_score numeric;
  v_passed boolean;
  v_total_modules int;
  v_completed_modules int;
  v_has_project boolean;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  select count(*)
  into v_total_modules
  from public.modules
  where is_active = true;

  select count(*)
  into v_completed_modules
  from public.progress pr
  join public.modules m on m.id = pr.module_id
  where pr.user_id = v_user_id
    and pr.status = 'completed'
    and m.is_active = true;

  if v_completed_modules < v_total_modules then
    raise exception 'Avaliação final bloqueada: conclua todos os módulos primeiro.';
  end if;

  select exists (
    select 1
    from public.final_projects fp
    where fp.user_id = v_user_id
      and fp.status = 'submitted'
  )
  into v_has_project;

  if not v_has_project then
    raise exception 'Avaliação final bloqueada: salve o projeto final primeiro.';
  end if;

  select count(*)
  into v_total
  from public.final_assessment_questions
  where is_active = true;

  if v_total = 0 then
    raise exception 'A avaliação final ainda não possui questões cadastradas.';
  end if;

  select count(*)
  into v_correct
  from jsonb_to_recordset(p_answers)
  as ans(question_id uuid, selected_option text)
  join public.final_assessment_answer_keys key
    on key.question_id = ans.question_id
  join public.final_assessment_questions q
    on q.id = ans.question_id
  where q.is_active = true
    and upper(ans.selected_option) = key.correct_option;

  v_score := round((v_correct::numeric / v_total::numeric) * 100, 2);
  v_passed := v_score >= 70;

  insert into public.final_assessment_attempts (
    user_id,
    score,
    total_questions,
    correct_answers,
    answers
  )
  values (
    v_user_id,
    v_score,
    v_total,
    v_correct,
    p_answers
  );

  return query
  select v_score, v_total, v_correct, v_passed;
end;
$$;

grant execute on function public.submit_final_assessment(jsonb) to authenticated;

-- =========================================================
-- 5. Validação pública e emissão do certificado
-- =========================================================

create or replace function public.validate_certificate(
  p_certificate_code text
)
returns table (
  is_valid boolean,
  student_name text,
  course_name text,
  workload_hours int,
  issued_at timestamptz,
  certificate_code text,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    case when c.status = 'valid' then true else false end as is_valid,
    p.full_name as student_name,
    c.course_name,
    c.workload_hours,
    c.issued_at,
    c.certificate_code,
    c.status::text
  from public.certificates c
  join public.profiles p
    on p.id = c.user_id
  where c.certificate_code = p_certificate_code;
end;
$$;

grant execute on function public.validate_certificate(text) to anon, authenticated;

create or replace function public.issue_certificate()
returns table (
  certificate_code text,
  course_name text,
  workload_hours int,
  issued_at timestamptz,
  validation_hash text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_total_modules int;
  v_completed_modules int;
  v_has_project boolean;
  v_best_final_score numeric;
  v_code text;
  v_hash text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  if exists (
    select 1
    from public.certificates c
    where c.user_id = v_user_id
      and c.status = 'valid'
  ) then
    return query
    select
      c.certificate_code,
      c.course_name,
      c.workload_hours,
      c.issued_at,
      c.validation_hash
    from public.certificates c
    where c.user_id = v_user_id
      and c.status = 'valid'
    limit 1;

    return;
  end if;

  select count(*)
  into v_total_modules
  from public.modules
  where is_active = true;

  select count(*)
  into v_completed_modules
  from public.progress pr
  join public.modules m
    on m.id = pr.module_id
  where pr.user_id = v_user_id
    and pr.status = 'completed'
    and m.is_active = true;

  if v_completed_modules < v_total_modules then
    raise exception 'Certificado bloqueado: módulos pendentes.';
  end if;

  select exists (
    select 1
    from public.final_projects fp
    where fp.user_id = v_user_id
      and fp.status = 'submitted'
  )
  into v_has_project;

  if not v_has_project then
    raise exception 'Certificado bloqueado: projeto final pendente.';
  end if;

  select max(score)
  into v_best_final_score
  from public.final_assessment_attempts faa
  where faa.user_id = v_user_id;

  if coalesce(v_best_final_score, 0) < 70 then
    raise exception 'Certificado bloqueado: avaliação final inferior a 70%%.';
  end if;

  loop
    v_code := 'CS-' || extract(year from now())::text || '-' || upper(substr(md5(random()::text || clock_timestamp()::text || v_user_id::text), 1, 8));
    exit when not exists (select 1 from public.certificates c where c.certificate_code = v_code);
  end loop;

  v_hash := md5(v_code || v_user_id::text || clock_timestamp()::text);

  insert into public.certificates (
    user_id,
    certificate_code,
    validation_hash
  )
  values (
    v_user_id,
    v_code,
    v_hash
  );

  return query
  select
    c.certificate_code,
    c.course_name,
    c.workload_hours,
    c.issued_at,
    c.validation_hash
  from public.certificates c
  where c.user_id = v_user_id
    and c.certificate_code = v_code
  limit 1;
end;
$$;

grant execute on function public.issue_certificate() to authenticated;

grant select on public.modules to anon, authenticated;
grant select on public.lessons to anon, authenticated;
grant select on public.activities to authenticated;
grant select on public.activity_attempts to authenticated;
grant select on public.quiz_questions to anon, authenticated;
grant select on public.quiz_attempts to authenticated;
grant select on public.progress to authenticated;
grant select, insert, update on public.final_projects to authenticated;
grant select on public.final_assessment_attempts to authenticated;
grant select on public.certificates to authenticated;
