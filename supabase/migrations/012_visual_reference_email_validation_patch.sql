-- CodeStart v1.0.2 - Referências visuais no Módulo 8
-- Remove códigos prontos das atividades de código visual e adiciona referência visual.
-- A validação de e-mail é configurada no painel do Supabase Auth, não via SQL.

update public.activities
set activity_data = (activity_data - 'starter_code') || jsonb_build_object('target_reference', 'house')
where module_id = (select id from public.modules where order_index = 8)
  and order_index = 1
  and activity_type = 'visual_code';

update public.activities
set activity_data = (activity_data - 'starter_code') || jsonb_build_object('target_reference', 'tree_sun')
where module_id = (select id from public.modules where order_index = 8)
  and order_index = 2
  and activity_type = 'visual_code';

update public.activities
set activity_data = (activity_data - 'starter_code') || jsonb_build_object('target_reference', 'car')
where module_id = (select id from public.modules where order_index = 8)
  and order_index = 3
  and activity_type = 'visual_code';

update public.activities
set activity_data = (activity_data - 'starter_code') || jsonb_build_object('target_reference', 'neighborhood')
where module_id = (select id from public.modules where order_index = 8)
  and order_index = 4
  and activity_type = 'visual_code';
