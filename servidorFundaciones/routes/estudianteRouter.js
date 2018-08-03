const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var Estudiante=require('../models/estudiante')

const estudianteRouter = express.Router();
estudianteRouter.use(bodyParser.json());

estudianteRouter.route('/')
.all((req,res,next) => {
    console.log("Aglo esta pasando");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    Estudiante.find({})
    .populate('comments.author')    
    .then((estudiantes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(estudiantes);
        }, (err) => next(err)
        .catch((err) => next(err)));
    })
.post(authenticate.verifyUser,(req,res,next) => {
    Estudiante.create(req.body)
    .then((estudiante)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({id:estudiante._id});
    }, (err) => next(err))
    .catch((err)=>{next(err)})
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /estudiantes');
})
.delete((req,res,next) => {
    res.end('Eliminando todos los estudiantes');
});

estudianteRouter.route('/:estudianteId')
.get((req,res,next) => {
    Estudiante.findById(req.params.estudianteId)
    .populate('comments.author')
    .then((estudiante) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(estudiante);
    }, (err) => next(err))
    .catch((err) => next(err));
})

estudianteRouter.route('/:estudianteId/comments')
.get((req,res,next) => {
    Estudiante.findById(req.params.estudianteId)
    .populate('comments.author')
    .then((estudiante) => {
        if (estudiante != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(estudiante.comments);
        }
        else {
            err = new Error('Lo siento :(  ' + req.params.estudianteId + ' NO existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Estudiante.findById(req.params.estudianteId)
    .then((estudiante) => {
        if (estudiante != null) {
            req.body.author = req.user._id;
            estudiante.comments.push(req.body);
            estudiante.save()
            .then((estudiante) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(estudiante);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Lo siento :( ' + req.params.estudianteId + ' no existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

estudianteRouter.route('/:estudianteId/comments/:commentId')
.get((req,res,next) => {
    Estudiante.findById(req.params.estudianteId)
    .populate('comments.author')    
    .then((estudiante) => {
        if (estudiante != null && estudiante.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(studiante.comments.id(req.params.commentId));
        }
        else if (estudiante == null) {
            err = new Error('Lo siento :( este lugar  ' + req.params.estudianteId + ' no existe');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Lo siento :( no hay comentarios con id:  ' + req.params.commentId + ' ');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = estudianteRouter;