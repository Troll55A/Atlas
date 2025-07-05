const { Router } = require("express");
const { login, refreshJWT } = require("../controllers/authController");
const { check } = require("express-validator");


const router = Router();

router.post('/login',[
    check('Email','El emial es obligatorio').notEmpty(),
    check('Password','La contraseña es obligarotia').notEmpty()
],
    login);
router.get('/refresh-token',refreshJWT);

module.exports=router;