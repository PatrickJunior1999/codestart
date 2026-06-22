# Fase 11.1 — Correção de contraste do relatório de progresso

## Objetivo

Corrigir a legibilidade do relatório individual do aluno após a reformulação visual tecnológica do CodeStart.

## Problema identificado

A página `Meu progresso` utilizava um documento de relatório com fundo claro, mas alguns textos herdavam as variáveis do tema escuro global. Isso deixava títulos, dados do aluno, tabela e mensagem do LOGIC com baixo contraste.

## Ajustes realizados

- Aplicação de contraste próprio no bloco `.report-document`.
- Textos do relatório definidos em azul/grafite escuro.
- Cards internos do relatório ajustados para fundo claro e texto escuro.
- Caixa do LOGIC no relatório ajustada para manter visual tecnológico claro, porém legível.
- Tabela de módulos com cabeçalho e linhas de alto contraste.
- Badges de status preservados com cores legíveis.
- Regras de impressão revisadas para manter fundo branco e texto escuro no PDF.

## Impacto

Não há alteração de banco de dados nem de regras de negócio. A correção é somente visual/front-end.

## Testes sugeridos

1. Acessar `/meu-progresso`.
2. Conferir se os dados do aluno estão legíveis.
3. Conferir se os cards de resumo têm contraste adequado.
4. Conferir se a tabela de módulos está legível.
5. Usar `Imprimir relatório` e verificar o PDF gerado.
