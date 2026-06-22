-- CodeStart v0.11 - Pseudocódigo avançado e desenho visual guiado
-- Adiciona novos tipos de atividade e novas práticas de fixação.

alter table public.activities drop constraint if exists activities_activity_type_check;

alter table public.activities
add constraint activities_activity_type_check
check (
  activity_type in (
    'ordering',
    'matching',
    'block_programming',
    'visual_code',
    'final_project',
    'predict_output',
    'fill_blank'
  )
);

-- Reforço de pseudocódigo no Módulo 3
insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$fill_blank$cs$,$cs$Missão prática 3.2: Complete o algoritmo do dobro$cs$,$cs$Preencha as lacunas para montar um pseudocódigo com entrada, processamento e saída.$cs$,$cs${
  "intro": "Um algoritmo bem estruturado recebe um valor, processa esse valor e mostra uma saída.",
  "blanks": [
    {"label": "Entrada", "options": ["Ler número", "Mostrar resultado", "Comparar senha"], "correct": "Ler número"},
    {"label": "Processamento", "options": ["dobro <- número * 2", "Se número = texto", "Abrir navegador"], "correct": "dobro <- número * 2"},
    {"label": "Saída", "options": ["Mostrar dobro", "Ler senha novamente", "Fechar o programa sem resposta"], "correct": "Mostrar dobro"}
  ]
}$cs$::jsonb,$cs$Muito bem! Você identificou entrada, processamento e saída no pseudocódigo.$cs$,$cs$Revise a ideia de entrada, processamento e saída antes de tentar novamente.$cs$,2 from public.modules where order_index=3
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

-- Reforço de condicionais no Módulo 4
insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$predict_output$cs$,$cs$Missão prática 4.3: Preveja o resultado da condição$cs$,$cs$Leia o pseudocódigo e escolha qual mensagem será exibida.$cs$,$cs${
  "pseudocode": [
    "energia <- 20",
    "Se energia > 0 então",
    "  mostrar \"LOGIC continua a missão\"",
    "Senão",
    "  mostrar \"LOGIC precisa recarregar\""
  ],
  "options": ["LOGIC continua a missão", "LOGIC precisa recarregar", "Nenhuma mensagem", "Erro: energia não foi lida"],
  "correct_answer": "LOGIC continua a missão",
  "explanation": "Como energia vale 20 e 20 é maior que 0, a condição é verdadeira."
}$cs$::jsonb,$cs$Correto! Você interpretou a condição e escolheu a saída certa.$cs$,$cs$Ainda não. Compare o valor da variável com a condição antes de escolher a saída.$cs$,3 from public.modules where order_index=4
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

-- Reforço de pseudocódigo no Módulo 7
insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$predict_output$cs$,$cs$Missão prática 7.3: Preveja a saída do pseudocódigo$cs$,$cs$Observe a variável e descubra qual caminho do se/senão será executado.$cs$,$cs${
  "pseudocode": [
    "idade <- 16",
    "Se idade >= 18 então",
    "  mostrar \"Maior de idade\"",
    "Senão",
    "  mostrar \"Menor de idade\""
  ],
  "options": ["Maior de idade", "Menor de idade", "Nada será mostrado", "O algoritmo sempre mostra as duas mensagens"],
  "correct_answer": "Menor de idade",
  "explanation": "Como 16 é menor que 18, a condição é falsa e o caminho do senão é executado."
}$cs$::jsonb,$cs$Excelente! Você leu o pseudocódigo e previu corretamente a saída.$cs$,$cs$Ainda não. Primeiro avalie se a condição é verdadeira ou falsa.$cs$,3 from public.modules where order_index=7
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$fill_blank$cs$,$cs$Missão prática 7.4: Complete o pseudocódigo de login$cs$,$cs$Escolha as partes corretas para completar uma decisão de login.$cs$,$cs${
  "intro": "O login usa uma decisão: se os dados estiverem corretos, libera o acesso; caso contrário, mostra erro.",
  "blanks": [
    {"label": "1. Primeiro passo", "options": ["Ler e-mail e senha", "Mostrar erro antes de ler dados", "Emitir certificado"], "correct": "Ler e-mail e senha"},
    {"label": "2. Condição", "options": ["Se e-mail e senha conferem", "Repita para sempre", "Desenhar círculo"], "correct": "Se e-mail e senha conferem"},
    {"label": "3. Caminho verdadeiro", "options": ["Permitir acesso", "Bloquear usuário correto", "Apagar o curso"], "correct": "Permitir acesso"},
    {"label": "4. Caminho falso", "options": ["Mostrar mensagem de erro", "Abrir dashboard mesmo assim", "Concluir todos os módulos"], "correct": "Mostrar mensagem de erro"}
  ]
}$cs$::jsonb,$cs$Perfeito! Você completou uma decisão de login com lógica coerente.$cs$,$cs$Revise o fluxo: entrada dos dados, condição, caminho verdadeiro e caminho falso.$cs$,4 from public.modules where order_index=7
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

