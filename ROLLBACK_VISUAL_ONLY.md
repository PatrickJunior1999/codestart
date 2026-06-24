# CodeStart v1.0.2 Visual Only Stable

Esta versão volta para a base estável anterior ao erro de autenticação e mantém somente as alterações solicitadas no Módulo 8 e no Projeto Final.

## Mantido da base estável

- Fluxo de autenticação anterior.
- Sem alteração automática de validação/confirmação de e-mail.
- Sem mudanças no AuthContext, LoginPage ou RegisterPage.

## Alterado

- Módulo 8: atividades de código visual sem código pronto inicial.
- Módulo 8: imagens de referência para casa, árvore/sol, carro e cena completa.
- Projeto Final: editor começa em branco e mostra imagem de referência.
- Editor visual: ajuda mostra apenas sintaxe genérica dos comandos.

## Migration opcional

Execute no Supabase apenas se você já rodou versões anteriores com `starter_code` nas atividades do Módulo 8:

```sql
supabase/migrations/012_visual_reference_module8_final_project_patch.sql
```

Essa migration não altera autenticação.
