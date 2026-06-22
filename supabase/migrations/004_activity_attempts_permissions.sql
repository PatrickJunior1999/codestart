-- CodeStart v0.4
-- Permite salvar/reenviar atividades práticas e projeto final por upsert.

alter table public.activity_attempts enable row level security;
alter table public.final_projects enable row level security;

grant select, insert, update on public.activity_attempts to authenticated;
grant select, insert, update on public.final_projects to authenticated;

drop policy if exists "Aluno pode atualizar suas próprias tentativas de atividade" on public.activity_attempts;
create policy "Aluno pode atualizar suas próprias tentativas de atividade"
on public.activity_attempts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Caso as policies anteriores não existam por falha parcial de migration, recria de forma segura.
drop policy if exists "Aluno pode visualizar suas próprias tentativas de atividade" on public.activity_attempts;
create policy "Aluno pode visualizar suas próprias tentativas de atividade"
on public.activity_attempts
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Aluno pode inserir suas próprias tentativas de atividade" on public.activity_attempts;
create policy "Aluno pode inserir suas próprias tentativas de atividade"
on public.activity_attempts
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Aluno pode visualizar seu próprio projeto final" on public.final_projects;
create policy "Aluno pode visualizar seu próprio projeto final"
on public.final_projects
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Aluno pode inserir seu próprio projeto final" on public.final_projects;
create policy "Aluno pode inserir seu próprio projeto final"
on public.final_projects
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Aluno pode atualizar seu próprio projeto final" on public.final_projects;
create policy "Aluno pode atualizar seu próprio projeto final"
on public.final_projects
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
