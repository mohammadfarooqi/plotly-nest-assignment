# GraphQL NestJS Project: User and Product Management

This project is a simple GraphQL API built using NestJS and TypeORM. It allows you to manage users and products, along with their relationships.

## Getting Started

To get the project up and running on your local machine, follow these steps:

## Installation

```bash
$ npm install
```

## Database Setup

The project uses an in-memory SQLite database by default. No additional database setup is required. Note that to make things easier to test, there are some Users and Products that get seeded upon starting of the server.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The GraphQL playground will be accessible at http://localhost:3000/graphql.

## Test

```bash
# unit tests
$ npm run test

# unit tests - watch mode
$ npm run test:watch
```

## Sample Queries and Mutations

Here are some sample GraphQL queries and mutations that you can use to interact with the API:

### Create a Product

```bash
mutation {
  createProduct(
    createProductInput: {
      name: "Sample Product"
      price: 9.99
    }
  ) {
    id
    name
    price
  }
}
```

### Create a User with Orders:

```bash
mutation {
  createUser(
    createUserInput: {
      name: "John Doe"
      email: "john@example.com"
      age: 28
      orders: ["1", "3"]
    }
  ) {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

### Get All Users:

```bash
query {
  getAllUsers {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

### Get User by Id:

```bash
query {
  getUser(id: "1") {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

### Get Product by Id:

```bash
query {
  getProduct(id: "1") {
    id
    name
    price
  }
}
```

### Get All Products:

```bash
query {
  getAllProducts {
    id
    name
    price
  }
}
```

## Project Structure

The project follows a modular architecture:

```bash
├── src
│   ├── products
│   │   ├── dto
│   │   ├── entities
│   │   ├── products.module.ts
│   │   ├── products.resolver.ts
│   │   └── products.service.ts
│   ├── users
│   │   ├── dto
│   │   ├── entities
│   │   ├── users.module.ts
│   │   ├── users.resolver.ts
│   │   └── users.service.ts
│   ├── app.module.ts
│   ├── main.ts
│   └── schema.gql
├── package.json
├── package-lock.json
├── tsconfig.json
└── nest-cli.json
```

## Dependencies

- NestJS
- TypeORM
- GraphQL
- SQLite
