const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        // query all products
        product: async(parent, args) => {
            return Product.find(products);
        },
        // query me
        me: async(parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('products');
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
              });
      
              return user.orders.id(_id);
            }
      
            throw new AuthenticationError('Not logged in');
          },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];
      
            const { products } = await order.populate('products');
      
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].name,
                description: products[i].description,
                images: [`${url}/images/${products[i].image}`]
              });
      
              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: products[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
        }
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
        },
        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },
    }
}

module.exports = resolvers