-- CodeStart v0.5.1
-- Corrige emissão de certificado em projetos onde pgcrypto/gen_random_bytes não está disponível no search_path.
-- Esta migration não apaga dados. Ela apenas recria a função issue_certificate usando funções nativas do PostgreSQL.

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
