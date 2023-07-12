const db = require('./connection');
const { User, Product } = require('../models')

db.once('open', async() => {
    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            "name": "50 inch Flatscreen TV",
            "description": "A flatscreen TV with internet capabilities and integrated ROKU",
            "price": 150,
            "image": "tv_image.jpg",
            "addedBy": "thomasshea"
        },
        {
            "name": "Autographed Football", 
            "description": "A football signed by legendary football player Bo Jackson.",
            "price": 450,
            "image": "football.png",
            "addedBy": "thomasshea"
        },
        {
            "name": "Playstation 5",
            "description": "A Sony Playstation 5 that comes with 3 games and 2 controllers",
            "price": 500,
            "image": "ps5.jpg",
            "addedBy": "ianheap"
        },
        {
            "name": "iPhone 8 Plus",
            "description": "A slightly used iPhone 8 Plus in good condition.",
            "price": 120,
            "image": "iphone8.jpg",
            "addedBy": "chrisramsey"
        },
        {
            "name": "Used Golf Clubs",
            "description": "A set of used Callaway golf irons. The set shows signs of use but still works",
            "price": 70,
            "image": "golf_clubs.jpg",
            "addedBy": "thomasshea"
        },
        {
            "name": "Weight Set",
            "description": "A bench and barbell with plate weights.",
            "price": 180,
            "image": "weight_bench.jpg",
            "addedBy": "daveshim"
        },
        {
            "name": "Riding Lawn Mower",
            "description": "A John Deere Lawn Tractor with a 42 inch cut deck.",
            "price": 1200,
            "image": "lawnmower.jpg",
            "addedBy": "tamjidhossain"
        }
    ])
    console.log('Products Successfully Seeded')

    await User.deleteMany()

    await User.create({
        username: "thomasshea",
        email: "thomasshea@gmail.com",
        password: "password1234",
        firstname: "Thomas",
        lastname: "Shea",
        address: "201 Main St, Mobile, AL",
        products: [products[0]._id, products[1]._id, products[4]._id]
    });

    await User.create({
        username: "ianheap",
        email: "ianheap@gmail.com",
        password: "password1234",
        firstname: "Ian",
        lastname: "Heap",
        address: "300 Main St, Savannah, GA",
        products: [products[2]._id]
    });

    await User.create({
        username: "daveshim",
        email: "daveshim@yahoo.com",
        password: "password1234",
        firstname: "Dave",
        lastname: "Shim",
        address: "500 Peachtree St, Atlanta, GA",
        products: [products[5]._id]
    });

    await User.create({
        username: "tamjidhossain",
        email: "tamjidhossain@gmail.com",
        password: "password1234",
        firstname: "Tamjid",
        lastname: "Hossain",
        address: "700 Main St. Marietta, GA",
        products: [products[6]._id]
    });

    await User.create({
        username: "chrisramsey",
        email: "chrisramsey@gmail.com",
        password: "password1234",
        firstname: "Chris",
        lastname: "Ramsey",
        address: "600 Main St Roswell, GA",
        products: [products[3]._id]
    })

    await User.create({
        username: "rickybobby",
        email: "rickybobby@gmail.com",
        password: "password1234",
        firstname: "Ricky", 
        lastname: "Bobby",
        address: "123 Speedway Rd, Talladega, AL"
    });

    await User.create({
        username: "bobbyboucher",
        email: "gatoradesucks@yahoo.com",
        password: "password1234",
        firstname: "Bobby",
        lastname: "Boucher",
        address: "100 Bayou St, Houma, LA"
    });

    await User.create({
        username: "tonystark",
        email: "iamiroman@yahoo.com",
        password: "password1234",
        firstname: "Tony",
        lastname: "Stark",
        address: "600 Beverly Hills Rd, Beverly Hills, CA"
    });

    await User.create({
        username: "jonsnow",
        email: "kingofthenorth@gmail.com",
        password: "password1234",
        firstname: "Jon",
        lastname: "Snow",
        address: "100 Mountain Pass, Bangor, ME"
    });

    console.log('Users successfully seeded')

    process.exit();
})

