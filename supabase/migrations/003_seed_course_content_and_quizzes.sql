-- CodeStart v0.3
-- Conteúdo pedagógico inicial, quizzes dinâmicos e função segura de correção.

create extension if not exists "pgcrypto";

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Boas-vindas à lógica$cs$, $cs$Lógica é a organização do pensamento para resolver um problema, tomar uma decisão ou chegar a uma conclusão.

Ela ajuda a responder perguntas como: o que precisa acontecer primeiro, qual ação depende de outra, qual decisão deve ser tomada e qual resultado esperamos alcançar.

Na programação, a lógica é usada para transformar ideias em instruções claras para o computador. Um computador não adivinha intenções. Ele executa comandos. Por isso, se as instruções forem incompletas, confusas ou estiverem fora de ordem, o resultado poderá ser incorreto.$cs$, $cs$Olá! Eu sou o LOGIC. Antes de criar jogos, códigos ou animações, precisamos entender algo essencial: a lógica.$cs$, 1
from public.modules
where order_index = 1
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Sequência lógica no cotidiano$cs$, $cs$Uma sequência lógica é uma ordem de ações que faz sentido para alcançar um objetivo.

Exemplo: para preparar um achocolatado, primeiro pegamos o copo, depois colocamos leite, depois achocolatado, misturamos e só então bebemos.

Se a ordem for alterada, a tarefa pode perder sentido. Isso também acontece em programas de computador: mostrar um resultado antes de calcular, enviar uma mensagem antes de escrevê-la ou imprimir um documento antes de abrir o arquivo são erros de sequência.$cs$, $cs$Quando você organiza passos na ordem certa, já está pensando como um programador iniciante.$cs$, 2
from public.modules
where order_index = 1
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Instruções claras$cs$, $cs$Uma pessoa pode interpretar contexto, mas um computador precisa de instruções claras e específicas.

A instrução “prepare um bolo” é vaga para um robô. Uma versão melhor seria: pegue uma tigela, coloque farinha, adicione ovos, misture, coloque a massa na forma e leve ao forno.

Programar exige esse cuidado: dividir a ideia em passos simples, claros e organizados.$cs$, $cs$Dica de gato programador: quanto mais clara for a instrução, menor a chance de erro.$cs$, 3
from public.modules
where order_index = 1
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$O que é pensamento computacional?$cs$, $cs$Pensamento computacional é uma forma de resolver problemas inspirada na computação. Ele não serve apenas para programar: também ajuda a estudar, organizar tarefas, planejar rotinas e tomar decisões.

Ele envolve quatro habilidades principais: decomposição, reconhecimento de padrões, abstração e criação de algoritmos.$cs$, $cs$Pensar computacionalmente é montar uma estratégia para resolver problemas.$cs$, 1
from public.modules
where order_index = 2
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Decomposição e padrões$cs$, $cs$Decomposição significa dividir um problema grande em partes menores. Organizar uma feira de ciências, por exemplo, pode virar: escolher tema, montar equipe, pesquisar, criar experimento, preparar apresentação e organizar materiais.

Reconhecimento de padrões é perceber semelhanças entre situações. Se vários exercícios seguem a lógica “ler, identificar dados, escolher operação, calcular e conferir”, esse padrão pode ser usado para resolver novos exercícios.$cs$, $cs$Problemas grandes ficam menores quando dividimos em partes.$cs$, 2
from public.modules
where order_index = 2
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Abstração e algoritmos$cs$, $cs$Abstração significa selecionar as informações relevantes e ignorar detalhes desnecessários.

Se você explica o caminho até a biblioteca, não precisa falar a cor de todos os carros da rua. Basta informar os passos importantes.

Depois de decompor, reconhecer padrões e abstrair, criamos um algoritmo: uma sequência de passos para resolver o problema.$cs$, $cs$Nem todo detalhe ajuda. Um bom programador aprende a focar no que importa.$cs$, 3
from public.modules
where order_index = 2
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$O que é algoritmo?$cs$, $cs$Um algoritmo é uma sequência organizada de instruções para resolver um problema ou realizar uma tarefa.

Ele pode ser escrito em linguagem natural, pseudocódigo, blocos ou linguagem de programação. O importante é que tenha ordem, clareza e objetivo.$cs$, $cs$Todo programa nasce de uma sequência de passos bem pensada.$cs$, 1
from public.modules
where order_index = 3
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Entrada, processamento e saída$cs$, $cs$Entrada são os dados recebidos. Processamento é o que fazemos com esses dados. Saída é o resultado.

Para calcular a média de duas notas: as notas são a entrada; somar e dividir por dois é o processamento; a média final é a saída.$cs$, $cs$Muitos programas funcionam como uma pequena fábrica de informações.$cs$, 2
from public.modules
where order_index = 3
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Pseudocódigo$cs$, $cs$Pseudocódigo é uma forma simplificada de escrever algoritmos, próxima da linguagem humana.

Exemplo:
Início
Ler nota1
Ler nota2
media = (nota1 + nota2) / 2
Mostrar media
Fim

Ele ajuda a organizar a solução antes de lidar com regras específicas de uma linguagem de programação.$cs$, $cs$Antes de escrever código real, podemos planejar com uma linguagem simples.$cs$, 3
from public.modules
where order_index = 3
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Condições e decisões$cs$, $cs$Uma condição é uma pergunta ou afirmação que pode ser verdadeira ou falsa.

