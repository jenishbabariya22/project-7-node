const mongoose = require('mongoose');

const form = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    }


})

const formmodel = mongoose.model('form', form);
module.exports = formmodel;