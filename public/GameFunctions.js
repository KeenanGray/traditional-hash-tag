var cloudinary = require('cloudinary')


function SavePhoto() {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);

    // Stop all video streams.
    //player.srcObject.getVideoTracks().forEach(track => track.stop());
}

function BeginStreamCapture() {
    debug("hello");
    return;

    const player = document.getElementById('player');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');

    const constraints = {
        video: true,
    };

    captureButton.addEventListener('click', captureButton.addEventListener('click', () => {
        context.drawImage(player, 0, 0, canvas.width, canvas.height);

        // Stop all video streams.
        //player.srcObject.getVideoTracks().forEach(track => track.stop());
    }));

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
        });
}

function UploadPhoto() {
    console.log("function called");
    var input = document.getElementById('takePictureField'); 

    cloudinary.uploader.upload(input.files[0],
        function (result) { console.log(result) })
}