const mongoose = require('mongoose')

const model = mongoose.model("Blog", mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    img: String,
    createdAt: {type: Date, default: new Date()}
}))

module.exports = model