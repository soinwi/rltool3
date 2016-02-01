var express = require('express');
var router = express.Router();

var Person = require("../models/person");

router.get('/', function(req, res, next) {
  Person.find(function (err, people) {
    if (err) return next(err);
    res.json(people);
  });
});

router.get('/createNew', function(req,res,next){
   var p = new Person({
      name:{first: '', last: ''}
   });
   p.save();
   res.json(p);
});

router.get('/:id', function(req,res,next){
    Person.findById(req.params.id, function(err, person){
       if(err)return next(err);
       res.json(person);
    });
});

router.put('/:id', function(req,res,next){
   Person.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,person){
       if(err) return next(err);
       res.json(person._doc);
   });
});



router.post('/', function(req,res, next){
   Person.create(req.body, function(err,person){
      if(err)
      {
          console.log("Error posting: " + err)
          return next(err);
      }
      res.json(person);
   }); 
});


module.exports = router;
