var express = require('express');
var router = express.Router();
var Fundacion=require('../models/fundaciones');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registro',(req,res,next)=>{
  Fundacion.create(req.body,(err,fundaciones)=>{
    if(err){ next(err)}
    else{
      var ok={
        estado:"ok",
        id:usuario._id
      }
      res.json(ok)
    }
  })
})
module.exports = router;