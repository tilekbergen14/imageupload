const fileUpload = require('express-fileupload')
const express = require('express')
const cors = require('cors')
const blog = require('./routes')

const app = express()
app.use(cors())
app.use(fileUpload())
app.use("/blog/", blog)

app.listen(5000, console.log('Listening to port 5000...'))