# Fase 9.1 — Ajustes dos desafios de blocos e navegação

## Objetivo

Corrigir a progressão das atividades de programação em blocos e resolver o problema em que a página de atividades abria no final da lista, confundindo o aluno.

## Alterações implementadas

### Desafio de blocos 2

- A estrela foi movida para o último quadrado da linha inferior.
- A solução esperada foi ajustada para exigir uma curva real até o objetivo.

### Desafio de blocos 3

- Os obstáculos foram reposicionados conforme a validação visual feita no protótipo.
- A estrela foi colocada na posição superior indicada.
- O caminho direto ficou bloqueado, exigindo desvio.

### Desafio de blocos 4

- O desafio foi reformulado como labirinto 5x5.
- A estrela fica no último quadrado da última linha.
- Obstáculos formam um pequeno labirinto.
- A validação passou a aceitar chegada ao objetivo com limite máximo de movimentos de `andar`.

### Navegação

- Ao entrar em uma página de atividades, o sistema força o scroll para o topo.
- Isso evita que o aluno caia diretamente no último exercício após sair do conteúdo do módulo.

## Migration

Execute no Supabase:

```text
supabase/migrations/009_block_challenges_navigation_patch.sql
```

## Critérios de aceite

- O Desafio 2 mostra a estrela no canto inferior direito.
- O Desafio 3 mostra os obstáculos e objetivo nas posições corrigidas.
- O Desafio 4 mostra um tabuleiro 5x5 com labirinto e objetivo no canto inferior direito.
- O LOGIC anima corretamente nos desafios.
- A página de atividades abre sempre no primeiro exercício/topo da tela.
