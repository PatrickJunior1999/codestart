# CodeStart v1.0.5 — Dashboard administrativo com gráficos

Esta versão adiciona uma camada visual ao painel administrativo para apoiar a avaliação do curso.

## Novos indicadores

- Funil de conclusão do curso.
- Conclusão por módulo.
- Distribuição dos alunos por estágio da trilha.
- Desempenho por faixa na avaliação final.
- Insights automáticos sobre taxa de conclusão, certificação, gargalos e alunos em atenção.

## Objetivo

A melhoria transforma o painel administrativo em um dashboard analítico, útil para apresentar evidências do projeto de extensão e avaliar a adesão dos alunos ao curso.

## Banco de dados

Não há nova migration. Os gráficos usam os dados já retornados por `get_admin_dashboard_report()`.

## Impressão

Os gráficos foram preparados para aparecerem no relatório impresso do painel administrativo com fundo branco, texto escuro e barras legíveis.
