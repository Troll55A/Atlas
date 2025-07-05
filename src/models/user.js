const { Schema, model } = require('mongoose');

const userSchema = Schema({
    userName: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    Name: {
        type: String,
        required: true,
        unique: [true,'El nombre es obligatorio']
    },
    lastName: {
        type: String,
        required: [true,'El apellido es obligatorio']
    },
    Email: {
        type: String,
        required: [true, 'El Email es Obligatorio‼️'],
        unique:true
    },
    Password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    Role:{
        type:String,
        required:[true,'EL rol es obligatorio'],
        enum:['ADMIN', 'USER']
    },
    Image:{
        type:String
    },
    Status:{
        type:Boolean,
        default: true
    }
    });


userSchema.methods.toJSON = function(){
const {__v, _id, ...user}=this.toObject();
user.uuid = _id;
console.log(user);

return user;
}


module.exports = model('user', userSchema);