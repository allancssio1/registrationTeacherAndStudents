# DESAFIO PROPOSTOS

## DESAFIO 4.1

Criar o "header" com as mesmas funcionalidades da aula. Usar o conceitos de "box-sinzing", o seletor "+".
E utilizar o "After" e "Transition" para dar efeitos em links.

## DESAFIO 4.2

Usando API de do site Unsplash, editando formulário para receber os dados dos professores.

## DESAFIO 4.3

Gerando um formuário para os dados do Professor, gerando rotas para o cadastro e para a exposição dos mesmos.

## DESAFIO 4.4

Separando as funções em outro arquivo. Gerando a rota de edição dos dados do professor. Formatando data para apresentação de maneira correta no formulário.

## DESAFIO 4.5

Criando as rotas de PUT e DELETE com os method Override. Criando botão e a lógica de deletar um instrutor.

## DESAFIO 4.6

Listando todos os Professores em uma tabela usando a tag <table> e seus filhos. Também foi usada a função map() para passar um  split(), no acompanhamento dos professores, fazendo separação de cada uma como uma item a mais.

## DESAFIO 4.7

Clonei todos arquivos e rotas dos professores, alterei seus nomes para students e fiz os ajustes nescessários para apresentação dos estudantes cadastrados. Também adcionei uma lógica no id, tanto nos teachers quanco no students, para que ao cadastrar novos, os id's não se repitam e sempre assumam os id's mais próximos de 0 (zero), mantendo assim sempre um numero de id's semelhantes ao de quantidades de teachers ou students.

## DESAFIO 5.1

Inceri o banco de dados no postegreSQL com as tabelas relacionadas ao formulário da aplicação. refatorei a orfaginação das pastas como src, controllers, lib e app. crieo o config do banco de dados, para cada vez que a aplicação nescessitar fazer um Pool com o db entrar diretamente sem a nescessidade de interferência humana.

## DESAFIO 5.2

Refatorei o código para fazer a inserção dos dados no banco de dados, e para selecionar os registros ja feitos do banco de dados. Criei os models "all(carregar todos os usuários do db), create(cria novo usuário no db), find(carregar o usuário do db), update(atualiza os dados do usuário no db) e delete(deleta o usuário do db).

## DESAFIO 5.3

Interliguei as tabelas Teachers e Students para que os dados de um seja utilizados e aproveitados em outro, tanto para exibição quando para configuração do banco de dados. Também crirei um filtro para carregar na principal do teachers somente o professor com nome selecionado, caso não haja nessecidade de filtrar, carregar todos.