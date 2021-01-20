### Dependências

* Typescript 4.1.3
* [PostgreSQL v13.1](https://registry.hub.docker.com/_/postgres/) (using docker)

### Configurações

1.  Clone o repositório e acesse a pasta do projeto:

```sh
    $ git clone https://github.com/Joao-rangel/node-api-imdb && cd node-api-imdb
```
2.  Instale as dependências:
```sh
    $ yarn
```
3.  Crie arquivo .env do exemplo .env.example e altere o secret JWT:
```
    $ cp .env.example .env
```
4. Faça o mesmo procedimento com o arquivo ormconfig.json e altere os campos necessários:
```
    $ cp ormconfig.example.json ormconfig.json
```
5.  Inicie o docker para o postgres (ajustando os campos SET_):
```
    $ docker run -d --name postgresql -e POSTGRES_PASSWORD=SET_PASSWORD -e POSTGRES_USER=SET_USERNAME -e POSTGRES_DB=SET_DATABASE -p 5432:5432 postgres:latest
```
6.  Execute a migration do banco de dados:
```
    $ yarn typeorm migration:run
```
7.  Inicie o servidor da aplicação:
```
    $ yarn dev:server
```

### Documentação no Postman

https://documenter.getpostman.com/view/14215407/TVzXAER6
