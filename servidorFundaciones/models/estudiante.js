
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var esquemaEstudiante= new Esquema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Estudiante',esquemaEstudiante);