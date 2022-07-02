const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All author routes
router.get('/', async(req,res) => {
    let searchOptions = {}
    // res.render("author/index")
    if(req.query !=null && req.query.name!== ""){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        // const authors: any[]s
        const authors = await Author.find(searchOptions)
        res.render('author/index', {
            authors: authors,
            searchOptions: req.query 
            })

    } catch {
        res.redirect('/')
    }
})

//New author Routes
router.get('/new', (req,res) => {
    res.render("author/new", {author: new Author()})
})

//Create author routes
router.post('/', async (req,res) => {
    // res.send("create")
    const author= new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save();
        // res.redirect(`author/${newAuthor.id}`)
        res.redirect(`author`)
    } catch {
        res.render('author/new',{
            author: author,
            errorMessage: 'Error creating Author'
        })
        
    }
    // author.save((err, newAuthor) => {
    //     if(err){
    //         res.render('author/new',{
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else{
    //         // res.redirect(`author/${newAuthor.id}`)
    //         res.redirect(`author`)
    //     }
    // })
})

module.exports = router