
var mongoose=require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Esquema=mongoose.Schema;
var usuario=new Esquema({
    username:{
        type:String,
        required:true
    },
    password:String,
    primernombre:String,
    segundonombre:String,
    correo:{
        type:String,
        required:false,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    admin:{
        type:Boolean,
        default:false,
    }
});
usuario.plugin(passportLocalMongoose); 
module.exports=mongoose.model('Usuario',usuario);
