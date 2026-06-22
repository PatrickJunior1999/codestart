# Fase 6 — Certificado visual e PDF

Esta versão adiciona a etapa documental do CodeStart.

## Recursos implementados

- Visualização do certificado em formato de documento.
- Nome do aluno carregado do perfil autenticado.
- Nome do curso, carga horária, data de emissão e código de validação.
- QR Code apontando para a página pública de validação.
- Botão **Imprimir / salvar como PDF** usando a impressão do navegador.
- Botão **Baixar PDF** com geração direta via jsPDF.
- Página pública de validação com layout mais apresentável.

## Fluxo esperado

1. O aluno conclui todos os módulos.
2. O aluno salva o projeto final.
3. O aluno obtém pelo menos 70% na avaliação final.
4. O aluno emite o certificado.
5. O sistema exibe a representação visual do certificado.
6. O aluno pode imprimir, salvar como PDF pelo navegador ou baixar o PDF diretamente.

## Observação

Esta fase não exige nova migration no Supabase. Ela utiliza os dados já salvos pelas fases anteriores.


## Ajuste v0.6.1

A impressão do certificado foi ajustada para ocupar uma única página A4 em orientação horizontal. A regra `@page` define `A4 landscape`, enquanto o certificado é renderizado com tamanho fixo de 277mm x 190mm centralizado na folha de 297mm x 210mm. Isso evita quebra em duas páginas durante a impressão pelo navegador.
