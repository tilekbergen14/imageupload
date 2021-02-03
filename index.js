const fileUpload = require('express-fileupload')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blog = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use("/blog/", blog)

mongoose.connect("mongodb://localhost/imageupload", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to the mongodb..."))
    .catch((err) => console.log(err.message))

app.listen(5000, console.log('Listening to port 5000...'))