
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get("/", function(req, res) {
    res.render("a", { title: 'Express' });
});

app.get('/log', function(req, res) {
    fs.appendFile('/tmp/analyticLogs', req.query["page"] + '\n', function(err) {
        if(err) {
            console.log(err);
            res.send(500);
        } else {
            res.send(200);
        }
    });
});

app.get('/:page', function(req, res) {
    res.render(req.params["page"], { title: 'Express' });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
