# Projeto Adonis.js com Docker

Este projeto é uma API construída em Adonis.js, configurada para rodar com Docker e Docker Compose. Siga os passos abaixo para configurar e rodar a aplicação na sua máquina local.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha o Docker e o Docker Compose instalados na sua máquina. Se não estiverem instalados, siga as instruções da [documentação oficial do Docker](https://docs.docker.com/get-docker/).

## Passo a Passo para Configuração

### 1. Instalar o Docker e Docker Compose

Certifique-se de que o usuário tenha o Docker e o Docker Compose instalados. Caso não tenha, pode ser instalado seguindo as instruções da documentação oficial do Docker.

### 2. Clonar o Repositório

Clone o repositório do projeto na sua máquina local com o seguinte comando:

```bash
git clone <URL_DO_REPOSITORIO>
```

### 3. Configurar o Arquivo .env

Após clonar o projeto, duplique o arquivo .env.example e renomeie-o para .env:

```bash
cp .env.example .env
```

Certifique-se de que as variáveis de ambiente no arquivo .env estão configuradas corretamente, como as credenciais do banco de dados, porta da API, etc.

### 4. Instalar as Dependências do Projeto

Após clonar o repositório, navegue até o diretório do projeto e instale as dependências com o npm:

```bash
cd <NOME_DO_REPOSITORIO>
npm install
```

### 5. Subir os Containers com Docker Compose

Com o Docker Compose configurado no arquivo docker-compose.yml para o banco de dados PostgreSQL, execute o comando abaixo para subir os containers:

```bash
docker-compose up -d
```

### 6. Rodar as migrations

Após instalar as dependências e subir o container do banco de dados, execute as migrations para configurar as tabelas no banco de dados:

```bash
node ace migration:run
```

### 7. Rodar a API com Hot-Reload

Para rodar a API com hot-reload, execute o seguinte comando:

```bash
node ace serve --watch
```

### 8. Acessar a API

Se tudo foi configurado corretamente, a API estará disponível na porta configurada no arquivo .env. Por padrão, ela estará acessível em:

```bash
http://localhost:3333
```

## Observações

Caso o arquivo .env não esteja configurado corretamente, a API pode não funcionar como esperado. Certifique-se de ajustar as variáveis de ambiente de acordo com seu ambiente de desenvolvimento.
