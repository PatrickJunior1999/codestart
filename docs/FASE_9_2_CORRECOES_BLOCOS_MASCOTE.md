# Fase 9.2 — Correções de blocos, mascote e foco de animação

## Objetivo

Corrigir problemas identificados na v0.9.1 após teste do usuário.

## Ajustes realizados

- O Desafio de Blocos 2 agora aceita qualquer sequência válida que leve o LOGIC até a estrela sem bater em obstáculo.
- O mascote LOGIC nas caixas de fala foi ajustado para não ultrapassar a moldura nem cobrir o texto.
- O emoji do mascote foi simplificado para evitar renderização quebrada do emoji `cat technologist` em navegadores diferentes.
- Ao clicar em **Animar LOGIC**, a tela rola automaticamente até o tabuleiro da atividade.
- O tabuleiro recebe um destaque visual rápido durante a animação.

## Migration necessária

Execute no Supabase:

```sql
supabase/migrations/010_fix_block_challenge_2_and_animation_focus.sql
```

## Testes recomendados

1. Abrir o Módulo 6.
2. Ir para a atividade prática.
3. No Desafio 2, montar uma rota alternativa válida até a estrela.
4. Confirmar que o sistema aceita a conclusão.
5. Clicar em **Animar LOGIC** e confirmar que a tela foca no tabuleiro.
6. Verificar se a caixa de fala do LOGIC não cobre mais o texto.
