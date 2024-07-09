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
        maxlength: 100,
        trim: true,
        validate:{
            validator:(value)=>{
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

                return regex.test(value);
            }
        } 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 4, 
        maxlength: 100,
        trim: true 
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