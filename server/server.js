require('dotenv').config()

const express= require('express')
const app = express()

app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new map([])

app.listen(3000)