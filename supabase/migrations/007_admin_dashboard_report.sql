-- CodeStart v0.8.1 - Painel administrativo
-- Cria uma função segura para consolidar dados dos alunos sem transformar o CodeStart em uma plataforma de turmas.
-- Apenas perfis com role = 'admin' podem acessar este relatório.

create or replace function public.get_admin_dashboard_report()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.user_role;
  v_total_modules int;
  v_payload jsonb;
begin
  select p.role
  into v_role
  from public.profiles p
  where p.id = auth.uid();

  if v_role is null or v_role <> 'admin' then
    raise exception 'Acesso restrito: apenas administradores podem visualizar o painel administrativo.';
  end if;

  select count(*)
  into v_total_modules
  from public.modules m
  where m.is_active = true;

  with progress_summary as (
    select
      pr.user_id,
      count(*) filter (where pr.status = 'completed')::int as completed_modules,
      coalesce(sum(pr.xp_earned) filter (where pr.status = 'completed'), 0)::int as total_xp
    from public.progress pr
    group by pr.user_id
  ),
  final_assessment_summary as (
    select
      faa.user_id,
      coalesce(max(faa.score), 0)::numeric(5,2) as best_final_score
    from public.final_assessment_attempts faa
    group by faa.user_id
  ),
  final_project_summary as (
    select
      fp.user_id,
      true as has_final_project
    from public.final_projects fp
    where fp.status = 'submitted'
    group by fp.user_id
  ),
  certificate_summary as (
    select
      c.user_id,
      true as has_certificate
    from public.certificates c
    where c.status = 'valid'
    group by c.user_id
  ),
  students as (
    select
      p.id as student_id,
      p.full_name,
      p.email,
      p.school,
      p.class_group,
      p.created_at,
      coalesce(ps.completed_modules, 0) as completed_modules,
      coalesce(ps.total_xp, 0) as total_xp,
      case
        when v_total_modules > 0 then round((coalesce(ps.completed_modules, 0)::numeric * 100) / v_total_modules, 2)
        else 0
      end as progress_percent,
      coalesce(fps.has_final_project, false) as has_final_project,
      coalesce(fas.best_final_score, 0) as best_final_score,
      coalesce(cs.has_certificate, false) as has_certificate
    from public.profiles p
    left join progress_summary ps on ps.user_id = p.id
    left join final_assessment_summary fas on fas.user_id = p.id
    left join final_project_summary fps on fps.user_id = p.id
    left join certificate_summary cs on cs.user_id = p.id
    where p.role = 'student'
  )
  select jsonb_build_object(
    'total_students', coalesce((select count(*) from students), 0),
    'total_modules', v_total_modules,
    'students_completed_course', coalesce((
      select count(*)
      from students s
      where s.completed_modules >= v_total_modules
        and v_total_modules > 0
        and s.has_final_project = true
        and s.best_final_score >= 70
    ), 0),
    'certificates_issued', coalesce((select count(*) from students s where s.has_certificate = true), 0),
    'average_progress_percent', coalesce((select round(avg(s.progress_percent), 2) from students s), 0),
    'students', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'student_id', s.student_id,
          'full_name', s.full_name,
          'email', s.email,
          'school', s.school,
          'class_group', s.class_group,
          'completed_modules', s.completed_modules,
          'total_xp', s.total_xp,
          'progress_percent', s.progress_percent,
          'has_final_project', s.has_final_project,
          'best_final_score', s.best_final_score,
          'has_certificate', s.has_certificate,
          'created_at', s.created_at
        )
        order by s.full_name
      )
      from students s
    ), '[]'::jsonb)
  )
  into v_payload;

  return v_payload;
end;
$$;

grant execute on function public.get_admin_dashboard_report() to authenticated;