-- Enriquecimento dos desafios visuais do Módulo 8
insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.1: Recrie uma casa$cs$,$cs$Monte uma casa usando corpo, telhado, porta e chão. O foco é usar formas com intenção.$cs$,$cs${
  "target_description": "Alvo: uma casa com corpo, telhado triangular, porta e chão.",
  "criteria": ["Use retângulo para o corpo da casa", "Use triângulo para o telhado", "Use outro retângulo para a porta", "Use linha para representar chão"],
  "starter_code": "limpar\ncor azul\nretangulo 100 150 160 90\ncor roxo\ntriangulo 80 150 180 70 280 150\ncor marrom\nretangulo 160 195 40 55\ncor verde\nlinha 40 260 380 260",
  "required_commands": ["cor", "retangulo", "triangulo", "linha"],
  "minimum_counts": {"retangulo": 2, "triangulo": 1, "linha": 1},
  "minimum_colors": 3,
  "minimum_lines": 8
}$cs$::jsonb,$cs$Muito bom! A casa foi criada com formas adequadas e sequência lógica.$cs$,$cs$Revise os critérios do alvo visual e confira se a casa tem corpo, telhado, porta e chão.$cs$,1 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.2: Árvore, sol e chão$cs$,$cs$Crie uma árvore simples ao lado de um sol usando comandos visuais.$cs$,$cs${
  "target_description": "Alvo: uma árvore com tronco, copa verde, sol e chão.",
  "criteria": ["Use retângulo para o tronco", "Use círculo para a copa da árvore", "Use círculo para o sol", "Use linha para o chão"],
  "starter_code": "limpar\ncor amarelo\ncirculo 335 65 60\ncor marrom\nretangulo 175 170 35 85\ncor verde\ncirculo 190 135 85\ncor verde\nlinha 40 260 380 260",
  "required_commands": ["cor", "circulo", "retangulo", "linha"],
  "minimum_counts": {"circulo": 2, "retangulo": 1, "linha": 1},
  "minimum_colors": 3,
  "minimum_lines": 8
}$cs$::jsonb,$cs$Ótimo! A árvore e o sol foram construídos com comandos adequados.$cs$,$cs$Confira se há pelo menos dois círculos, um retângulo e uma linha no desenho.$cs$,2 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.3: Carro na rua$cs$,$cs$Desenhe um carro simples com rodas, corpo, cabine e rua.$cs$,$cs${
  "target_description": "Alvo: um carro com corpo, cabine, duas rodas e uma linha de rua.",
  "criteria": ["Use retângulo para o corpo", "Use retângulo para a cabine", "Use dois círculos para as rodas", "Use linha para a rua"],
  "starter_code": "limpar\ncor vermelho\nretangulo 95 170 190 55\ncor azul\nretangulo 145 135 90 45\ncor preto\ncirculo 135 235 38\ncirculo 250 235 38\ncor cinza\nlinha 40 260 380 260",
  "required_commands": ["cor", "retangulo", "circulo", "linha"],
  "minimum_counts": {"retangulo": 2, "circulo": 2, "linha": 1},
  "minimum_colors": 3,
  "minimum_lines": 9
}$cs$::jsonb,$cs$Excelente! O carro usa formas e organização espacial de forma coerente.$cs$,$cs$Revise os critérios: o carro precisa de corpo, cabine, duas rodas e rua.$cs$,3 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;

insert into public.activities (module_id,activity_type,title,statement,activity_data,success_feedback,error_feedback,order_index)
select id,$cs$visual_code$cs$,$cs$Desafio visual 8.4: Cena completa do bairro$cs$,$cs$Combine casa, árvore, sol e chão em uma única cena antes do projeto final.$cs$,$cs${
  "target_description": "Alvo: uma cena com casa, árvore, sol e chão, preparando o projeto final.",
  "criteria": ["Inclua uma casa com telhado", "Inclua uma árvore", "Inclua um sol", "Inclua chão ou rua", "Use pelo menos quatro cores"],
  "starter_code": "limpar\ncor amarelo\ncirculo 340 60 58\ncor azul\nretangulo 90 150 150 90\ncor roxo\ntriangulo 70 150 165 70 260 150\ncor marrom\nretangulo 150 195 40 55\nretangulo 305 170 28 80\ncor verde\ncirculo 320 135 75\ncor cinza\nlinha 20 260 400 260",
  "required_commands": ["cor", "retangulo", "circulo", "triangulo", "linha"],
  "minimum_counts": {"retangulo": 3, "circulo": 2, "triangulo": 1, "linha": 1},
  "minimum_colors": 4,
  "minimum_lines": 12
}$cs$::jsonb,$cs$Excelente! Você montou uma cena completa e está pronto para o projeto final.$cs$,$cs$Revise a cena: ela precisa combinar casa, árvore, sol, chão e variedade de formas.$cs$,4 from public.modules where order_index=8
on conflict (module_id, order_index) do update set activity_type=excluded.activity_type, title=excluded.title, statement=excluded.statement, activity_data=excluded.activity_data, success_feedback=excluded.success_feedback, error_feedback=excluded.error_feedback;
