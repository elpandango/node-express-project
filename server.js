// server.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//load the things we need

var app = express();

//set the view engine to ejs

app.set('view engine', 'ejs');

//ues res.render to load up an ejs view file

//index page

app.get('/', function(req, res) {
    res.render('pages/index');
});

//about page
app.get('/about', function(req, res){
    res.render('pages/about');
});

//contacts page
app.get('/contacts', function(req, res){
    res.render('pages/contacts');
});

//blog page
app.get('/blog', function(req, res){
    res.render('pages/blog');
});


app.listen(3000);
console.log('3000 is the magic port');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));