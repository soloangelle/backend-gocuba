const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    fullname: { 
        type: String,
        required: true, 
        minlength: 3, 
        maxlength: 100 
    },
    email: { 
        type: String, 
        required: true, 
        unique:true, 
        minlength: 5, 
        maxlength: 100 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 4, 
        maxlength: 100 
    },
    bornDate: { 
        type: Number, 
        required: true 
    },
    nationality: { 
        type: String, 
        minlength: 3, 
        maxlength:80
    },
    role: { 
        type: String, 
        default: 'CLIENT_ROLE', 
        enum: ['ADMIN_ROLE', 'USER_ROLE','CLIENT_ROLE','PROVIDER_ROLE']
    },
});

module.exports = mongoose.model('User', userSchema);