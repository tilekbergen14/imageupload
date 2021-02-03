const express = require('express')
const Blog = require('./models')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
       const blogs = await Blog.find().sort("-createdAt")
       res.json(blogs)
    }
    catch(err){
        res.status(409).send(err.message)
    }
})

router.post('/', async (req, res) => {
    try{
        const blog = new Blog(req.body)
        const result = await blog.save()
        res.json(result)
    }
    catch(err){
        res.status(409).send(err.message)
    }
})

router.post('/createimg', (req, res) => {
    if(req.files === null){
        return res.status(400).send("Not image uploaded!")
    }
    const file = req.files.timage
    let imgName = new Date().getTime()+file.name
    file.mv(`${__dirname}/image-upload/public/upload/images/${imgName}`, err => {
        if(err){
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({fileName: file.name, filePath: `/upload/images/${imgName}`})
    })
})

module.exports = router