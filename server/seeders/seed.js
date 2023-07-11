const db = require('../config/connection');
const { User, Product } = require('../models');
const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
    try {
        await Product.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < productSeeds.length; i++) {
            const { _id, addedBy } = await Product.create(productSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: addedBy },
                {
                    $addToSet: { products: _id },
                }
            );
        }
    } catch (err) {
        console.error(err)
        process.exit(1);
    }

    console.log('Database Successfully Seeded')
    process.exit(0)
})