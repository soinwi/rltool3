var express = require("express");
var app = express();




app.listen(process.env.PORT, function(){
    console.log('Example app listening on port ' + process.env.PORT + '!');
});

var hello = require('./routes/helloRouter');
var people = require('./routes/peopleRouter');
var statRes = require('./routes/staticRouter');

app.use('/', hello);
app.use('/people', people);
app.use('/static', statRes);


module.exports = app;