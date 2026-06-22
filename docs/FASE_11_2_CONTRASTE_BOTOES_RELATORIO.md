# Fase 11.2 — Ajuste fino de contraste do relatório de progresso

Esta versão corrige detalhes visuais identificados no relatório individual do aluno.

## Ajustes aplicados

- Aumento de contraste dos botões de ação do relatório:
  - Projeto final
  - Avaliação final
  - Certificado
- Reforço das bordas dos cards de resumo.
- Reforço da borda do documento do relatório.
- Reforço das bordas do bloco de dados do aluno e da tabela.
- Ajuste de hover/foco dos botões para melhorar percepção de clique.
- Preservação do layout de impressão/PDF com bordas limpas.

## Impacto técnico

- Alteração apenas no frontend/CSS.
- Não exige nova migration no Supabase.
- Não altera autenticação, banco, certificado ou regras do curso.

## Teste recomendado

1. Acessar `/meu-progresso`.
2. Conferir os botões Projeto final, Avaliação final e Certificado.
3. Conferir as bordas dos cards de resumo.
4. Testar a impressão do relatório.
