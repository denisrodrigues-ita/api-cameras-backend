# Guia de uso

Este documento fornece uma visão geral sobre como configurar e utilizar as funcionalidades disponíveis nesta API. O projeto está organizado em rotas que manipulam logs de alertas, câmeras e clientes.

#### Estrutura das rotas

- Rotas de clientes ("/customers")
- Rotas de câmeras ("/cameras")
- Rotas de alertas ("/alerts")
- Rotas de auth ("/auth")

#### Requisitos

- Gerenciador de pacotes (npm ou yarn)
- Docker

### Configuração inicial

1 - Clone o repositório:

```markdown
git clone https://github.com/denisrodrigues-ita/api-cameras-backend
cd api-cameras-backend
```

2 - Instale as dependências:

```markdown
npm install

# ou

yarn install
```

3 - Configure as variáveis de ambiente. Crie um arquivo '.env' na raiz do projeto e adicione o conteudo de '.env.exemple'.

4 - Para criar um container e rodar o docker utilize o comando abaixo:

```markdown
npm run docker:dev
```

Obs:
1 - Lembre-se de que para tudo que for fazer, você tem que estar autenticado, menos para as rotas abaixo.

- POST /auth (rota de autenticação)
- POST /customers (rota para criar usuário)

2 - Caso não tenha nenhum usuário na db, o sistema vai 'seedar' os seguintes usuários
["Dave Grohl", "Van Halen", "Eddie Vedder", "Chris Cornell", "Axl Rose" ],

### Rotas de clientes

#### POST/customers

- Descrição: Adiciona um novo cliente.
- Requisição: application/json
- Formato do Corpo da Requisição:

```markdown
{
"name": string,
}
```

### Rotas de câmeras

#### POST/cameras

- Descrição: Adiciona uma nova câmera.
- Requisição: application/json
- Formato do Corpo da Requisição:

```markdown
{
"name": string,
"ip": string,
"isEnabled": boolean
"customerId": UUID,
}
```

#### PATCH/cameras

- Descrição: Passando o UUID da câmera é possivel atualizar o status (ativar/desativar).
- Requisição: application/json
- Parâmetros de Rota:

```markdown
/cameras/123e4567-e89b-12d3-a456-426614174000
```

#### GET/cameras/bycustomer

- Descrição: Recupera as câmeras de um cliente específico passando a UUID do cliente.
- Opcional: É possivel passar uma query 'status' com o valor de 'true' ou 'false' para consultar a câmera por hab./desabilitada
- Requisição: application/json
- Parâmetros da Rota:

```markdown
/cameras/bycustomer/123e4567-e89b-12d3-a456-426614174000?status=true
```

### Rotas de alertas

#### POST/alerts

- Descrição: Adiciona um novo log de alerta.
- Requisição: application/json
- Formato do Corpo da Requisição:

```markdown
{
"cameraId": "UUID",
}
```

#### GET/alerts/bycustomer

- Descrição: Recupera os logs de alerta.
- Opcional: passar start e finish na query para ter uma consulta por periodo no seguinte formato: YYYYMMDDHHmm
- Requisição: passar o uuid do cliente como parâmetro.
- Formato dos Parâmetros de Consulta:

```markdown
/alerts/bycustomer/30b207d8-2fd7-483d-8d5d-54cb3119db70?start=YYYYMMDDHHmm&finish=YYYYMMDDHHmm
```

### Rotas de autenticação

#### POST/auth

- Descrição: Rota com a função de autenticar e gerar um token para o usuário.
- Requisição: application/json
- obs: nome deve estar exatamente como o nome armazenado no banco de dados.
- Formato do Corpo da Requisição:

```markdown
{
"name": string,
}
```

### Estrutura do Projeto

O projeto é estruturado em pastas para facilitar a organização e a manutenção do código. Abaixo está uma descrição breve de cada pasta:

- controllers: Contém os controladores que recebem as requisições HTTP e interagem com os serviços.
- services: Contém a lógica de negócio e a interação com os repositórios.
- repositories: Contém as funções de acesso ao banco de dados usando o Prisma.
- validations: Contém as validações de dados usando o Yup.
- routes: Contém a definição das rotas da API.