const User = require('../models/user.model');

function getUsers(req, res) {
  res.send('GET Users desde el controlador')
}

async function postUser(req, res) {

  try {
      if(req.user?.role !== 'ADMIN_ROLE'){
        req.body.role = 'CLIENT_ROLE';
  
      }
   
      const user = new User(req.body)

      console.log(user)

      const newUser = await user.save()
      res.status(201).send(newUser)

  } catch (error) {
       res.status(500).send("Error al crear usuario");
       console.log(error)
  }
  
 

 
}

function deleteUser(req,res){
  res.send('DELETE Users desde el controlador')
}

module.exports = {
    getUsers,
    postUser,
    deleteUser
}