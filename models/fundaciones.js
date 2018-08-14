var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var fundacion= new Esquema({
    Nombre:{
        type:String,
        required:true
    },
    Direccion:{
        type:String,
        required:true
    },
    Telefono:{
        type:String,
        required: true
    },
    Localidad:{
        type:String,
        required: true
    },
    Correo:{
        type:String,
        required: true
    }
});

module.exports= mongoose.model('Fundacion',fundacion);