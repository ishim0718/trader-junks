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

type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
}

type Checkout {
    session: ID
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
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addUser(username: String!, email: String!, password: String!, address: String!, firstname: String!, lastname: String!): Auth
    login(email: String!, password: String): Auth
    addProduct(name: String!, description: String!, price: Float!, image: String): User
    removeProduct(productId: ID!): User
    addOrder(products: [ID]!): Order
}
`;

module.exports = typeDefs