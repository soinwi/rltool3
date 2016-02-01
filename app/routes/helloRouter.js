var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.send("hello...");
});

router.get('/blupp', function(req,res){
   res.send("blupp, blupp"); 
});

module.exports = router;