Exemplos: a senha está correta? A média é maior ou igual a 7? O jogador tocou no obstáculo? Dependendo da resposta, o programa escolhe uma ação.$cs$, $cs$Nem todo algoritmo segue sempre o mesmo caminho.$cs$, 1
from public.modules
where order_index = 4
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Se, então e senão$cs$, $cs$A estrutura “se/então” executa uma ação quando uma condição é verdadeira.

Exemplo: se a média for maior ou igual a 7, então o aluno está aprovado.

Com “senão”, definimos também o que acontece quando a condição é falsa: se a média for maior ou igual a 7, aprovado; senão, recuperação.$cs$, $cs$Condicionais são bifurcações no caminho do algoritmo.$cs$, 2
from public.modules
where order_index = 4
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Comparações$cs$, $cs$Condições usam comparações como maior que, menor que, igual, diferente, maior ou igual e menor ou igual.

A diferença entre “maior que 18” e “maior ou igual a 18” é importante: no segundo caso, quem tem exatamente 18 também passa na regra.$cs$, $cs$Comparar valores ajuda o programa a decidir.$cs$, 3
from public.modules
where order_index = 4
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Por que repetir?$cs$, $cs$Repetição é quando uma ação acontece mais de uma vez. Na programação, usamos loops para executar ações repetidas de forma organizada.

Em vez de escrever “andar” oito vezes, podemos usar: repita 8 vezes: andar.$cs$, $cs$Programadores evitam escrever o mesmo comando várias vezes sem necessidade.$cs$, 1
from public.modules
where order_index = 5
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Padrões$cs$, $cs$Um padrão é algo que se repete de forma previsível.

Na sequência “pular, abaixar, pular, abaixar”, o padrão “pular, abaixar” se repete. Em algoritmos, padrões podem envolver um ou vários comandos.$cs$, $cs$Encontrar padrões é uma das habilidades mais úteis para programar.$cs$, 2
from public.modules
where order_index = 5
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Repetição com quantidade e condição$cs$, $cs$Quando sabemos a quantidade, usamos repetição definida: repita 5 vezes.

Quando não sabemos quantas tentativas serão necessárias, usamos repetição com condição: continue pedindo a senha enquanto ela estiver incorreta.$cs$, $cs$Às vezes sabemos quantas vezes repetir; às vezes repetimos até algo acontecer.$cs$, 3
from public.modules
where order_index = 5
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$O que é programação em blocos?$cs$, $cs$Programação em blocos é uma forma visual de programar. Cada bloco representa um comando, como andar, virar, repetir ou verificar uma condição.

Ferramentas como Blockly Games, Scratch e Code.org usam blocos para facilitar os primeiros passos na programação.$cs$, $cs$Blocos ajudam você a focar na lógica antes de se preocupar com sintaxe.$cs$, 1
from public.modules
where order_index = 6
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Sequência, repetição e condição em blocos$cs$, $cs$Assim como em algoritmos escritos, os blocos precisam estar na ordem correta.

Também podemos usar blocos de repetição para evitar comandos duplicados e blocos condicionais para tomar decisões, como: se houver parede à frente, vire; senão, ande.$cs$, $cs$A ordem dos blocos muda completamente o resultado.$cs$, 2
from public.modules
where order_index = 6
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Depuração$cs$, $cs$Depuração é o processo de encontrar e corrigir erros.

Se o personagem deveria andar duas casas e depois virar, mas ele vira antes, o problema provavelmente está na ordem dos blocos. Observar o resultado ajuda a corrigir a solução.$cs$, $cs$Errar faz parte. Programar também é encontrar e corrigir erros.$cs$, 3
from public.modules
where order_index = 6
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Blocos e código$cs$, $cs$Um bloco “andar” pode ser representado como um comando textual, por exemplo: andar();

O bloco é visual. O código é textual. Mas a ideia lógica é a mesma: executar uma ação.$cs$, $cs$O código escrito parece diferente, mas segue a mesma lógica dos blocos.$cs$, 1
from public.modules
where order_index = 7
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Sequência e repetição em código$cs$, $cs$Blocos como andar, virarDireita, andar podem virar:
andar();
virarDireita();
andar();

Uma repetição como “repita 3 vezes: andar” pode ser representada por uma estrutura de repetição. O importante agora não é decorar a sintaxe, mas perceber que a lógica continua igual.$cs$, $cs$O código também é lido passo a passo.$cs$, 2
from public.modules
where order_index = 7
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Condições em código$cs$, $cs$Um bloco condicional pode virar:
if (temParede) {
  virarDireita();
} else {
  andar();
}

Essa estrutura significa: se a condição for verdadeira, execute uma ação; caso contrário, execute outra.$cs$, $cs$O if/else é a forma textual de uma decisão.$cs$, 3
from public.modules
where order_index = 7
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Código visual$cs$, $cs$Código visual é uma forma de escrever comandos que geram elementos gráficos.

Exemplos:
cor azul
circulo 100 100 50
retangulo 200 100 80 60
linha 0 0 300 300

Cada comando gera uma ação visual.$cs$, $cs$Agora você vai escrever comandos e ver o resultado aparecer na tela.$cs$, 1
from public.modules
where order_index = 8
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Coordenadas e comandos$cs$, $cs$Para desenhar na tela, usamos posições. O primeiro número geralmente representa a posição horizontal, e o segundo representa a posição vertical.

