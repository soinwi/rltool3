var express = require("express");
var app = express();




app.listen(process.env.PORT, function(){
    console.log('Example app listening on port ' + process.env.PORT + '!');
});

var hello = require('./routes/helloRouter');
var people = require('./routes/peopleRouter');

app.use('/', hello);
app.use('/people', people);


module.exports = app;