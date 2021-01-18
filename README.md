### Dependencias

* Typescript 4.1.3
* [PostgreSQL v8.5.1](https://www.postgresql.org/download/)


### Setup

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
    cp ormconfig.example.json ormconfig.json
```
5.  Inicie o servidor da aplicação:
```
    $ yarn dev:server
```
