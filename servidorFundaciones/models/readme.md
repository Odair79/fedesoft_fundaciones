instalar passsport 

```
npm install passport passport-local passport-local-mongoose --save
```


en un esquema vamos a crear comentarios de los ususarios

```javascript
var commentSchema = new Schema({
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
        ref: 'User' /// Aqui debemos modificar por nuestro modelo de usuarios 
    }
}, {
    timestamps: true
});
```

```javascript
lugarRouter.route('/')
.get((req,res,next) => {
    Lugar.find({})
    .populate('comments.author')
    .then((lugares) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lugares);
    }, (err) => next(err))
    .catch((err) => next(err));
})
. . .

lugarRouter.route('/:lugarId')
.get((req,res,next) => {
    Lugar.findById(req.params.lugarId)
    .populate('comments.author')
    .then((lugare) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lugare);
    }, (err) => next(err))
    .catch((err) => next(err));
})

. . .

lugarRouter.route('/:lugarId/comments')
.get((req,res,next) => {
    Lugar.findById(req.params.lugarId)
    .populate('comments.author')
    .then((lugare) => {
        if (lugare != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(lugare.comments);
        }
        else {
            err = new Error('Lo siento :(  ' + req.params.lugarId + ' NO existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Lugar.findById(req.params.lugarId)
    .then((lugare) => {
        if (lugare != null) {
            req.body.author = req.user._id;
            lugare.comments.push(req.body);
            lugare.save()
            .then((lugare) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lugare);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Lo siento :( ' + req.params.lugarId + ' no existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

. . .

lugarRouter.route('/:lugarId/comments/:commentId')
.get((req,res,next) => {
    Lugar.findById(req.params.lugarId)
    .populate('comments.author')    
    .then((lugare) => {
        if (lugare != null && lugare.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(lugare.comments.id(req.params.commentId));
        }
        else if (lugare == null) {
            err = new Error('Lo siento :( este lugar  ' + req.params.lugarId + ' no existe');
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


```



Finalmente actualizamos la ruta de registro  para incluir los datos faltantes por seguridad
```javascript
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registro Exitoso!'});
        });
      });
    }
  });
});
```