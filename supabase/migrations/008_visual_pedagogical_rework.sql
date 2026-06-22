-- CodeStart v0.9
-- Reformulação visual/pedagógica: conteúdos aprofundados, atividades progressivas e desafios mais objetivos.

grant usage on schema public to anon, authenticated;

update public.modules set title=$cs$Missão 1: Fundamentos da Lógica$cs$, description=$cs$Entenda como organizar ideias, passos e decisões para transformar problemas em instruções claras.$cs$ where order_index=1;
update public.modules set title=$cs$Missão 2: Pensamento Computacional$cs$, description=$cs$Use decomposição, padrões, abstração e algoritmos para resolver problemas de forma estratégica.$cs$ where order_index=2;
update public.modules set title=$cs$Missão 3: Algoritmos e Sequência Lógica$cs$, description=$cs$Transforme problemas em passos organizados com entrada, processamento e saída.$cs$ where order_index=3;
update public.modules set title=$cs$Missão 4: Decisões e Condicionais$cs$, description=$cs$Crie caminhos diferentes usando condições, comparações e estruturas se/senão.$cs$ where order_index=4;
update public.modules set title=$cs$Missão 5: Repetição e Padrões$cs$, description=$cs$Identifique padrões e use repetições para reduzir comandos e criar soluções mais eficientes.$cs$ where order_index=5;
update public.modules set title=$cs$Missão 6: Programação em Blocos$cs$, description=$cs$Monte blocos visuais para mover o LOGIC em desafios progressivos, inspirados na lógica do Blockly Games.$cs$ where order_index=6;
update public.modules set title=$cs$Missão 7: Do Bloco ao Código$cs$, description=$cs$Relacione blocos, pseudocódigo e código textual para entender a transição entre representações.$cs$ where order_index=7;
update public.modules set title=$cs$Missão 8: Código Visual e Projeto Final$cs$, description=$cs$Use comandos seguros para desenhar formas, criar cenas e preparar uma entrega final avaliável.$cs$ where order_index=8;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$A lógica como organização do pensamento$cs$,$cs$Lógica é a capacidade de organizar uma sequência de ideias para chegar a um resultado coerente. No CodeStart, lógica não é apenas “acertar uma resposta”; é entender por que uma ação precisa vir antes de outra e como uma decisão muda o caminho de uma solução.
Exemplo: Para enviar uma mensagem, você precisa abrir o aplicativo, escolher o contato, escrever o texto e só depois enviar. Se tentar enviar antes de escrever, a sequência falha.
Miniatividade: Pense em uma tarefa comum, como preparar um lanche, e identifique três passos que não podem trocar de lugar.$cs$,$cs$Toda programação começa com uma pergunta simples: qual é a ordem correta das ações?$cs$,1 from public.modules where order_index=1
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Instruções claras para computadores$cs$,$cs$Um computador não interpreta intenções como uma pessoa. Ele executa comandos de forma literal. Por isso, uma instrução vaga como “organize os arquivos” precisa ser dividida em ações menores: abrir pasta, selecionar arquivo, renomear, mover e confirmar.
Atenção: quanto mais ambígua for a instrução, maior a chance de o resultado ser diferente do esperado.
Miniatividade: Transforme o comando “faça login” em pelo menos quatro passos menores.$cs$,$cs$Se a instrução não estiver clara para um robô, ela provavelmente ainda não está pronta para virar algoritmo.$cs$,2 from public.modules where order_index=1
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Sequência, dependência e resultado$cs$,$cs$Sequência é a ordem das ações. Dependência é quando uma ação só pode ocorrer depois de outra. Resultado é aquilo que esperamos ao final do processo. Programar exige observar esses três elementos ao mesmo tempo.
Exemplo: Em um jogo, o personagem só pode passar de fase depois de coletar a chave. Coletar a chave é uma dependência para abrir a porta.
Miniatividade: Identifique uma dependência em um aplicativo que você usa no dia a dia.$cs$,$cs$Uma boa sequência evita retrabalho e ajuda o programa a chegar ao resultado certo.$cs$,3 from public.modules where order_index=1
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Resumo da missão$cs$,$cs$Nesta missão você aprendeu que lógica envolve organizar passos, evitar ambiguidade, respeitar dependências e prever resultados. Esses conceitos serão usados nos próximos módulos para construir algoritmos, decisões, repetições, blocos e desenhos programados.
Miniatividade: Antes de ir para a prática, responda mentalmente: qual é a diferença entre uma instrução vaga e uma instrução clara?$cs$,$cs$Se você consegue explicar o passo a passo, já está começando a pensar como programador.$cs$,4 from public.modules where order_index=1
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$O que é pensamento computacional?$cs$,$cs$Pensamento computacional é uma forma de resolver problemas usando estratégias parecidas com as que usamos para criar programas. Ele não depende de saber uma linguagem de programação. Antes de escrever código, o aluno aprende a analisar o problema.
As quatro ideias centrais são decomposição, reconhecimento de padrões, abstração e algoritmo.
Miniatividade: Escolha uma tarefa grande, como organizar uma feira de ciências, e divida em quatro partes menores.$cs$,$cs$Programar não começa digitando código. Começa entendendo o problema.$cs$,1 from public.modules where order_index=2
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Decomposição: quebrar o problema$cs$,$cs$Decompor é dividir um problema grande em partes menores. Isso facilita a análise e reduz a sensação de dificuldade. Em vez de pensar “criar um jogo”, podemos separar em personagem, cenário, pontuação, regras e tela final.
Exemplo: Para criar um cadastro, precisamos pensar em campos, validação, envio, armazenamento e mensagem de retorno.
Miniatividade: Quebre o problema “fazer uma apresentação escolar” em cinco etapas.$cs$,$cs$Quando um problema parece grande demais, divida em missões menores.$cs$,2 from public.modules where order_index=2
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Padrões e abstração$cs$,$cs$Reconhecer padrões é perceber repetições ou semelhanças. Abstração é focar no que importa e ignorar detalhes que não são necessários naquele momento.
Exemplo: Em vários jogos de labirinto, o padrão é mover, testar caminho, desviar de obstáculos e chegar ao objetivo. A cor do personagem pode ser ignorada se o problema é apenas encontrar o caminho.
Miniatividade: Em um aplicativo de entrega, quais informações são essenciais para acompanhar o pedido?$cs$,$cs$Padrões economizam esforço. Abstração evita distrações.$cs$,3 from public.modules where order_index=2
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Algoritmo como plano de solução$cs$,$cs$Depois de decompor, encontrar padrões e abstrair, criamos um algoritmo: uma sequência de passos para resolver o problema. Um algoritmo pode ser escrito em linguagem natural, pseudocódigo, blocos ou código textual.
Atenção: algoritmo não é sinônimo de código. Código é uma forma de representar um algoritmo para o computador executar.
Miniatividade: Escreva um algoritmo simples para decidir se você deve levar guarda-chuva.$cs$,$cs$Um algoritmo é o plano. O código é uma das formas de executar esse plano.$cs$,4 from public.modules where order_index=2
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Entrada, processamento e saída$cs$,$cs$Muitos algoritmos seguem a lógica EPS: entrada, processamento e saída. Entrada é o dado recebido; processamento é o que fazemos com esse dado; saída é o resultado apresentado.
Exemplo: Para calcular a média, as entradas são as notas, o processamento é somar e dividir, e a saída é a média.
Miniatividade: Em uma calculadora de idade, identifique entrada, processamento e saída.$cs$,$cs$EPS é uma forma simples de enxergar o funcionamento de muitos programas.$cs$,1 from public.modules where order_index=3
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Pseudocódigo$cs$,$cs$Pseudocódigo é uma forma de escrever algoritmo de maneira próxima da linguagem humana, mas com organização lógica. Ele ajuda a planejar antes de usar uma linguagem real.
Exemplo: Leia nota1; Leia nota2; media recebe (nota1 + nota2) / 2; Mostre media.
Miniatividade: Escreva um pseudocódigo para calcular o dobro de um número.$cs$,$cs$Pseudocódigo é um rascunho inteligente antes do código final.$cs$,2 from public.modules where order_index=3
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Erros de sequência$cs$,$cs$Um erro de sequência acontece quando um passo aparece antes da informação necessária. Não é possível mostrar uma média antes de ler as notas, nem verificar senha antes de o usuário digitar a senha.
Atenção: muitos bugs simples surgem porque uma etapa foi colocada no lugar errado.
Miniatividade: Corrija mentalmente: “mostrar resultado, ler número, calcular dobro”.$cs$,$cs$A ordem dos comandos pode mudar completamente o resultado.$cs$,3 from public.modules where order_index=3
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Construindo algoritmos verificáveis$cs$,$cs$Um bom algoritmo deve ser claro, completo e testável. Para verificar, pergunte: tenho todos os dados necessários? A ordem faz sentido? O resultado está definido? Existe algum caso especial?
Exemplo: Em um login, o caso especial pode ser senha vazia ou usuário não cadastrado.
Miniatividade: Liste dois casos especiais de um algoritmo de cadastro.$cs$,$cs$Um algoritmo bom não funciona só no caso fácil; ele prevê situações importantes.$cs$,4 from public.modules where order_index=3
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Condição verdadeira ou falsa$cs$,$cs$Uma condição é uma pergunta que pode ser respondida como verdadeira ou falsa. Na programação, ela controla qual caminho será seguido.
Exemplo: “a senha está correta?” Se sim, permitir acesso. Se não, mostrar erro.
Miniatividade: Crie três condições do cotidiano que tenham resposta sim/não.$cs$,$cs$Condicionais fazem o programa reagir ao que acontece.$cs$,1 from public.modules where order_index=4
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Estrutura se/então$cs$,$cs$A estrutura se/então executa uma ação quando uma condição é verdadeira. Ela aparece em jogos, sites, aplicativos e sistemas de segurança.
Exemplo: Se saldo >= preço, então confirmar compra.
Atenção: a comparação precisa estar bem definida. “maior”, “menor”, “igual” e “diferente” mudam o comportamento.$cs$,$cs$O “se” abre um caminho dentro do algoritmo.$cs$,2 from public.modules where order_index=4
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Estrutura se/senão$cs$,$cs$O senão define o que acontece quando a condição não é verdadeira. Isso evita deixar o usuário sem resposta.
Exemplo: Se nota >= 7, mostrar “aprovado”; senão, mostrar “recuperação”.
Miniatividade: Complete: Se idade >= 18, então ______; senão ______.$cs$,$cs$O senão é o plano B do algoritmo.$cs$,3 from public.modules where order_index=4
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Condicionais em jogos e interfaces$cs$,$cs$Em jogos, condicionais controlam colisões, pontuação, vida e mudança de fase. Em interfaces, controlam mensagens, botões liberados e permissões.
Exemplo: Se o personagem tocar no obstáculo, perder vida. Se pegar estrela, ganhar pontos.
Miniatividade: Imagine uma regra de jogo que use duas condições diferentes.$cs$,$cs$Quando um sistema parece inteligente, muitas vezes ele só está usando boas condições.$cs$,4 from public.modules where order_index=4
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Por que repetir comandos?$cs$,$cs$Repetição permite executar a mesma ação várias vezes sem escrever tudo de novo. Isso deixa o algoritmo menor, mais claro e mais fácil de modificar.
Exemplo: em vez de escrever andar oito vezes, usamos “repita 8 vezes: andar”.
Miniatividade: Substitua mentalmente “pular, pular, pular, pular” por uma repetição.$cs$,$cs$Programadores procuram padrões para economizar comandos.$cs$,1 from public.modules where order_index=5
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Repetição com quantidade definida$cs$,$cs$Quando sabemos exatamente quantas vezes uma ação deve acontecer, usamos uma repetição com quantidade definida.
Exemplo: Repita 4 vezes: desenhar lado e virar à direita. Isso pode criar um quadrado.
Miniatividade: Que repetição poderia representar “bater palma seis vezes”?$cs$,$cs$Se a quantidade é conhecida, a repetição fica objetiva.$cs$,2 from public.modules where order_index=5
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Repetição com condição$cs$,$cs$Nem sempre sabemos a quantidade de repetições. Às vezes repetimos enquanto uma condição for verdadeira.
Exemplo: enquanto a senha estiver incorreta, pedir senha novamente.
Atenção: se a condição nunca mudar, o algoritmo pode entrar em repetição infinita.$cs$,$cs$Loops precisam de uma condição de parada.$cs$,3 from public.modules where order_index=5
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Padrões em desenhos, jogos e blocos$cs$,$cs$Padrões aparecem em caminhos, animações, desenhos e jogos. Identificar padrões ajuda a criar soluções com menos esforço.
Exemplo: para desenhar uma escada, o padrão pode ser: subir, avançar, subir, avançar.
Miniatividade: Identifique um padrão visual em um objeto da sala.$cs$,$cs$Quando você enxerga um padrão, encontra uma oportunidade de automatizar.$cs$,4 from public.modules where order_index=5
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Blocos como comandos visuais$cs$,$cs$Programação em blocos representa comandos por peças visuais. Em vez de digitar uma linguagem inteira, o aluno monta uma sequência com blocos como andar, virar ou repetir.
Exemplo: andar + andar + virar direita + andar cria um caminho.
Miniatividade: Explique por que blocos ajudam iniciantes a focar na lógica.$cs$,$cs$Blocos reduzem a barreira inicial e deixam a lógica mais visível.$cs$,1 from public.modules where order_index=6
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Sequência de blocos$cs$,$cs$A ordem dos blocos importa. O personagem executa o primeiro bloco, depois o segundo, depois o terceiro. Uma troca de ordem pode levar LOGIC para outro lugar.
Exemplo: andar antes de virar é diferente de virar antes de andar.
Miniatividade: Imagine LOGIC olhando para a direita. O que acontece se ele executar virar direita e depois andar?$cs$,$cs$Cada bloco é um passo da missão.$cs$,2 from public.modules where order_index=6
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Viradas, direção e mapa$cs$,$cs$Em desafios de mapa, o personagem tem posição e direção. Virar não muda a posição imediatamente; apenas muda para onde ele está olhando. Andar muda a posição na direção atual.
Atenção: muitos erros acontecem porque o aluno esquece a direção do personagem.
Miniatividade: Se LOGIC está olhando para cima e vira à esquerda, para onde ele passa a olhar?$cs$,$cs$Programar movimento exige pensar em posição e direção.$cs$,3 from public.modules where order_index=6
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Repetição em blocos$cs$,$cs$Depois de entender sequência e direção, os blocos de repetição ajudam a reduzir caminhos longos. Mesmo quando o nosso protótipo usa blocos simples, o conceito de repetição prepara para desafios mais avançados.
Exemplo: repita 3 vezes: andar substitui andar + andar + andar.
Miniatividade: Escreva mentalmente um caminho com cinco movimentos e depois tente simplificar com repetição.$cs$,$cs$O objetivo não é só chegar ao destino, mas criar uma solução lógica e eficiente.$cs$,4 from public.modules where order_index=6
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Blocos e código representam a mesma lógica$cs$,$cs$Um bloco “andar” pode virar uma instrução textual como andar();. Um bloco “se houver obstáculo” pode virar uma estrutura condicional. O importante é perceber que a ideia lógica continua a mesma.
Exemplo: Bloco repetir 4 vezes pode ser representado como repetir(4) ou for em linguagens reais.
Miniatividade: Traduza “andar, virar direita, andar” para uma sequência de comandos textuais.$cs$,$cs$O bloco é uma ponte entre a ideia e o código.$cs$,1 from public.modules where order_index=7
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Pseudocódigo como intermediário$cs$,$cs$Antes de escrever código real, podemos usar pseudocódigo para organizar a solução. Ele é mais flexível que código e mais preciso que uma explicação solta.
Exemplo: Se encontrar obstáculo, virar direita; senão, andar.
Miniatividade: Escreva uma regra de jogo em pseudocódigo usando se/senão.$cs$,$cs$Pseudocódigo ajuda a pensar sem travar na sintaxe.$cs$,2 from public.modules where order_index=7
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Sintaxe e semântica$cs$,$cs$Sintaxe é a forma correta de escrever. Semântica é o sentido do comando. Um código pode ter sintaxe correta e ainda assim fazer a coisa errada se a lógica estiver ruim.
Exemplo: andar(); andar(); pode estar escrito corretamente, mas pode bater em uma parede se o caminho exigir virar antes.
Atenção: aprender programação exige cuidar da forma e do significado.$cs$,$cs$Código correto não é só código que “roda”; é código que resolve o problema.$cs$,3 from public.modules where order_index=7
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Interpretando saídas$cs$,$cs$Ler código e prever o resultado é uma habilidade essencial. Antes de executar, o aluno deve tentar imaginar o que vai acontecer. Isso desenvolve raciocínio lógico e depuração.
Exemplo: idade = 16; se idade >= 18, mostrar maior; senão, mostrar menor. A saída será “menor”.
Miniatividade: Preveja a saída de uma condição usando uma variável inventada por você.$cs$,$cs$Prever a saída é como simular o algoritmo na mente.$cs$,4 from public.modules where order_index=7
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Código visual com comandos controlados$cs$,$cs$No CodeStart, o aluno não executa JavaScript livre. Ele usa uma linguagem controlada com comandos específicos, como cor, circulo, retangulo, linha e triangulo. Isso torna a atividade mais segura e objetiva.
Exemplo: cor azul; retangulo 100 150 160 90 desenha um retângulo azul na tela.
Miniatividade: Explique por que uma linguagem controlada é mais segura para alunos iniciantes.$cs$,$cs$Segurança também faz parte de um bom ambiente educacional.$cs$,1 from public.modules where order_index=8
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Coordenadas e dimensões$cs$,$cs$A tela de desenho usa coordenadas. O primeiro número geralmente indica a posição horizontal x, e o segundo indica a posição vertical y. Largura, altura e tamanho definem a dimensão das formas.
Exemplo: circulo 300 80 60 cria um círculo com centro aproximado em x=300, y=80 e tamanho 60.
Atenção: se os números forem muito grandes, a forma pode sair da área visível.$cs$,$cs$Desenhar com código é transformar números em imagem.$cs$,2 from public.modules where order_index=8
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Compondo formas para criar objetos$cs$,$cs$Objetos complexos podem ser construídos com formas simples. Uma casa pode ter retângulo para corpo, triângulo para telhado, retângulo para porta e pequenos retângulos para janelas. Uma árvore pode ter retângulo para tronco e círculos para copa.
Miniatividade: Planeje quais formas você usaria para montar um carro simples.$cs$,$cs$Programação visual mostra como partes pequenas formam uma solução maior.$cs$,3 from public.modules where order_index=8
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.lessons (module_id,title,content,logic_message,order_index)
select id,$cs$Preparação para o projeto final$cs$,$cs$O projeto final agora pede uma cena programada com requisitos mínimos. O objetivo não é apenas desenhar algo bonito, mas demonstrar lógica, sequência, uso de comandos, organização espacial e atenção aos critérios.
Exemplo: uma cena com casa, árvore, sol e chão exige cor, círculo, retângulo, triângulo e linha.
Miniatividade: Antes de abrir o projeto final, rascunhe mentalmente a ordem dos comandos.$cs$,$cs$Um bom projeto final tem intenção, organização e critérios claros.$cs$,4 from public.modules where order_index=8
on conflict (module_id, order_index) do update set title=excluded.title, content=excluded.content, logic_message=excluded.logic_message;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 1.1: Sequência clara para acesso online$cs$,$cs$Organize os passos para acessar uma atividade online sem pular etapas.$cs$,$cs${"items": ["Clicar na atividade", "Abrir o navegador", "Responder à atividade", "Entrar no site da escola", "Fazer login"], "correct_order": ["Abrir o navegador", "Entrar no site da escola", "Fazer login", "Clicar na atividade", "Responder à atividade"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=1
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 2.1: Decompondo uma feira de ciências$cs$,$cs$Organize as etapas principais de um pequeno evento escolar.$cs$,$cs${"items": ["Apresentar os projetos", "Definir tema", "Montar equipes", "Preparar materiais", "Avaliar resultados"], "correct_order": ["Definir tema", "Montar equipes", "Preparar materiais", "Apresentar os projetos", "Avaliar resultados"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=2
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 3.1: Média de notas em pseudocódigo$cs$,$cs$Organize o algoritmo de entrada, processamento e saída.$cs$,$cs${"items": ["Mostrar a média", "Ler a primeira nota", "Dividir a soma por 2", "Ler a segunda nota", "Somar as notas"], "correct_order": ["Ler a primeira nota", "Ler a segunda nota", "Somar as notas", "Dividir a soma por 2", "Mostrar a média"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=3
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$matching$cs$,$cs$Missão prática 3.2: Entrada, processamento e saída$cs$,$cs$Associe cada parte ao papel correto no algoritmo.$cs$,$cs${"pairs": [{"left": "Número digitado pelo usuário", "right": "Entrada"}, {"left": "Multiplicar o número por 2", "right": "Processamento"}, {"left": "Mostrar o dobro na tela", "right": "Saída"}]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=3
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$matching$cs$,$cs$Missão prática 4.1: Condições em jogos$cs$,$cs$Associe condições às consequências corretas.$cs$,$cs${"pairs": [{"left": "Se LOGIC tocar na estrela", "right": "Ganhar pontos"}, {"left": "Se LOGIC bater no obstáculo", "right": "Perder uma tentativa"}, {"left": "Se todos os objetivos forem concluídos", "right": "Liberar próxima fase"}]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=4
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 4.2: Regra de acesso$cs$,$cs$Organize uma condição de login simples.$cs$,$cs${"items": ["Mostrar mensagem de erro", "Receber senha digitada", "Comparar senha digitada com senha cadastrada", "Se a senha estiver correta, permitir acesso", "Se a senha estiver incorreta, negar acesso"], "correct_order": ["Receber senha digitada", "Comparar senha digitada com senha cadastrada", "Se a senha estiver correta, permitir acesso", "Se a senha estiver incorreta, negar acesso", "Mostrar mensagem de erro"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=4
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$matching$cs$,$cs$Missão prática 5.1: Transforme repetição em loop$cs$,$cs$Associe comandos repetidos à forma simplificada.$cs$,$cs${"pairs": [{"left": "andar, andar, andar", "right": "repita 3 vezes: andar"}, {"left": "pular, abaixar, pular, abaixar", "right": "repita 2 vezes: pular e abaixar"}, {"left": "pedir senha até acertar", "right": "repita enquanto senha incorreta"}]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=5
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 5.2: Padrão de quadrado$cs$,$cs$Organize o padrão para desenhar um quadrado com movimento.$cs$,$cs${"items": ["Virar direita", "Andar um lado", "Repetir o padrão 4 vezes", "Escolher tamanho do lado"], "correct_order": ["Escolher tamanho do lado", "Andar um lado", "Virar direita", "Repetir o padrão 4 vezes"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=5
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$block_programming$cs$,$cs$Desafio de blocos 1: Caminho em linha reta$cs$,$cs$Leve LOGIC até a estrela usando uma sequência simples.$cs$,$cs${"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["andar", "andar", "andar"], "maze": {"rows": 1, "cols": 4, "start": [0, 0], "goal": [0, 3], "direction": "east", "obstacles": []}}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=6
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$block_programming$cs$,$cs$Desafio de blocos 2: Curva para a estrela$cs$,$cs$LOGIC precisa virar antes de chegar ao objetivo.$cs$,$cs${"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["andar", "virar direita", "andar", "andar", "virar esquerda", "andar"], "require_goal": true, "maze": {"rows": 3, "cols": 3, "start": [0, 0], "goal": [2, 2], "direction": "east", "obstacles": [[0, 2]]}}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=6
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$block_programming$cs$,$cs$Desafio de blocos 3: Desviando do obstáculo$cs$,$cs$Monte um caminho que evite o bloco de obstáculo.$cs$,$cs${"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["virar direita", "andar", "andar", "virar esquerda", "andar", "andar", "andar", "virar esquerda", "andar", "andar", "virar esquerda", "andar"], "maze": {"rows": 3, "cols": 4, "start": [0, 0], "goal": [0, 2], "direction": "east", "obstacles": [[0, 1], [1, 2]]}}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,3 from public.modules where order_index=6
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$block_programming$cs$,$cs$Desafio de blocos 4: Labirinto com menor caminho$cs$,$cs$Chegue até a estrela usando a menor quantidade possível de movimentos de andar.$cs$,$cs${"available_blocks": ["andar", "virar direita", "virar esquerda"], "expected": ["andar", "virar direita", "andar", "andar", "virar esquerda", "andar", "andar", "virar direita", "andar", "andar", "virar esquerda", "andar"], "max_moves": 8, "require_goal": true, "maze": {"rows": 5, "cols": 5, "start": [0, 0], "goal": [4, 4], "direction": "east", "obstacles": [[0, 2], [1, 0], [1, 2], [1, 4], [2, 4], [3, 1], [3, 2]]}}$cs$::jsonb,$cs$Excelente! Você encontrou o menor caminho e levou LOGIC até a estrela sem bater nos obstáculos.$cs$,$cs$Ainda não foi dessa vez. Verifique a direção do LOGIC, evite os obstáculos e tente chegar à estrela com menos movimentos.$cs$,4 from public.modules where order_index=6
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$matching$cs$,$cs$Missão prática 7.1: Bloco para código$cs$,$cs$Associe cada bloco à representação textual correspondente.$cs$,$cs${"pairs": [{"left": "Bloco: andar", "right": "andar();"}, {"left": "Bloco: virar direita", "right": "virarDireita();"}, {"left": "Bloco: se obstáculo, virar", "right": "if (obstaculo) { virar(); }"}]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=7
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$ordering$cs$,$cs$Missão prática 7.2: Pseudocódigo de aprovação$cs$,$cs$Organize o pseudocódigo de uma decisão de aprovação.$cs$,$cs${"items": ["Senão, mostrar recuperação", "Ler nota", "Se nota >= 7, mostrar aprovado", "Comparar nota com 7"], "correct_order": ["Ler nota", "Comparar nota com 7", "Se nota >= 7, mostrar aprovado", "Senão, mostrar recuperação"]}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=7
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.1: Desenhe uma casa$cs$,$cs$Use formas para montar uma casa com corpo, telhado, porta e chão.$cs$,$cs${"starter_code": "limpar\ncor azul\nretangulo 100 150 160 90\ncor roxo\ntriangulo 80 150 180 70 280 150\ncor marrom\nretangulo 160 195 40 55\ncor verde\nlinha 40 260 380 260", "required_commands": ["cor", "retangulo", "triangulo", "linha"], "minimum_lines": 7}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,1 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.2: Desenhe uma árvore e sol$cs$,$cs$Use círculos, retângulos e cores para criar uma árvore e um sol.$cs$,$cs${"starter_code": "limpar\ncor amarelo\ncirculo 335 65 60\ncor marrom\nretangulo 175 170 35 85\ncor verde\ncirculo 190 135 85\ncor verde\nlinha 40 260 380 260", "required_commands": ["cor", "circulo", "retangulo", "linha"], "minimum_lines": 7}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,2 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.3: Desenhe um carro simples$cs$,$cs$Use retângulos, círculos e linha para formar um carro.$cs$,$cs${"starter_code": "limpar\ncor vermelho\nretangulo 95 170 190 55\ncor azul\nretangulo 145 135 90 45\ncor preto\ncirculo 135 235 38\ncirculo 250 235 38\ncor cinza\nlinha 40 260 380 260", "required_commands": ["cor", "retangulo", "circulo", "linha"], "minimum_lines": 8}$cs$::jsonb,$cs$Excelente! Você aplicou o conceito da missão e concluiu esta prática.$cs$,$cs$Ainda não chegou ao resultado esperado. Revise o conteúdo, observe a ordem dos passos e tente novamente.$cs$,3 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$LOGIC está olhando para a direita. Qual sequência o faz andar duas casas e depois descer uma casa?$cs$,$cs$andar, andar, virar direita, andar$cs$,$cs$virar direita, andar, andar, andar$cs$,$cs$andar, virar esquerda, andar, andar$cs$,$cs$andar, andar, virar esquerda, andar$cs$,1 from public.modules where order_index=6
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$A$cs$,$cs$Primeiro ele anda duas casas para a direita. Depois vira para baixo e anda uma casa.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Em uma atividade de blocos, o que significa “virar direita”?$cs$,$cs$Mover uma casa para a direita imediatamente$cs$,$cs$Mudar a direção do personagem sem mudar sua posição$cs$,$cs$Apagar o programa montado$cs$,$cs$Pular automaticamente até a estrela$cs$,2 from public.modules where order_index=6
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$B$cs$,$cs$Virar altera a direção; andar altera a posição.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Por que os blocos ajudam alunos iniciantes?$cs$,$cs$Porque eliminam a necessidade de pensar em lógica$cs$,$cs$Porque focam na sequência e reduzem erros de sintaxe no início$cs$,$cs$Porque substituem qualquer linguagem de programação profissional$cs$,$cs$Porque sempre resolvem o problema automaticamente$cs$,3 from public.modules where order_index=6
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$B$cs$,$cs$Blocos reduzem dificuldade sintática, mas ainda exigem raciocínio lógico.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Se LOGIC bate em um obstáculo, qual é o erro mais provável?$cs$,$cs$A sequência ignorou posição, direção ou caminho bloqueado$cs$,$cs$O sistema não permite atividades com mapas$cs$,$cs$O bloco andar nunca pode ser usado$cs$,$cs$O objetivo deveria estar fora da tela$cs$,4 from public.modules where order_index=6
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$A$cs$,$cs$O aluno precisa considerar mapa, direção e obstáculos.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Qual é a melhor postura antes de executar blocos?$cs$,$cs$Clicar aleatoriamente até funcionar$cs$,$cs$Planejar o caminho, prever movimentos e depois testar$cs$,$cs$Usar apenas o bloco virar$cs$,$cs$Remover todos os blocos de direção$cs$,5 from public.modules where order_index=6
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$B$cs$,$cs$Planejar antes de executar desenvolve pensamento computacional.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Qual comando permite desenhar um telhado triangular no CodeStart?$cs$,$cs$retangulo$cs$,$cs$circulo$cs$,$cs$triangulo$cs$,$cs$linha$cs$,1 from public.modules where order_index=8
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$C$cs$,$cs$O comando triangulo foi adicionado para criar telhados e outras formas com três pontos.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Para criar uma casa simples, qual combinação faz mais sentido?$cs$,$cs$Apenas linhas aleatórias$cs$,$cs$Retângulo para corpo, triângulo para telhado e retângulo para porta$cs$,$cs$Somente um círculo grande$cs$,$cs$Apenas comando cor$cs$,2 from public.modules where order_index=8
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$B$cs$,$cs$Objetos complexos podem ser compostos por formas simples.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$Por que o CodeStart usa comandos controlados em vez de JavaScript livre?$cs$,$cs$Para aumentar segurança e manter a atividade objetiva$cs$,$cs$Para impedir qualquer criatividade$cs$,$cs$Porque comandos visuais não precisam de lógica$cs$,$cs$Porque o Canvas não aceita código$cs$,3 from public.modules where order_index=8
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$A$cs$,$cs$Comandos controlados reduzem riscos e focam nos objetivos pedagógicos.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$O que acontece se uma coordenada for muito grande?$cs$,$cs$A forma pode sair da área visível do desenho$cs$,$cs$O certificado é emitido automaticamente$cs$,$cs$O comando vira um bloco$cs$,$cs$A cor deixa de funcionar$cs$,4 from public.modules where order_index=8
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$A$cs$,$cs$Coordenadas definem posição; valores fora da área podem esconder formas.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

with q as (
  insert into public.quiz_questions (module_id, question, option_a, option_b, option_c, option_d, order_index)
  select id,$cs$No projeto final, por que existem critérios mínimos?$cs$,$cs$Para avaliar se o aluno aplicou comandos e organizou uma solução visual$cs$,$cs$Para limitar o aluno a copiar sempre o mesmo desenho$cs$,$cs$Para impedir o uso de cores$cs$,$cs$Para substituir todos os quizzes$cs$,5 from public.modules where order_index=8
  on conflict (module_id, order_index) do update set question=excluded.question, option_a=excluded.option_a, option_b=excluded.option_b, option_c=excluded.option_c, option_d=excluded.option_d
  returning id
)
insert into public.quiz_answer_keys (question_id, correct_option, explanation)
select id,$cs$A$cs$,$cs$Critérios tornam o projeto mais objetivo e avaliável.$cs$ from q
on conflict (question_id) do update set correct_option=excluded.correct_option, explanation=excluded.explanation;

grant select on public.lessons to anon, authenticated;
grant select on public.activities to authenticated;
grant select on public.quiz_questions to anon, authenticated;
