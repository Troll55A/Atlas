const { request, response } = require("express")

const hasRole = (...roles)=>{
    return (req = request, res=response, next)=>{
        //obtengo el valor de la req
        //req.user viene del metodo validajwt
        if(!req.user){
            return res.status(500).json({
                error:'Se requiere verificar el usuario, sin validar el token'
            })
        }
        const {userName, Role}=req.user;
        if (!roles.includes(Role)) {
            return res.status(401).json({
                error:`${userName} no tiene permisos`
            })
            
        }
        next();
    }
}

module.exports={
    hasRole
}