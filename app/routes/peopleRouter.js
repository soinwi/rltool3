var express = require('express');
var router = express.Router();

var Person = require("../models/person");

router.get('/', function(req, res, next) {
  Person.find( function (err, people) {
    if (err) return next(err);
    if(req.query.sortedbytime == "true" || req.query.sortedbytime == true)
    {
        res.json(people.sort(function(a,b){
            if(a.getFastestTime() === undefined && b.getFastestTime() === undefined)
            {return 0;}
            else if(a.getFastestTime() === undefined) {return 1;}
            else if(b.getFastestTime() === undefined){ return -1;}
            
            return a.getFastestTime().time-b.getFastestTime().time;
            
        }));
    }
    else
    {
        res.json(people);
    }
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

router.post('/:id/results', function(req,res,next){
   Person.findById(req.params.id, function(err,p){
       if(err){console.log(err);}
       p.results.push(req.body);
       p.save(function(err){
           if(err){
                console.log("failed to add result"); 
                return next(err);
           }
       });
       res.json(p.results);
   });
});

router.get('/:id/results', function(req,res,next){
   Person.findById(req.params.id, function(err,p){
        if(err){
            console.log(err);
            return next(err);
        }
        else if(p == null)
        {
            res.status(404).send("person '" + req.params.id +"' not found.");
        }
        else
        {
            res.json(p.results)
        }
   });
});

router.delete('/:id/results/:resultid', function(req,res,next){
   Person.findById(req.params.id, function(err, person) {
      person.results.id(req.params.resultid).remove();
      person.save();
      res.send('deleted ' + req.params.resultid);
   }); 
});

router.get('/:id/results/fastest', function(req,res,next){
   Person.findById(req.params.id, function(err,p){
      if(err)
      {
          return next(err);
      }
      else if(p == null)
      {
          res.status(404).send("not found");
      }
      else
      {
          var h = p.sayHello();
          p.getFastestTime(function(err,r)
          {
              res.json(r);
          });
          
      }
   }); 
});

module.exports = router;
