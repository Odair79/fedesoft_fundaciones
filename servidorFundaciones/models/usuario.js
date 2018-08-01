var mongoose=require('mongoose');
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
        required:true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});

module.exports=mongoose.model('Usuario',usuario);
