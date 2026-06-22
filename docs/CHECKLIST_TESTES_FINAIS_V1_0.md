# Checklist de testes finais — CodeStart v1.0

Use este checklist antes de apresentar ou publicar o sistema.

## Fluxo do aluno

- [ ] Página inicial abre corretamente.
- [ ] Cadastro cria usuário em `auth.users`.
- [ ] Cadastro cria perfil em `profiles`.
- [ ] Login funciona.
- [ ] Dashboard carrega os módulos.
- [ ] Módulo bloqueado não pode ser acessado antes da hora.
- [ ] Módulo liberado abre normalmente.
- [ ] Conteúdo aparece dividido em etapas.
- [ ] Atividades práticas aparecem desde o primeiro exercício.
- [ ] Atividades de ordenação têm contraste legível.
- [ ] Atividades de blocos permitem clicar e arrastar.
- [ ] Animação do LOGIC foca no tabuleiro.
- [ ] Quiz só libera depois da atividade prática.
- [ ] Quiz aprovado com 70% ou mais conclui o módulo.
- [ ] Próximo módulo desbloqueia após conclusão.
- [ ] Projeto final salva no banco.
- [ ] Avaliação final registra tentativa.
- [ ] Certificado só libera após cumprir critérios.
- [ ] Certificado visual aparece corretamente.
- [ ] Certificado imprime em A4 horizontal em uma página.
- [ ] QR Code do certificado abre a validação pública.
- [ ] Relatório de progresso está legível.
- [ ] Relatório de progresso imprime corretamente.

## Fluxo administrativo

- [ ] Usuário comum não vê card de administração.
- [ ] Usuário comum não deve acessar `/admin`.
- [ ] Usuário com `role = 'admin'` vê o painel.
- [ ] Painel mostra alunos cadastrados.
- [ ] Painel mostra progresso, XP, projeto final, avaliação e certificado.
- [ ] `/admin/status` executa diagnóstico do sistema.

## Supabase

- [ ] Todas as migrations de `001` a `011` foram executadas.
- [ ] RLS está ativo nas tabelas sensíveis.
- [ ] `quiz_answer_keys` não está exposta para leitura pública.
- [ ] `final_assessment_answer_keys` não está exposta para leitura pública.
- [ ] Função `submit_quiz_attempt` funciona.
- [ ] Função `submit_final_assessment` funciona.
- [ ] Função `issue_certificate` funciona.
- [ ] Função `validate_certificate` funciona.
- [ ] Função `get_admin_dashboard_report` funciona apenas para admin.

## Publicação

- [ ] `.env.local` não foi enviado ao GitHub.
- [ ] Variáveis de ambiente foram configuradas na hospedagem.
- [ ] `VITE_APP_CERTIFICATE_BASE_URL` aponta para domínio público.
- [ ] Rotas internas funcionam após recarregar a página.
- [ ] URL pública foi configurada no Supabase Auth.
