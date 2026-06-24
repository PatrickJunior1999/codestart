# CodeStart v1.0.4 — Correção de quizzes e impressão do painel administrativo

## Objetivo

Esta correção remove perguntas que cobravam justificativas sobre metodologia, ferramenta ou estrutura do próprio projeto. As avaliações devem medir os conteúdos estudados pelos alunos, como lógica, decomposição, sequência, repetição, programação em blocos, pseudocódigo, coordenadas e comandos visuais.

## Alterações realizadas

### Quizzes

- Ajuste de questões do Módulo 8 que falavam sobre uso da ferramenta ou critérios do projeto.
- Substituição por questões objetivas sobre comandos visuais, formas, linhas, triângulos e decomposição de desenhos.

### Avaliação final

- Substituição de questões sobre vantagem pedagógica, linguagem controlada e critérios do projeto final.
- Novas questões focadas em repetição, comandos de triângulo e decomposição de uma cena visual.

### Painel administrativo

- Correção da impressão do relatório administrativo.
- O botão **Imprimir relatório** agora aplica uma classe temporária ao `body` para evitar conflito com o CSS de impressão do certificado.
- O relatório administrativo passa a imprimir com fundo branco, texto escuro, cards legíveis e sem folha em branco.

## Migration necessária

Execute no Supabase:

```text
supabase/migrations/013_quiz_content_admin_print_fix.sql
```

## Testes recomendados

1. Executar a migration 013.
2. Abrir o Módulo 8 e conferir o quiz.
3. Abrir a avaliação final e conferir as questões 7, 9 e 10.
4. Abrir `/admin` com usuário administrador.
5. Clicar em **Imprimir relatório**.
6. Confirmar que a prévia de impressão mostra o relatório e não uma página em branco.
