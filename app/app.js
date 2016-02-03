var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

if(process.env.PORT == undefined || process.env.PORT == null)
{
    app.listen(7070, function(){
        console.log('Example app listening on port ' + 7070 + '!');
    });
}
else
{
    app.listen(process.env.PORT, function(){
        console.log('Example app listening on port ' + process.env.PORT + '!');
    });
}

var hello = require('./routes/helloRouter');
var people = require('./routes/peopleRouter');
var statRes = require('./routes/staticRouter');

app.use('/', hello);
app.use('/people', people);
app.use('/static', statRes);


//connect mongodb/mongoose
mongoose.connect('mongodb://localhost/rltool', function(err) {
    if(err) {
        console.log('db connection error', err);
    } else {
        console.log('db connection successful');
    }
});


module.exports = app;