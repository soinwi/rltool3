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

router.post('/', function(req,res, next){
    
})


module.exports = router;
