## Pizzaria - Projeto
<img src="https://user-images.githubusercontent.com/43019910/97814882-243c2f80-1c69-11eb-91a2-92257b9cc503.jpg" />

## Depedencias :
  Gerenciador de pacotes - utilizar NPM ou Yarn.
    
## Instalar Depencias:
  Primeiramente é necessário realizar a instalação das dependencias do projeto.
  Com um dos seguintes comandos:
  NPM:
  ```
  npm install
  ```
  Yarn:
  ```
  yarn install
  ```
  
## Executando o projeto:
  
1. Executando o backend (JSON SERVER)
Para a simulação de um backend foi utilizado o Json Server, esse por sua vez cria rotas e simula um banco de dados a partir de um JSON. 
O JSON no projeto tem o nome de server.json e se encontra na pasta raiz.
Para executar o JSON server, por linha de comando acesse a pasta do projeto e execute o seguinte código:
```
json-server --watch server.json
```
Por padrão o JSON server será executado na porta 3000.

2. Executando o frontend
Para o frontend foi utilizado ReactJS.
Para executar o projeto, por linha de comando acesse a pasta do projeto e execute o seguinte código:
Caso use NPM:
```
npm start
```
Caso use Yarn:
```
yarn start
```
Por padrão o ReactJS é executado na porta 3000, porém, dentro do arquivo package.json a porta foi alterada para a 3001, para que não haja conflitos com o JSON server. Caso queira, altere a porta para de sua preferência. 

OBS: O JSON server e o projeto em ReactJS devem ser executados simultaneamente. 

## Intuito do Projeto
Construir uma aplicação com 3 passos, onde seria possível selecionar a Massa da pizza, tamanho e sabor. Caso o usuário optasse por adquirir a pizza de sugestão da casa, esse ganharia pontos extras. Todos os dados como massas, tamanhos, sabores e sugestão deveriam ser providos de um backend, onde não era necessário implementar regras de negócio e poderiam ser utilizados dados Mock, como foi o caso com o JSON server.
