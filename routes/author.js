const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All author routes
router.get('/', (req,res) => {
    res.render("author/index")
})

//New author Routes
router.get('/new', (req,res) => {
    res.render("author/new", {author: new Author()})
})

//Create author routes
router.post('/', (req,res) => {
    // res.send("create")
    const author= new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if(err){
            res.render('author/new',{
                author: author,
                errorMessage: 'Error creating Author'
            })
        } else{
            // res.redirect(`author/${newAuthor.id}`)
            res.redirect(`author`)
        }
    })
})

module.exports = router