O comando circulo 100 100 50 indica um círculo na posição x=100, y=100, com tamanho 50.

O CodeStart aceitará comandos controlados como cor, circulo, retangulo, linha e limpar.$cs$, $cs$Imagine a tela como uma folha quadriculada.$cs$, 2
from public.modules
where order_index = 8
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.lessons (module_id, title, content, logic_message, order_index)
select id, $cs$Projeto final$cs$, $cs$No projeto final, você criará uma composição visual usando pelo menos um comando de cor, um círculo, um retângulo e uma linha.

O objetivo é aplicar sequência lógica, comandos e criatividade em uma produção sua. Não precisa ser perfeito: precisa demonstrar que você compreendeu a jornada.$cs$, $cs$Sua missão final é criar algo próprio usando lógica e criatividade.$cs$, 3
from public.modules
where order_index = 8
on conflict (module_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  logic_message = excluded.logic_message;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$ordering$cs$, $cs$Missão 1: Ajude o LOGIC a preparar um achocolatado$cs$, $cs$LOGIC quer preparar um achocolatado, mas os passos ficaram fora de ordem. Organize as ações corretamente.$cs$, $cs${"items": ["Misturar com a colher", "Pegar um copo", "Colocar leite no copo", "Colocar achocolatado", "Beber o achocolatado"], "correct_order": ["Pegar um copo", "Colocar leite no copo", "Colocar achocolatado", "Misturar com a colher", "Beber o achocolatado"]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 1
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$ordering$cs$, $cs$Missão 2: Organize o campeonato da escola$cs$, $cs$A escola quer organizar um campeonato de jogos educativos. Divida e organize as etapas.$cs$, $cs${"items": ["Divulgar o campeonato", "Definir os jogos que serão utilizados", "Montar as equipes", "Criar as regras", "Realizar as partidas", "Registrar os resultados"], "correct_order": ["Definir os jogos que serão utilizados", "Criar as regras", "Divulgar o campeonato", "Montar as equipes", "Realizar as partidas", "Registrar os resultados"]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 2
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$ordering$cs$, $cs$Missão 3: Calculando a média$cs$, $cs$Organize os passos para criar um algoritmo que calcula a média de duas notas.$cs$, $cs${"items": ["Mostrar a média", "Ler a primeira nota", "Somar as duas notas", "Ler a segunda nota", "Dividir o resultado por 2"], "correct_order": ["Ler a primeira nota", "Ler a segunda nota", "Somar as duas notas", "Dividir o resultado por 2", "Mostrar a média"]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 3
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$matching$cs$, $cs$Missão 4: Ajude LOGIC a tomar decisões$cs$, $cs$Associe condições às consequências corretas.$cs$, $cs${"pairs": [{"left": "Se o jogador tocar no tesouro", "right": "Ganhar pontos"}, {"left": "Se o jogador tocar no inimigo", "right": "Perder vida"}, {"left": "Se o tempo acabar", "right": "Encerrar a fase"}]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 4
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$matching$cs$, $cs$Missão 5: Menos comandos, mais inteligência$cs$, $cs$Identifique repetições e padrões.$cs$, $cs${"pairs": [{"left": "andar, andar, andar, andar, andar", "right": "repita 5 vezes: andar"}, {"left": "pular, abaixar, pular, abaixar", "right": "repita 2 vezes: pular e abaixar"}]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 5
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$block_programming$cs$, $cs$Missão 6: Leve LOGIC até a estrela$cs$, $cs$Monte uma sequência de blocos para resolver o mapa.$cs$, $cs${"available_blocks": ["andar", "virar direita", "virar esquerda", "repetir"], "expected": ["andar", "andar", "andar"]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 6
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$matching$cs$, $cs$Missão 7: Traduza os blocos$cs$, $cs$Associe cada bloco ao código correspondente.$cs$, $cs${"pairs": [{"left": "Bloco: andar", "right": "andar();"}, {"left": "Bloco: repita 4 vezes: pular", "right": "repetir(4, pular);"}, {"left": "Bloco: se senha correta, permitir acesso", "right": "if (senhaCorreta) { permitirAcesso(); }"}]}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 7
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

insert into public.activities (module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index)
select id, $cs$visual_code$cs$, $cs$Missão 8: Desenhe com comandos$cs$, $cs$Digite os comandos no editor visual e observe o resultado.$cs$, $cs${"starter_code": "cor azul\ncirculo 100 100 50\ncor vermelho\nretangulo 180 100 80 60\ncor verde\nlinha 50 220 300 220", "required_commands": ["cor", "circulo", "retangulo", "linha"], "minimum_lines": 4}$cs$::jsonb,
  $cs$Muito bem! Você concluiu a missão prática deste módulo.$cs$,
  $cs$Revise o enunciado e tente novamente. Observe a ordem, a condição ou o padrão solicitado.$cs$,
  1
from public.modules
where order_index = 8
on conflict (module_id, order_index) do update set
  activity_type = excluded.activity_type,
  title = excluded.title,
  statement = excluded.statement,
  activity_data = excluded.activity_data,
  success_feedback = excluded.success_feedback,
  error_feedback = excluded.error_feedback;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno precisa explicar para um colega como acessar uma atividade online. Ele escreveu: 1. Responder à atividade; 2. Abrir o navegador; 3. Entrar no site da escola; 4. Fazer login; 5. Clicar na atividade. Qual é o principal problema dessa sequência?$cs$, $cs$A sequência está correta, pois responder à atividade pode ser feito antes de abrir o navegador.$cs$, $cs$A sequência está incorreta apenas porque deveria começar com ligar o computador.$cs$, $cs$A sequência possui uma ação fora de ordem, porque não é possível responder à atividade antes de acessá-la.$cs$, $cs$A sequência está incorreta porque fazer login deveria ser sempre o último passo.$cs$, 1
  from public.modules
  where order_index = 1
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$A ação responder à atividade depende de abrir o navegador, acessar o site, fazer login e entrar na atividade. Por isso, ela não pode ser o primeiro passo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$LOGIC recebeu a instrução: “Organize meu material escolar”. Qual alternativa transforma essa instrução em uma sequência mais lógica e clara?$cs$, $cs$Guardar tudo, pegar os livros, abrir a mochila e separar os cadernos.$cs$, $cs$Pegar a mochila, separar livros e cadernos necessários, colocar os materiais dentro dela e fechar a mochila.$cs$, $cs$Fechar a mochila, procurar os materiais, separar os livros e depois abrir a mochila.$cs$, $cs$Colocar qualquer material na mochila, sem verificar se será usado naquele dia.$cs$, 2
  from public.modules
  where order_index = 1
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A alternativa correta apresenta uma ordem coerente: preparar a mochila, escolher os materiais necessários e guardá-los.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em qual situação abaixo a lógica está sendo usada de forma mais evidente?$cs$, $cs$Um estudante escolhe aleatoriamente qualquer resposta de uma prova sem ler as perguntas.$cs$, $cs$Uma pessoa tenta montar um móvel sem observar as peças nem seguir instruções.$cs$, $cs$Um aluno copia comandos de programação sem entender o que eles fazem.$cs$, $cs$Um jogador analisa obstáculos, escolhe uma estratégia e decide qual caminho seguir para vencer uma fase.$cs$, 3
  from public.modules
  where order_index = 1
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$A lógica aparece quando há análise, organização de ações e tomada de decisão com base em um objetivo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Uma instrução para computador precisa ser mais detalhada do que uma instrução para uma pessoa porque:$cs$, $cs$computadores executam instruções de forma literal e não deduzem intenções como uma pessoa faria.$cs$, $cs$computadores conseguem interpretar emoções, mas precisam de frases longas.$cs$, $cs$computadores sempre corrigem automaticamente instruções incompletas.$cs$, $cs$computadores não seguem ordens em sequência, apenas comandos aleatórios.$cs$, 4
  from public.modules
  where order_index = 1
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$O computador executa o que foi instruído. Se a instrução for vaga, ele não entenderá a intenção por trás dela.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Observe: “Se eu tiver terminado a tarefa, posso jogar. Se eu não tiver terminado, preciso continuar estudando.” Essa situação apresenta principalmente qual elemento lógico?$cs$, $cs$Repetição, porque a pessoa joga várias vezes.$cs$, $cs$Sequência sem dependência entre ações.$cs$, $cs$Decisão baseada em uma condição.$cs$, $cs$Erro lógico, porque estudar e jogar não podem aparecer na mesma situação.$cs$, 5
  from public.modules
  where order_index = 1
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$A ação depende de uma condição: terminar ou não terminar a tarefa. Isso caracteriza uma decisão lógica.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Uma turma precisa organizar uma apresentação sobre meio ambiente. O grupo está perdido porque o tema parece muito grande. Qual atitude representa melhor o uso da decomposição?$cs$, $cs$Escolher qualquer assunto e começar os slides sem planejamento.$cs$, $cs$Dividir o trabalho em pesquisa, roteiro, criação dos slides, ensaio e apresentação.$cs$, $cs$Ignorar as partes difíceis e apresentar apenas o que for mais rápido.$cs$, $cs$Procurar um modelo pronto e copiar a apresentação inteira.$cs$, 1
  from public.modules
  where order_index = 2
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$Decompor é dividir um problema maior em partes menores e mais fáceis de organizar.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno percebe que, em vários jogos de labirinto, precisa observar o mapa, encontrar obstáculos e escolher o caminho mais curto. Essa percepção é um exemplo de:$cs$, $cs$abstração, porque ele ignorou totalmente o problema.$cs$, $cs$repetição, porque ele jogou muitas vezes sem pensar.$cs$, $cs$erro lógico, porque cada jogo deveria ser resolvido de forma completamente diferente.$cs$, $cs$reconhecimento de padrões, porque identificou semelhanças entre desafios parecidos.$cs$, 2
  from public.modules
  where order_index = 2
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$Reconhecimento de padrões ocorre quando percebemos semelhanças entre problemas e usamos isso para facilitar a solução.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um estudante vai explicar o caminho até a biblioteca. Qual alternativa demonstra melhor o uso da abstração?$cs$, $cs$Informar apenas os passos principais do caminho, como virar, seguir em frente e entrar no prédio correto.$cs$, $cs$Descrever todos os objetos vistos durante o caminho, mesmo que não ajudem na localização.$cs$, $cs$Contar a história completa da escola antes de explicar o caminho.$cs$, $cs$Dizer apenas “vá para a biblioteca”, sem nenhuma orientação.$cs$, 3
  from public.modules
  where order_index = 2
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$A abstração seleciona as informações relevantes e ignora detalhes que não contribuem para resolver o problema.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um algoritmo pode ser melhor definido como:$cs$, $cs$qualquer texto escrito em linguagem difícil.$cs$, $cs$um programa que só funciona em computadores modernos.$cs$, $cs$uma sequência organizada de passos para resolver um problema ou realizar uma tarefa.$cs$, $cs$uma decisão tomada sem planejamento.$cs$, 4
  from public.modules
  where order_index = 2
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$Algoritmo é uma sequência de instruções organizadas para alcançar um objetivo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Uma pessoa quer criar uma rotina de estudos. Ela identifica as matérias, separa horários, prioriza conteúdos difíceis e define momentos de revisão. Qual conjunto de habilidades aparece nessa situação?$cs$, $cs$Apenas memorização, porque estudar não envolve lógica.$cs$, $cs$Pensamento computacional, pois há decomposição, organização e criação de passos.$cs$, $cs$Somente abstração, porque todos os detalhes foram ignorados.$cs$, $cs$Apenas repetição, porque estudar significa repetir sem planejar.$cs$, 5
  from public.modules
  where order_index = 2
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A situação envolve pensamento computacional porque o problema foi dividido, organizado e transformado em uma sequência de ações.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um programa deve calcular o dobro de um número informado pelo usuário. Qual sequência representa melhor esse algoritmo?$cs$, $cs$Mostrar o resultado, multiplicar o número por 2 e depois pedir o número ao usuário.$cs$, $cs$Multiplicar qualquer número por 2, sem receber entrada, e encerrar o programa.$cs$, $cs$Pedir um número, mostrar o mesmo número e ignorar o cálculo.$cs$, $cs$Pedir um número ao usuário, multiplicar esse número por 2 e mostrar o resultado.$cs$, 1
  from public.modules
  where order_index = 3
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$O algoritmo precisa primeiro receber a entrada, depois processar o valor e, por fim, mostrar a saída.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em um algoritmo que calcula a idade de uma pessoa com base no ano de nascimento, qual alternativa identifica corretamente entrada, processamento e saída?$cs$, $cs$Entrada: idade final; processamento: mostrar o ano; saída: nome da pessoa.$cs$, $cs$Entrada: ano de nascimento; processamento: subtrair o ano de nascimento do ano atual; saída: idade aproximada.$cs$, $cs$Entrada: ano atual; processamento: ignorar o ano de nascimento; saída: mensagem vazia.$cs$, $cs$Entrada: nome da pessoa; processamento: exibir o nome; saída: cálculo da idade.$cs$, 2
  from public.modules
  where order_index = 3
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$Para calcular a idade, o algoritmo precisa receber o ano de nascimento, realizar a subtração e mostrar a idade.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno criou este pseudocódigo: Início; Mostrar resultado; Ler nota1; Ler nota2; Calcular média; Fim. Qual é o erro lógico?$cs$, $cs$O algoritmo deveria ler as notas antes de mostrar o resultado.$cs$, $cs$O algoritmo deveria calcular a média antes de ler as notas.$cs$, $cs$O comando Início não pode aparecer em pseudocódigo.$cs$, $cs$O algoritmo está correto, pois a ordem não interfere no resultado.$cs$, 3
  from public.modules
  where order_index = 3
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$Não é possível mostrar um resultado antes de receber os dados e realizar o cálculo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Por que o pseudocódigo é útil antes da programação?$cs$, $cs$Porque substitui completamente qualquer linguagem de programação.$cs$, $cs$Porque elimina a necessidade de testar programas.$cs$, $cs$Porque permite planejar a lógica do algoritmo sem se preocupar inicialmente com regras rígidas de sintaxe.$cs$, $cs$Porque computadores executam pseudocódigo diretamente sem tradução.$cs$, 4
  from public.modules
  where order_index = 3
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$O pseudocódigo ajuda a organizar a lógica antes de escrever o programa em uma linguagem real.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um algoritmo para fazer login possui: 1. Verificar se e-mail e senha estão corretos; 2. Exibir tela inicial; 3. Receber e-mail e senha. Qual alteração deixaria a sequência mais lógica?$cs$, $cs$Manter a ordem, pois o sistema pode verificar dados antes de recebê-los.$cs$, $cs$Colocar “receber e-mail e senha” antes de verificar se estão corretos.$cs$, $cs$Remover a verificação e sempre exibir a tela inicial.$cs$, $cs$Exibir a tela inicial antes de qualquer validação.$cs$, 5
  from public.modules
  where order_index = 3
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$O sistema só pode verificar e-mail e senha depois que esses dados forem informados pelo usuário.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aplicativo de biblioteca precisa decidir se um aluno pode pegar um livro emprestado. A regra é: o aluno só pode pegar o livro se não tiver pendências. Qual alternativa representa melhor essa lógica?$cs$, $cs$Se o aluno tiver pendências, então liberar o livro normalmente.$cs$, $cs$Liberar o livro antes de verificar a situação do aluno.$cs$, $cs$Se o aluno não tiver pendências, então liberar o empréstimo; senão, informar que há pendências.$cs$, $cs$Bloquear todos os alunos, independentemente da situação.$cs$, 1
  from public.modules
  where order_index = 4
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$A decisão depende da condição não ter pendências. Se for verdadeira, o empréstimo é liberado; caso contrário, é bloqueado.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em um jogo, o personagem perde uma vida quando encosta em um obstáculo. Qual condição deve ser verificada?$cs$, $cs$Se o personagem encostar no obstáculo, perder vida.$cs$, $cs$Se o personagem estiver parado, perder vida.$cs$, $cs$Se o obstáculo existir em qualquer lugar da tela, perder vida.$cs$, $cs$Se o jogador iniciar o jogo, perder vida automaticamente.$cs$, 2
  from public.modules
  where order_index = 4
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$A condição correta está relacionada ao contato entre personagem e obstáculo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Regra: se a temperatura for maior que 38 graus, exibir “febre alta”. Senão, exibir “temperatura abaixo do limite”. Qual situação faria exibir “temperatura abaixo do limite”?$cs$, $cs$Temperatura igual a 39 graus.$cs$, $cs$Temperatura igual a 40 graus.$cs$, $cs$Temperatura igual a 38,5 graus.$cs$, $cs$Temperatura igual a 38 graus.$cs$, 3
  from public.modules
  where order_index = 4
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$A condição é maior que 38. Se for exatamente 38, ela não é maior que 38, então cai no senão.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um sistema deve permitir entrada em um evento apenas para pessoas com idade maior ou igual a 18 anos. Qual alternativa representa corretamente a condição?$cs$, $cs$Se idade > 18, permitir entrada; pessoas com 18 anos ficariam de fora.$cs$, $cs$Se idade >= 18, permitir entrada; senão, bloquear entrada.$cs$, $cs$Se idade < 18, permitir entrada; senão, bloquear.$cs$, $cs$Permitir entrada sem verificar idade, pois a condição é opcional.$cs$, 4
  from public.modules
  where order_index = 4
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A regra inclui pessoas com 18 anos ou mais, por isso a comparação correta é maior ou igual a 18.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Uma condicional é útil em algoritmos porque:$cs$, $cs$faz o programa repetir automaticamente todos os comandos.$cs$, $cs$impede que o programa receba dados do usuário.$cs$, $cs$permite que o programa escolha ações diferentes dependendo de uma condição.$cs$, $cs$elimina a necessidade de sequência lógica.$cs$, 5
  from public.modules
  where order_index = 4
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$Condicionais permitem que o algoritmo tenha caminhos diferentes dependendo de uma situação verdadeira ou falsa.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um personagem precisa andar 8 casas para frente. Qual solução é mais eficiente?$cs$, $cs$Escrever “andar” 8 vezes, sem usar repetição.$cs$, $cs$Usar “repita 8 vezes: andar”.$cs$, $cs$Usar “se andar, então pare” sem indicar quantidade.$cs$, $cs$Ignorar o número de casas e andar apenas uma vez.$cs$, 1
  from public.modules
  where order_index = 5
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$Quando a quantidade de repetições é conhecida, usar repita 8 vezes torna o algoritmo mais eficiente.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Observe: direita, esquerda, direita, esquerda, direita, esquerda. Qual alternativa descreve melhor o padrão?$cs$, $cs$A sequência não possui padrão, pois os comandos são diferentes.$cs$, $cs$O comando “direita” aparece uma vez e depois desaparece.$cs$, $cs$A sequência só poderia ser considerada padrão se tivesse números.$cs$, $cs$O padrão “direita, esquerda” se repete três vezes.$cs$, 2
  from public.modules
  where order_index = 5
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$Há um padrão alternado entre direita e esquerda, repetido três vezes.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em qual situação uma repetição com condição seria mais adequada?$cs$, $cs$Continuar pedindo a senha enquanto ela estiver incorreta.$cs$, $cs$Repetir exatamente 3 vezes uma ação já definida.$cs$, $cs$Mostrar uma mensagem uma única vez.$cs$, $cs$Executar uma ação sem verificar nenhuma situação.$cs$, 3
  from public.modules
  where order_index = 5
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$Quando não sabemos quantas tentativas serão necessárias, a repetição pode depender de uma condição.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Algoritmo: andar, andar, andar, virar direita, andar, andar, andar, virar direita. Qual padrão pode ser identificado?$cs$, $cs$Apenas o comando virar direita importa.$cs$, $cs$Não existe repetição porque há dois tipos de comando.$cs$, $cs$“andar, andar, andar, virar direita” aparece mais de uma vez.$cs$, $cs$O algoritmo só teria padrão se todos os comandos fossem iguais.$cs$, 4
  from public.modules
  where order_index = 5
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$Um padrão pode envolver mais de um comando. Nesse caso, o bloco andar três vezes e virar direita se repete.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Por que estruturas de repetição são importantes na programação?$cs$, $cs$Porque tornam obrigatório repetir todos os comandos manualmente.$cs$, $cs$Porque ajudam a reduzir repetição desnecessária e tornam o algoritmo mais organizado.$cs$, $cs$Porque impedem o uso de condições.$cs$, $cs$Porque servem apenas para criar jogos, não para outros programas.$cs$, 5
  from public.modules
  where order_index = 5
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$Repetições tornam os algoritmos mais eficientes e evitam comandos duplicados.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em um desafio de blocos, o personagem precisa seguir em frente três vezes. Qual solução demonstra melhor uso de repetição?$cs$, $cs$andar, andar, andar.$cs$, $cs$virar direita, andar, virar esquerda.$cs$, $cs$se houver parede, andar três vezes.$cs$, $cs$repetir 3 vezes: andar.$cs$, 1
  from public.modules
  where order_index = 6
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$Essa solução usa repetição para representar três comandos iguais de forma mais eficiente.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno montou: virar direita, andar, andar. Mas o personagem precisava primeiro avançar duas casas e só depois virar. Qual é o problema?$cs$, $cs$A quantidade de blocos é insuficiente.$cs$, $cs$A ordem dos comandos está incorreta.$cs$, $cs$O comando andar nunca pode ser repetido.$cs$, $cs$O personagem deveria ignorar os blocos.$cs$, 2
  from public.modules
  where order_index = 6
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$O erro está na sequência. A ordem dos blocos altera completamente o resultado.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Qual situação representa melhor o uso de uma condição em blocos?$cs$, $cs$Se houver obstáculo à frente, virar; senão, continuar andando.$cs$, $cs$Sempre andar três casas, sem verificar o caminho.$cs$, $cs$Repetir o mesmo comando sem parar.$cs$, $cs$Colocar todos os blocos em ordem aleatória.$cs$, 3
  from public.modules
  where order_index = 6
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$A condição permite escolher uma ação dependendo da situação encontrada.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Em programação em blocos, o principal objetivo pedagógico é:$cs$, $cs$eliminar completamente a necessidade de lógica.$cs$, $cs$impedir que o aluno aprenda programação textual futuramente.$cs$, $cs$permitir que o aluno foque na lógica antes de lidar com detalhes de sintaxe textual.$cs$, $cs$transformar todos os comandos em desenhos sem função lógica.$cs$, 4
  from public.modules
  where order_index = 6
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$Blocos ajudam iniciantes a compreender a lógica dos programas antes de aprender a sintaxe de uma linguagem.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um personagem precisa contornar um quadrado. A sequência “andar 3 vezes e virar direita” se repete quatro vezes. Qual solução é mais adequada?$cs$, $cs$Escrever aleatoriamente comandos de andar e virar até funcionar.$cs$, $cs$Criar uma repetição de 4 vezes contendo “andar 3 vezes” e “virar direita”.$cs$, $cs$Usar apenas o comando virar direita quatro vezes.$cs$, $cs$Usar apenas andar até o personagem sair do mapa.$cs$, 5
  from public.modules
  where order_index = 6
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A solução reconhece um padrão composto e o organiza em uma repetição maior.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Qual alternativa melhor representa o bloco “andar” em formato de código simplificado?$cs$, $cs$andar();$cs$, $cs$repetir andar enquanto senha correta;$cs$, $cs$se andar, então virar;$cs$, $cs$código não pode representar blocos simples.$cs$, 1
  from public.modules
  where order_index = 7
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$O comando andar() representa uma ação simples, assim como o bloco andar.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Observe o código: andar(); virarDireita(); andar(); Qual sequência de blocos corresponde a esse código?$cs$, $cs$virar direita, andar, andar.$cs$, $cs$andar, andar, virar direita.$cs$, $cs$repetir três vezes: virar direita.$cs$, $cs$andar, virar direita, andar.$cs$, 2
  from public.modules
  where order_index = 7
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$O código deve ser lido na ordem em que aparece: primeiro anda, depois vira, depois anda novamente.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$O bloco “repita 5 vezes: andar” indica que:$cs$, $cs$o comando andar será executado uma única vez.$cs$, $cs$o comando andar será executado cinco vezes.$cs$, $cs$o comando andar será executado enquanto existir uma parede.$cs$, $cs$o comando andar será ignorado se não houver condição.$cs$, 3
  from public.modules
  where order_index = 7
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A estrutura de repetição com quantidade definida executa a ação pelo número indicado.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Estrutura: if (temObstaculo) { virarDireita(); } else { andar(); }. Qual interpretação está correta?$cs$, $cs$O personagem sempre anda, independentemente da condição.$cs$, $cs$O personagem vira e anda ao mesmo tempo em todas as situações.$cs$, $cs$Se houver obstáculo, o personagem vira à direita; caso contrário, anda.$cs$, $cs$A estrutura representa repetição, não decisão.$cs$, 4
  from public.modules
  where order_index = 7
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$A estrutura if/else representa uma decisão baseada na condição temObstaculo.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Por que é importante relacionar blocos e código textual?$cs$, $cs$Porque blocos e código usam lógicas completamente opostas.$cs$, $cs$Porque ajuda o aluno a perceber que a programação textual segue a mesma lógica aprendida nos blocos.$cs$, $cs$Porque elimina a necessidade de entender sequência e condição.$cs$, $cs$Porque código textual só serve para copiar comandos prontos.$cs$, 5
  from public.modules
  where order_index = 7
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A relação entre blocos e código mostra que a lógica permanece a mesma, mesmo mudando a forma de representação.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Observe o comando: circulo 120 80 40. Qual interpretação está mais adequada?$cs$, $cs$Criar uma linha entre os pontos 120 e 80.$cs$, $cs$Criar um retângulo com largura 120 e altura 80.$cs$, $cs$Criar um círculo na posição aproximada x=120 e y=80, com tamanho 40.$cs$, $cs$Alterar a cor do desenho para 40.$cs$, 1
  from public.modules
  where order_index = 8
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$O comando circulo usa os valores para definir posição e tamanho da forma.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno escreveu: cor azul; retangulo 100 100 80 50. O que deve acontecer?$cs$, $cs$O sistema deve desenhar um retângulo azul com base nas medidas informadas.$cs$, $cs$O sistema deve desenhar um círculo, porque toda cor gera círculo automaticamente.$cs$, $cs$O sistema deve ignorar o comando de cor.$cs$, $cs$O sistema deve apagar a tela antes de desenhar.$cs$, 2
  from public.modules
  where order_index = 8
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'A', $cs$O comando cor azul define a cor atual, e o comando seguinte desenha o retângulo usando essa cor.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Qual alternativa apresenta apenas comandos válidos para a linguagem controlada do CodeStart?$cs$, $cs$hackear sistema; abrir senha; apagar servidor.$cs$, $cs$desenhe algo bonito; faça uma imagem; concluir.$cs$, $cs$iniciar JavaScript; executar código livre; acessar dados.$cs$, $cs$cor verde; circulo 100 100 50; linha 0 0 200 200.$cs$, 3
  from public.modules
  where order_index = 8
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'D', $cs$A linguagem controlada aceita apenas comandos seguros e definidos previamente.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Por que o CodeStart utiliza uma linguagem controlada em vez de executar JavaScript livre digitado pelo aluno?$cs$, $cs$Porque JavaScript não permite desenhar formas.$cs$, $cs$Porque uma linguagem controlada reduz riscos e mantém o foco nos conceitos iniciais de lógica.$cs$, $cs$Porque comandos simples não podem gerar resultados visuais.$cs$, $cs$Porque programação textual não deve ser ensinada a iniciantes.$cs$, 4
  from public.modules
  where order_index = 8
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'B', $cs$A linguagem controlada permite aprender lógica e comandos visuais de forma segura, sem expor o sistema a riscos desnecessários.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id, $cs$Um aluno quer criar uma imagem com uma linha verde e um círculo vermelho. Qual sequência é mais adequada?$cs$, $cs$linha 0 0 100 100; cor verde; circulo 50 50 30; cor vermelho.$cs$, $cs$circulo vermelho; linha verde; limpar tudo.$cs$, $cs$cor verde; linha 0 0 100 100; cor vermelho; circulo 50 50 30.$cs$, $cs$cor linha; verde 0 0 100 100; vermelho 50 50.$cs$, 5
  from public.modules
  where order_index = 8
  on conflict (module_id, order_index) do update set
    question = excluded.question,
    option_a = excluded.option_a,
    option_b = excluded.option_b,
    option_c = excluded.option_c,
    option_d = excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id, 'C', $cs$A cor deve ser definida antes da forma que será desenhada. Assim, a linha fica verde e o círculo fica vermelho.$cs$ from q
on conflict (question_id) do update set
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;


create or replace function public.submit_quiz_attempt(
  p_module_id uuid,
  p_answers jsonb
)
returns table (
  score numeric,
  total_questions int,
  correct_answers int,
  passed boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_total int;
  v_correct int;
  v_score numeric;
  v_passed boolean;
  v_xp int;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  select count(*)
  into v_total
  from public.quiz_questions
  where module_id = p_module_id;

  if v_total = 0 then
    raise exception 'Este módulo não possui questões cadastradas.';
  end if;

  select count(*)
  into v_correct
  from jsonb_to_recordset(p_answers)
  as ans(question_id uuid, selected_option text)
  join public.quiz_answer_keys key
    on key.question_id = ans.question_id
  join public.quiz_questions q
    on q.id = ans.question_id
  where q.module_id = p_module_id
    and upper(ans.selected_option) = key.correct_option;

  v_score := round((v_correct::numeric / v_total::numeric) * 100, 2);
  v_passed := v_score >= 70;

  insert into public.quiz_attempts (
    user_id,
    module_id,
    score,
    total_questions,
    correct_answers,
    answers
  )
  values (
    v_user_id,
    p_module_id,
    v_score,
    v_total,
    v_correct,
    p_answers
  );

  if v_passed then
    select xp_reward
    into v_xp
    from public.modules
    where id = p_module_id;

    insert into public.progress (
      user_id,
      module_id,
      status,
      score,
      xp_earned,
      started_at,
      completed_at
    )
    values (
      v_user_id,
      p_module_id,
      'completed',
      v_score,
      v_xp,
      now(),
      now()
    )
    on conflict (user_id, module_id)
    do update set
      status = 'completed',
      score = greatest(coalesce(public.progress.score, 0), excluded.score),
      xp_earned = greatest(coalesce(public.progress.xp_earned, 0), excluded.xp_earned),
      completed_at = coalesce(public.progress.completed_at, now()),
      updated_at = now();
  end if;

  return query
  select v_score, v_total, v_correct, v_passed;
end;
$$;

grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;

create or replace function public.get_my_total_xp()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total_xp int;
begin
  select coalesce(sum(xp_earned), 0)
  into v_total_xp
  from public.progress
  where user_id = auth.uid()
    and status = 'completed';

  return v_total_xp;
end;
$$;

grant execute on function public.get_my_total_xp() to authenticated;
