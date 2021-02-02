const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

router.post('/', (req, res) => {
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