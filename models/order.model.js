const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products: [
        {
            product: {
                type: Schema.Types.ObjectId, 
                required: true,
                ref: "Product"
            },
            price: {
                type: Number,
                required: true,
                min: 0,
                max: 5000
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1

            }
        }
    ],
    user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Number, 
        default: Date.now
    },
    updatedAt: {
        type: Number, 
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'confirm', 'inprogress','planning', 'delivered', 'cancelled','completed']
    }, 
    active: {
        type: Boolean,
        default: true
    }
})


/*

  createdAt: fecha creacion,
  payment: {
       type: '',
       date;
  },
  user: ObjectId()
  updatedAt: Fecha actualización
  total
  status: 'pending', 'completed', 'cancelled'
  address
  closedAt: fecha cierre
  active: boolean

*/

module.exports = mongoose.model('Order', orderSchema)