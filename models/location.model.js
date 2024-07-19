const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    }
});

module.exports = mongoose.model('Location', locationSchema);