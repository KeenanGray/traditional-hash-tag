var express = require('express');
var cloudinary = require('cloudinary')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/JoinGame', function (request, response) {
    //console.log("Joining Game");
    response.render('pages/GameRunning');
});

app.get('/Upload', function () {

    //cloudinary.uploader.upload(selectedFile,
    //    function (result) { alert(result) })

});


