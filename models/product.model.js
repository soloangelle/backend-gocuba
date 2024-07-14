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
    type: {
        type: String, 
        default: 'ACCOMMODATION', 
        enum: ['ACCOMMODATION', 'TOUR', 'TRANSPORT']
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
        maxlength: 500
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
    cratedAt: {
        type: Number,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Number,
        default: Date.now
    },
    category: {
        type: String,        
        required: true,
        index: true
    },    
});

module.exports = moongose.model('Product', productSchema);