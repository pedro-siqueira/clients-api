
# Clients API

API REST para cadastro de clientes.
## Como rodar

Clone o projeto

```bash
  git clone https://github.com/pedro-siqueira/clients-api.git
```

Entre no diretório do projeto

```bash
  cd clients-api
```

Suba os containers

```bash
  docker-compose up
```

## Endpoints

#### Buscar Clientes

```
  GET /v1/clients
```

#### Get item

```
  GET /v1/clients/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID do cliente |

#### Registrar cliente

```
  POST /v1/clients
```
Body esperado
| Field | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Nome do cliente |
| `email`      | `string` | **Required**. Email do cliente |
| `birthdate`      | `string` | **Required**. Data de nascimento do cliente no formato ISO8601. Exemplo: '1999-01-01T00:00:00.000Z' |
| `phone`      | `string` | Telefone do cliente com DDD|
| `cpf`      | `string` | **Required**. CPF do cliente. Deve ser um CPF válido. |


#### Atualizar cliente

```
  PATCH /v1/clients/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID do cliente |

Body esperado
| Field | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Nome do cliente |
| `email`      | `string` | Email do cliente |
| `birthdate`      | `string` | Data de nascimento do cliente no formato ISO8601. Exemplo: '1999-01-01T00:00:00.000Z' |
| `phone`      | `string` | Telefone do cliente com DDD|
| `cpf`      | `string` | CPF do cliente. Deve ser um CPF válido. |

#### Excluir cliente

```
  DELETE /v1/clients/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID do cliente |
