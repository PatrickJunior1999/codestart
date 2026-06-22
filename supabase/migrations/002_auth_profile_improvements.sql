-- CodeStart v0.2
-- Melhora a criação automática de profiles usando metadados do cadastro.

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
    school,
    class_group,
    role,
    lgpd_consent,
    lgpd_consent_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Aluno CodeStart'),
    new.email,
    nullif(new.raw_user_meta_data ->> 'school', ''),
    nullif(new.raw_user_meta_data ->> 'class_group', ''),
    'student',
    coalesce((new.raw_user_meta_data ->> 'lgpd_consent')::boolean, false),
    case
      when coalesce((new.raw_user_meta_data ->> 'lgpd_consent')::boolean, false) = true
      then now()
      else null
    end
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    school = excluded.school,
    class_group = excluded.class_group,
    lgpd_consent = excluded.lgpd_consent,
    lgpd_consent_at = excluded.lgpd_consent_at,
    updated_at = now();

  return new;
end;
$$;

-- Permite leitura pública mínima para validação de certificados apenas por função.
-- Não adicionamos políticas públicas diretas na tabela certificates.
