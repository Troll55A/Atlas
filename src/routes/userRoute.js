const { Router } = require("express");
const { userPost, userPaginate, userPut, userDelete } = require("../controllers");
const { wildcard } = require("../controllers/utilsController");
const {check} = require ('express-validator');
const { validateFiles } = require("../middlewares/validate-files");
const { userExist, userEmailExist } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { hasRole } = require("../middlewares/validate-roles");


const router = Router();

router.get('/',[
validateJWT,
hasRole('ADMIN', 'USER'),
    check('limit','No es un valor Numerico').isNumeric().optional(),
    check('from','No es un valor Numerico').isNumeric().optional(),
    //validateFiles
    
],userPaginate);

// router.get('/id',[
//     validateJWT,
//     hasRole('ADMIN', 'USER'),
//     check('id','No es un idvalido').isMongoId(),
//     check('id'),custom(id=>existUserById(id))
//     //check('id').custom(existUserDeleted)
// ))
// ])

router.post('/',[
    /*
    Funcion check:
    Primer parametro, propiedad del body
    Segundo parametro, mensaje si no cumple la validacion
    Funcion(es) de validacion
    Custom(s) Middleware
    */
   validateJWT,
   //Solo los usuarios con el rol administrador y usuario, pueden adicionar usuarios
   hasRole('ADMIN', 'USER'),
   check('userName','El nombre de usuario es obligatorio👀').not().isEmpty(),
   //Custom es un error personalizado
   check('userName').custom(userName => userExist(userName)),
   check('Name','El nombre es obligatirio').not().isEmpty(),
   check("lastName", 'El apellido es obligatorio').not().isEmpty(),
   check('Email','El email no tiene el formato correcto').isEmail(),
  check('Email').custom(userEmailExist),
   check('Password','La contraseña debe de tener 6 o mas caracteres').isLength(6),
   check('Role','No es un rol valido').isIn(['ADMIN','USER']),
   //validateFiles
],
    userPost);


router.all('*splat',wildcard);

router.put('/:id',[
    validateJWT,
    hasRole('ADMIN', 'USER'),
    check('id','No es un idvalido').isMongoId(),
    //check('id'),custom(id=>existUserById(id)),
    //check('Id').custom(existUserDeleted),
    check('userName').custom(userName => userExist(userName)),
   check('Name','El nombre es obligatirio').not().isEmpty(),
   check("lastName", 'El apellido es obligatorio').not().isEmpty(),
   check('Email','El email no tiene el formato correcto').isEmail(),
   check('Password','La contraseña debe de tener 6 o mas caracteres').isLength(6),
   check('Role','No es un rol valido').isIn(['ADMIN','USER']),
   //validateFields
],userPut)

router.delete('/:id',[
 validateJWT,
    hasRole('ADMIN'),
    check('id','No es un idvalido').isMongoId(),
    check('id').custom(id=>existUserById(id)),
    //check('id').custom(existUserDeleted)
    //validateFields
],userDelete)


module.exports=router;