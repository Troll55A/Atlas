const { request, response } = require("express")
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT, parseJWT, generateJWT } = require("../helpers/generate-jwt");

const login = async ( req = request, res = response) =>{
try {
        const { Email, Password } = req.body;

        //Verificar si el email existe
        const user = await User.findOne({ Email });

        if(!user){
            return res.status(400).json({
                error: 'El Email o contraseña no son correctos'
            });
        }

        //Si el usuario esta activo
        if(!user.Status){
            return res.status(400).json({
                error: 'El Email o contraseña no son correctos'
            });
        }

        //Verificar la contraseña
        //Compara la contraseña en plano Password y la encripta, con la contraseña que esta en la base de datos user.Password
        const validaPassword = bcryptjs.compareSync(Password, user.Password);

        if(!validaPassword){
            return res.status(400).json({
                error: 'El Email o contraseña no son correctos'
            });
        }
        
        //Generar el JWT
        //Se utiliza id o _id
        //El resultado es el JWT
        const token = await generateJWT(user._id);

        res.status(200).json({
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Hubo problemas con la solicitud'
        });
    }
}

const refreshJWT = async (req = request, res=response)=>{
    try {
        const header = req.header('Authorization') || '';
        if(!header){
            return res.status(401).json({
                error:'No existe el token en la peticion'
            })
        }

        const arraytoken = header.split(' ');
        if(arraytoken.length !== 2 || arraytoken[0] !== 'Bearer' || !arraytoken[1]){
            return res.status(401).json({
                error:'El token no tiene el formato correcto'
            });

        }
        //OBTENEMOS EL uuid DEL TOKEN CADUCADO
        const {uuid} = parseJWT(arraytoken[1])

        const token = await generarJWT(uuid);
        res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token no valido'
        })
    }
}

module.exports={
    login,
    refreshJWT
}