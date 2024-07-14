const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description:{
        type: String,
        trim: true,
        minlength: 0,
        maxlength: 500
    },

});

module.exports = mongoose.model('Category', categorySchema);