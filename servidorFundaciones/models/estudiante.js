
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;
var commentSchema = new Esquema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios' /// Aqui debemos modificar por nuestro modelo de usuarios 
    }
}, {
    timestamps: true
});
var esquemaEstudiante= new Esquema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    }, 
    conmentarios:[commentSchema]
});

module.exports= mongoose.model('Estudiante',esquemaEstudiante);