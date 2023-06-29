const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    address: String!
}

type Product {
    _id: ID!
    name: String!
    description: String!
    price: Int!
    image: String!
    link: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user(username: String!): User
    products: [Product]
    product(productId: ID!): Product
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String)
    addProduct(name: String!, description: String!, price: Int!, image: String, link: String): Product
    removeProduct(productId: ID!): Product
}
`