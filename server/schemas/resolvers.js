const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // query a user based on username
        user: async(parent, { username }) => {
            return User.findOne({ username }).populate('products');
        },
        // query a user's products
        products: async(parent, { username }) => {
            const params = username ? { username } : {}
            return Product.find(params).sort({ _id: 1 })
        },
        // query a single product by productId
        product: async(parent, { productId }) => {
            return Product.findOne({ _id: productId });
        },
        // query me
        me: async(parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('products');
            }
            throw new AuthenticationError('You need to be logged in!')
        },
    },

    Mutation: {
        // mutation to add a new user
        addUser: async(parent, { username, email, password, firstname, lastname, address }) => {
            const user = await User.create({ username, email, password, firstname, lastname, address });
            const token = signToken(user);
            return { token, user }
        },
        // login mutation
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials!');
            }
            const token = signToken(user);
            return { token, user }
        },
        // mutation to add a product
        addProduct: async(parent, {name, description, price, image, link }, context) => {
            if (context.user) {
                const product = await Product.create({
                    name,
                    description,
                    price,
                    image,
                    link,
                    addedBy: context.user.username,
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { products: product._id }}
                );
                return product
            }
            throw new AuthenticationError('You need to be Logged in!')
        },
        // mutation to remove a product
        removeProduct: async(parent, { productId }, context) => {
            if (context.user) {
                const product = Product.findOneAndDelete({
                    _id: productId,
                    addedBy: context.user.username,
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { products: product._id }}
                );
                return product
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }
}

module.exports = resolvers