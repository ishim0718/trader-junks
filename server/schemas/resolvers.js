const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async(parent, { username }) => {
            return User.findOne({ username }).populate('products');
        },
        products: async(parent, { username }) => {
            const params = username ? { username } : {}
            return Product.find(params).sort({ _id: 1 })
        },
        product: async(parent, { productId }) => {
            return Product.findOne({ _id: productId });
        },
        me: async(parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('products');
            }
            throw new AuthenticationError('You need to be logged in!')
        },
    },

    Mutation: {
        addUser: async(parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
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