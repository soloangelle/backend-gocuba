const moongose = require('mongoose');

const Schema = moongose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        index: true,
        uppercase: true
    },  
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    summary: {
        type: String,
        required: true,
        trim: true,
        minlength: 0,
        maxlength: 600
    },
    description: {
        type: String,
        required: true,        
        trim: true,
        minlength: 0,
        maxlength: 5000
    },
    image:{
        type: String,
        required: false
    },
    imageFront:{
        type: String,
        required: false
    },    
    createdAt: {
        type: Number,
        default: Date.now
    },
    location: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Location'
    },
    properties: {
        type: Array,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Number,
        default: Date.now
    },
    type: {
        type: Schema.Types.ObjectId,        
        required: true,
        index: true,
        ref: 'Type'
    },    
});

module.exports = moongose.model('Product', productSchema);