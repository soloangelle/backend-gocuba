const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

async function getUserById(req, res) {
  try {
     const id = req.params.id;

     const user = await User.findById(id).select({bornDate: 0, password: 0, __v: 0});

     if(!user){
       return res.status(404).send({
         ok: false,
         message: 'Usuario no encontrado'
       });
     }

     res.status(200).send({ 
        ok: true,
        message: 'Usuario obtenido correctamente',
        user
     });

  } catch (error) {
    console.log(error);
    res.status(500).send({  
      ok:false,
      message: 'Error al obtener el usuario'
    });
  }
}

async function getUsers(req, res) {

  try {
    console.log(req.query);
       const limiteUsuarios = req.query.limit || 2;
       const page = req.query.page || 0;

       const [users, total] = await Promise.all([
          User.find()
                    .select({password: 0, __v: 0})
                    .collation({locale: 'es'})
                    .sort({fullname: 'asc'})
                    .limit(limiteUsuarios)
                    .skip(page * limiteUsuarios),
          User.countDocuments()
       ]);                      

       res.status(200).send({
          ok: true,
          message: 'Usuarios obtenidos correctamente',
          users,
          total
       });
    
  } catch (error) {
    console.log(error);
    //Devolvemos una respuesta con código 500 y un mensaje de error
    res.status(500).send({
      ok: false,
      message: 'Error al obtener los usuarios'
    });
  }
 
}

async function postUser(req, res) {

  try {

      // Si me mandan el dato role y el usuario no es admin, entonces se le asigna el rol de cliente
      if(req.user?.role !== 'ADMIN_ROLE'){
        req.body.role = 'CLIENT_ROLE';
  
      }

      // Encriptar la contraseña antes de guardarla en la base de datos
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
   
      const user = new User(req.body)

      const newUser = await user.save()

      // Borrar la propiedad password antes de responder al cliente con los datos del nuevo suario
      newUser.password = undefined;

      res.status(201).send(newUser)

  } catch (error) {
       res.status(500).send("Error al crear usuario");
       console.log(error)
  } 
}

async function deleteUser(req,res){

  try {

    console.log(req.params )
    //Obtenemos el id del usuario a eliminar
    const id = req.params.id;

    const deleteUser = await User.findByIdAndDelete(id);

    console.log(deleteUser);

    if(!deleteUser){
      return res.status(404).send({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    console.log(deleteUser);

    res.status(200).send({
      ok: true,
      message: 'Usuario eliminado correctamente'
    });
    
  } catch (error) {
    console.log(error);
    //Devolvemos una respuesta con código 500 y un mensaje de error
    res.status(500).send({
      ok: false,
      message: 'Error al eliminar el usuario'
    });
    
  }
 
}

async function putUser(req,res){

  try {
    //Obtenemos el id del usuario a actualizar
    const id = req.params.id;

    if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== req.params.id){
      return res.status(400).send({
        ok: false,
        message: 'No se puede actualizar este usuario'
      })
    }    

    //Obtenemos los datos del usuario a actualizar
    const user = req.body;

    //TODO: Hashear la contraseña antes de actualizarla
    // if(req.body.password){

    // }

     // TODO: Resetear Role si el usuario no es admin
    
    //Actualizamos el usuario
    const updateUser = await User.findByIdAndUpdate(id, user, {new: true});

    if(!updateUser){
      return res.status(404).send({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).send({
      ok: true,
      message: 'Usuario actualizado correctamente',
      user: updateUser
    });
    
  } catch (error) {
    console.log(error);
    //Devolvemos una respuesta con código 500 y un mensaje de error
    res.status(500).send({
      ok: false,
      message: 'Error al actualizar el usuario'
    });
    
  }
 
}

async function loginUser(req,res){

  try {

    //Obtener email y password del body
    //const email = req.body.email?.toLowerCase();  <--> Convertir el email a minúsculas y el ? es para evitar errores si el email es undefined
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
      return res.status(400).send({
        ok: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    console.log(email, password);

    //Checkear que el usuario exista en la base de datos y obtenerlo 
    const user = await User.findOne({email: { $regex: email, $options: "i"} });
    console.log(user);

    // Si el usuario no existe, devolver un mensaje de error
    if(!user){
      return res.status(404).send({
        ok: false,
        message: 'Datos incorrectos'
      });
    }
    //Comparar la contraseña hasheada con la contraseña del body
    const match = await bcrypt.compare(password, user.password);

    //Si las contraseñas no coinciden, devolver un mensaje de error 
    if(!match){
      return res.status(400).send({
        ok: false,
        message: 'Datos incorrectos'
      });
    }

    user.password = undefined; //Borrar la contraseña del usuario antes de devolverlo

    //Si todo está correcto, Generar un token de autenticación
    const token = jwt.sign({user}, secret, {expiresIn: '3h'});
    
    
    // Si todo esta Ok, hacemos  devolvemmos una respuesta favorable      
    res.status(200).send({
      ok: true,
      message: 'Login correcto',
      user,
      token
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: 'Error al iniciar sesión'
    });    

  }
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    deleteUser,
    putUser,
    loginUser
}