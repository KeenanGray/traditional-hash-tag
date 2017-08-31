var express = require('express');
var cloudinary = require('cloudinary')
var app = express();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

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

//The upload code was found here.
//https://coligo.io/building-ajax-file-uploader-with-node/
//Modified by me to use Cloudinary
app.post('/Upload', function (req, response) {
    console.log("post");
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    var count = 0;
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        count++;
        fs.rename(file.path, path.join(form.uploadDir, file.name));

        cloudinary.uploader.upload(path.join(form.uploadDir, file.name),
            function (result) {
                console.log("uploaded " + count);
                    })
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        response.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});


