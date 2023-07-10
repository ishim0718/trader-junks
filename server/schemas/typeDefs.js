const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    address: String!
    products: [Product]!
}

input UserInput {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    address: String!
    products: [Product]!
}

type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
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
    addUser(content: UserInput!): Auth
    login(email: String!, password: String): Auth
    addProduct(name: String!, description: String!, price: Float!, image: String, link: String): Product
    removeProduct(productId: ID!): Product
}
`;

module.exports = typeDefs