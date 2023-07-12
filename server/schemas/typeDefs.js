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

type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    addedBy: String!
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
    addUser(username: String!, email: String!, password: String!, address: String!, firstname: String!, lastname: String!): Auth
    login(email: String!, password: String): Auth
    addProduct(name: String!, description: String!, price: Float!, image: String): User
    removeProduct(productId: ID!): User
}
`;

module.exports = typeDefs