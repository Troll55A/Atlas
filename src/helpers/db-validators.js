const {User}= require('../models')
const userExist = async(userName = '')=>{
const user=await User.findOne({
    userName
})
if (user) {
    throw new Error(`El nombre de usuario ${userName} ya existe`);
}
}

const userEmailExist = async(Email = '')=>{
const user=await User.findOne({
    Email
})
if (user) {
    throw new Error(`El email ${Email} ya existe`);
}
}


module.exports={
    userExist,
    userEmailExist
}