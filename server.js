// importing packages
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')

// dotenv setup
const dotenv = require('dotenv')
dotenv.config()

//importing index.js for routes
const indexRouter = require('./routes/index')

// view engien setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// layout setup
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// set public folder
app.use(express.static('public'))

// mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',  error => console.error(error))
db.once('open', () => console.log('connectd to mongoose'))

// routes setup
app.use('/', indexRouter)

// setting port where app is listening
app.listen(process.env.PORT || 3000)
