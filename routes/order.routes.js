const router = require('express').Router();
const orderController = require('../controllers/order.controller')
const auth = require('../middlewares/auth');

// Crear orden
router.post('/orders', orderController.postOrder)
// Obtener ordenes TODAS las ordenes (caso user admin, user Provider)
router.get('/orders/:idUser?', auth,orderController.getOrders)
// Obtener una orden especifica por ID de Orden
router.get('/orders/:id', auth, orderController.getOrderById)
// Obtener ordenes por ID de usuario
// router.get('/orders/users/:id', orderController.getOrdersByUserId)
// Editar orden 
// router.put('/orders/:id', orderController.putOrder)
// Borrar orden va a depender de mnuestra app (opcional)
// router.delete('/orders/:id', orderController.deleteOrder)


module.exports = router;