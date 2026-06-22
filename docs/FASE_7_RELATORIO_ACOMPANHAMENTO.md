# Fase 7 — Relatório de acompanhamento do aluno

A versão v0.7 adiciona uma página de acompanhamento para consolidar as evidências de aprendizagem do aluno.

## Nova rota

- `/meu-progresso`

## Objetivo

A página reúne, em uma única tela, os principais dados do percurso do aluno:

- módulos concluídos;
- XP total;
- nível atual;
- atividades práticas concluídas;
- melhor nota por quiz;
- avaliação final;
- projeto final;
- certificado emitido, quando existir.

## Uso na apresentação do projeto

Essa tela é útil para demonstrar que o CodeStart não é apenas um conjunto de páginas estáticas. O sistema registra dados reais no Supabase e permite acompanhar o avanço do aluno de forma objetiva.

## Banco de dados

Não há nova migration nesta fase. A página utiliza as tabelas já existentes:

- `profiles`;
- `modules`;
- `activities`;
- `activity_attempts`;
- `quiz_attempts`;
- `progress`;
- `final_projects`;
- `final_assessment_attempts`;
- `certificates`.

## Impressão

A página inclui um botão **Imprimir relatório**, útil para salvar um comprovante em PDF pelo navegador.
