const userController = require('./userController');
const authController = require('./authController');
const utilsController = require('./utilsController');

module.exports={
    ...userController,
    authController,
    utilsController,

}