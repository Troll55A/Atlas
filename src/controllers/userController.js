const { request, response } = require("express");
const {User}= require('../models');
const bcryptjs = require("bcryptjs");

const userPaginate = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { Status: true };

    const [total, users] = await Promise.all([
        //Cantidad total de registros, de una coleccion
        User.countDocuments(query),
        User.find(query)
        //Con skip, se coloca el numero posterior de registro que iniciara
        //Si se coloca 2, empezara en el 3
        .skip(Number(from))
        //Con limit, se limita la cantidad de pagina
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const userById = async (req = request, res = response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json(user);
}

const userPost = async (req = request, res=response)=>{
    const body = req.body;
    const {Password} = body;

    const user = new User(body);
    
    const salt = bcryptjs.genSaltSync(10);
    user.Password = bcryptjs.hashSync(Password, salt);

    await user.save();
    res.status(201).json({
       user
    });
}

const userPut = async (req = request, res = response) => {
    const { id } = req.params;
    //Obtengo el Email para no actualizarlo
    const { Email, Password, ...content } = req.body;

    if(Password){
        //Encriptar la contraseña
        //genSaltSync() numero de veces que genera la encriptacion, se coloca 10 por defecto
        const salt = bcryptjs.genSaltSync(10);
        //hashSync() encripta en una solo sentido (hash)
        content.Password = bcryptjs.hashSync(Password, salt);
    }

    //{ new: true } significa que devolvera el modelo actualizado
    const updateUser = await User.findByIdAndUpdate(id, content, { new: true });

    res.status(200).json(updateUser);
}

const userDelete = async ( req = request, res = response) =>{
    const { id } = req.params;
      const esMongoId = ObjectId.isValid(id);
    if(!esMongoId){
        return res.status(400).json({
            error:'id invalido'
        })
    }
     const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            error:'id no encontrado'
        })
    }
    if (!user.Estado) {
        return res.status(400).json({
            error: 'El usuario ya fue eliminado'
        });
    }
    // 4. Marcar como eliminado
  await User.findByIdAndUpdate(id, { Estado: false });

  // 5. Responder confirmación
  res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
}
module.exports = {
    userPaginate,
    userById,
userPost,
userPut,
userDelete
}