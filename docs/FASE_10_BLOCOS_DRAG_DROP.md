# Fase 10 — Blocos com arrastar e soltar

## Objetivo

Aproximar a atividade de programação em blocos da experiência esperada em ferramentas como Blockly Games, permitindo que o aluno manipule visualmente a sequência de comandos.

## Alterações implementadas

- Blocos disponíveis podem ser arrastados para a área do programa.
- Blocos já encaixados podem ser reorganizados por arrastar e soltar.
- A interação por clique foi mantida para dispositivos móveis.
- A área do programa mostra uma zona de encaixe quando está vazia.
- A zona de encaixe recebe destaque visual durante o arraste.
- O fluxo de animação do LOGIC foi mantido.

## Justificativa pedagógica

A manipulação direta dos blocos reduz a abstração inicial da programação textual e ajuda o aluno a perceber que um algoritmo é uma sequência organizada de comandos. A possibilidade de reorganizar a ordem dos blocos também reforça o papel da sequência lógica na solução de problemas.

## Observação técnica

Não foi usada a biblioteca Blockly oficial nesta fase. A solução continua própria em React, preservando controle visual, leveza e compatibilidade com o restante do protótipo.

## Banco de dados

Nenhuma migration nova é necessária. A atividade continua salvando tentativas na tabela `activity_attempts`.
