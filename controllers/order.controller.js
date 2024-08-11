const Order = require('../models/order.model');
const Product = require('../models/product.model');

async function postOrder(req, res){

    try {

        await orderProductPriceVerify(req.body.products, req.body.total);
        const order = new Order(req.body);

        // Crear una funcion que lea cada producto que recibión y a casa producto
        //le haga un doble chequeo con el valor del prodcuto almacenado en la BD
        const newOrder = await order.save()

        res.status(201).send({
            ok: true,
            message: 'Orden creada correctamente',
            order: newOrder
        })
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al crear la orden'
        })
    }
}

async function orderProductPriceVerify(products,total){
    try {
        let totalOrder = 0;
        for(let prod of products){

            totalOrder += prod.price * prod.quantity;
            const product = await Product.findById(prod.product);

            if(!product || product.price !== prod.price){
                throw new Error (`EL producto con id ${prod.product} no existe o el precio no coincide`)
            }
        }

        if(!totalOrder !== total){
            throw new Error("El total no es correcto")
        }
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al verificar precios de productos")
    }
}

async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        
        // Busca la orden por su ID en la base de datos
        const order = await Order.findById(orderId)
                                             .populate("user", "fullname email")
                                             .populate("products.product")       
                                             
        if (!order) {
            return res.status(404).send({
                ok: false,
                message: 'Orden no encontrada'
            });
        }

        return res.status(200).send({
            ok: true,
            message: 'Orden obtenida correctamente',
            order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: 'Error al obtener la orden'
        });
    }
}


async function getOrders(req, res){
    try {

        const filter = req.user.role === "ADMIN_ROLE"
                       ? {}
                       : { user: req.user._id}

        const orders = await Order.find(filter)
                                      .populate("user", "fullname email")
                                      .populate("products.product")       
        if(orders.length === 0){
            return res.status(404).send({
                ok: false,
                message: 'No se encontraron ordenes'
                
            })
        }

        return res.status(200).send({
            ok: true,
            message: 'Ordenes obtenidas corretamente',
            orders
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: 'Error al obtener el listado de ordenes'
        });
    }
}



module.exports = {
    postOrder,
    getOrderById,
    getOrders
}