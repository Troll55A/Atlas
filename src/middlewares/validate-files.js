const { request, response } = require("express");
const { validationResult } = require("express-validator");

const validateFiles = (req=request, res = response)=>{
    //Extraer los errores de validacion

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();

}

module.exports={
    validateFiles
}