# Fase 9 — Reformulação visual e pedagógica

Esta fase corrige dois pontos críticos identificados durante os testes do CodeStart:

1. a interface estava funcional, mas visualmente simples demais para a proposta de tecnologia e programação;
2. os módulos tinham conteúdos curtos, pouco aprofundados e com baixa preparação para as atividades mais difíceis.

## Objetivo da v0.9

Transformar o CodeStart de um protótipo funcional em um ODA mais coerente com a proposta de curso online gamificado, mantendo a base técnica já validada com Supabase.

## Principais mudanças

### 1. Nova identidade visual tecnológica

A interface passou a usar uma estética mais próxima de laboratório digital e trilha de missões:

- fundo escuro com gradientes azul/roxo;
- grid tecnológico no fundo;
- cards com efeito glassmorphism;
- botões com brilho e aparência mais tecnológica;
- dashboard reforçado como Centro de Missões;
- módulos apresentados como missões progressivas.

### 2. Conteúdos dos módulos aprofundados

Cada módulo foi reestruturado em etapas menores, com:

- explicação conceitual;
- exemplos guiados;
- alertas pedagógicos;
- miniatividades de fixação;
- preparação mais coerente para atividades e quizzes.

### 3. Atividades práticas mais numerosas

Os módulos passaram a contar com mais atividades, especialmente nos pontos mais complexos:

- pseudocódigo;
- condicionais;
- repetição;
- programação em blocos;
- código visual.

O Módulo 6 passou a ter quatro desafios de programação em blocos.

### 4. Programação em blocos com LOGIC animado

A atividade de blocos foi reformulada com:

- mapa em grade;
- posição inicial do LOGIC;
- objetivo com estrela;
- obstáculos;
- direção do personagem;
- animação passo a passo;
- blocos com aparência de encaixe.

A implementação ainda usa blocos próprios em React, não a biblioteca Blockly real. Isso preserva controle visual e reduz complexidade técnica nesta etapa.

### 5. Código visual mais objetivo

O editor visual agora aceita também:

```text
triangulo x1 y1 x2 y2 x3 y3
```

Além dos comandos já existentes:

```text
cor
circulo
retangulo
linha
limpar
```

O projeto final passou a exigir uma cena programada mais estruturada.

## Nova regra pedagógica do Projeto Final

O aluno deve construir uma cena contendo:

- pelo menos 10 linhas de comandos;
- 4 ou mais cores;
- 2 ou mais retângulos;
- 2 ou mais círculos;
- pelo menos 1 triângulo;
- pelo menos 1 linha.

A proposta sugerida é criar uma cena com casa, árvore, sol e chão/rua.

## Migration necessária

Executar no Supabase:

```text
supabase/migrations/008_visual_pedagogical_rework.sql
```

Essa migration atualiza:

- títulos e descrições dos módulos;
- conteúdos das lições;
- atividades práticas;
- parte dos quizzes dos módulos 6 e 8.

## Observação

Esta fase ainda não integra a biblioteca Blockly oficial. A escolha atual foi criar blocos próprios com comportamento controlado, mais fácil de manter e apresentar no contexto do projeto.
