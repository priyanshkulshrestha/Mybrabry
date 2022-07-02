// importing packages
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// dotenv setup
const dotenv = require('dotenv')
dotenv.config()

//importing files for routes
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')

// view engien setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// layout setup
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//setting body parsers as middleware
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// set public folder
app.use(express.static('public'))

// mongoose connection
const mongoose = require('mongoose');
const { request } = require('express');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',  error => console.error(error))
db.once('open', () => console.log('connectd to mongoose'))

// routes rendering
app.use('/', indexRouter)
app.use('/author', authorRouter)

// setting port where app is listening
app.listen(process.env.PORT || 3000)
 