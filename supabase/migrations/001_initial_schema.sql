-- CodeStart: Explorando o Mundo da Programação
-- Migração inicial para Supabase/PostgreSQL

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('student', 'teacher', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'progress_status') then
    create type public.progress_status as enum ('locked', 'available', 'in_progress', 'completed');
  end if;

  if not exists (select 1 from pg_type where typname = 'certificate_status') then
    create type public.certificate_status as enum ('valid', 'revoked');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  school text,
  class_group text,
  role public.user_role not null default 'student',
  lgpd_consent boolean not null default false,
  lgpd_consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  order_index int not null unique,
  estimated_minutes int not null default 30,
  xp_reward int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  content text not null,
  logic_message text,
  order_index int not null,
  created_at timestamptz not null default now(),
  unique(module_id, order_index)
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  activity_type text not null check (
    activity_type in ('ordering', 'matching', 'block_programming', 'visual_code', 'final_project', 'predict_output', 'fill_blank')
  ),
  title text not null,
  statement text not null,
  activity_data jsonb not null,
  success_feedback text,
  error_feedback text,
  order_index int not null,
  created_at timestamptz not null default now(),
  unique(module_id, order_index)
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  order_index int not null,
  created_at timestamptz not null default now(),
  unique(module_id, order_index)
);

create table if not exists public.quiz_answer_keys (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null unique references public.quiz_questions(id) on delete cascade,
  correct_option char(1) not null check (correct_option in ('A', 'B', 'C', 'D')),
  explanation text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_id uuid not null references public.activities(id) on delete cascade,
  submitted_data jsonb not null,
  is_correct boolean,
  completed_at timestamptz not null default now(),
  unique(user_id, activity_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  score numeric(5,2) not null,
  total_questions int not null,
  correct_answers int not null,
  answers jsonb not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  status public.progress_status not null default 'available',
  score numeric(5,2),
  xp_earned int not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id, module_id)
);

create table if not exists public.final_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_title text not null default 'Meu Projeto CodeStart',
  project_code text not null,
  project_preview text,
  status text not null default 'submitted',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.final_assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score numeric(5,2) not null,
  total_questions int not null,
  correct_answers int not null,
  answers jsonb not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  certificate_code text not null unique,
  course_name text not null default 'CodeStart: Explorando o Mundo da Programação',
  workload_hours int not null default 4,
  issued_at timestamptz not null default now(),
  validation_hash text not null unique,
  pdf_url text,
  status public.certificate_status not null default 'valid',
  unique(user_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_progress_updated_at on public.progress;
create trigger set_progress_updated_at
before update on public.progress
for each row execute function public.set_updated_at();

drop trigger if exists set_final_projects_updated_at on public.final_projects;
create trigger set_final_projects_updated_at
before update on public.final_projects
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    email,
    role,
    lgpd_consent,
    lgpd_consent_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Aluno CodeStart'),
    new.email,
    'student',
    coalesce((new.raw_user_meta_data ->> 'lgpd_consent')::boolean, false),
    case when coalesce((new.raw_user_meta_data ->> 'lgpd_consent')::boolean, false) = true then now() else null end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.activities enable row level security;
alter table public.activity_attempts enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_answer_keys enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.progress enable row level security;
alter table public.final_projects enable row level security;
alter table public.final_assessment_attempts enable row level security;
alter table public.certificates enable row level security;

create policy "Aluno pode visualizar o próprio perfil"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Aluno pode atualizar o próprio perfil"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Qualquer pessoa pode visualizar módulos ativos"
on public.modules
for select
to anon, authenticated
using (is_active = true);

create policy "Qualquer pessoa pode visualizar aulas de módulos ativos"
on public.lessons
for select
to anon, authenticated
using (
  exists (
    select 1 from public.modules m
    where m.id = lessons.module_id and m.is_active = true
  )
);

create policy "Alunos podem visualizar atividades de módulos ativos"
on public.activities
for select
to authenticated
using (
  exists (
    select 1 from public.modules m
    where m.id = activities.module_id and m.is_active = true
  )
);

create policy "Aluno pode visualizar suas próprias tentativas de atividade"
on public.activity_attempts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Aluno pode inserir suas próprias tentativas de atividade"
on public.activity_attempts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Qualquer pessoa pode visualizar perguntas de módulos ativos"
on public.quiz_questions
for select
to anon, authenticated
using (
  exists (
    select 1 from public.modules m
    where m.id = quiz_questions.module_id and m.is_active = true
  )
);

-- Intencionalmente sem política de SELECT na tabela quiz_answer_keys.

create policy "Aluno pode visualizar suas próprias tentativas"
on public.quiz_attempts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Aluno pode visualizar o próprio progresso"
on public.progress
for select
to authenticated
using (auth.uid() = user_id);

create policy "Aluno pode visualizar seu próprio projeto final"
on public.final_projects
for select
to authenticated
using (auth.uid() = user_id);

create policy "Aluno pode inserir seu próprio projeto final"
on public.final_projects
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Aluno pode atualizar seu próprio projeto final"
on public.final_projects
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Aluno pode visualizar suas avaliações finais"
on public.final_assessment_attempts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Aluno pode visualizar seu próprio certificado"
on public.certificates
for select
to authenticated
using (auth.uid() = user_id);

insert into public.modules (title, description, order_index, estimated_minutes, xp_reward, is_active)
values
('O que é lógica?', 'Introdução ao conceito de lógica, sequência de ações e decisões no cotidiano.', 1, 30, 100, true),
('Pensamento Computacional', 'Decomposição, padrões, abstração e algoritmos como formas de resolver problemas.', 2, 30, 100, true),
('Algoritmos e Sequência Lógica', 'Criação de instruções passo a passo, entrada, processamento e saída.', 3, 30, 125, true),
('Decisões e Condicionais', 'Uso de verdadeiro, falso, se, então e senão para tomada de decisão.', 4, 30, 125, true),
('Repetição e Padrões', 'Identificação de repetições, laços e padrões para simplificar soluções.', 5, 30, 125, true),
('Programação em Blocos', 'Uso de blocos visuais para montar comandos, controlar personagens e resolver desafios.', 6, 30, 150, true),
('Do Bloco ao Código', 'Relação entre blocos visuais e comandos escritos em programação textual.', 7, 30, 125, true),
('Código Visual e Projeto Final', 'Criação de desenhos e composições visuais usando comandos simples.', 8, 30, 150, true)
on conflict (order_index) do update
set title = excluded.title,
    description = excluded.description,
    estimated_minutes = excluded.estimated_minutes,
    xp_reward = excluded.xp_reward,
    is_active = excluded.is_active;
