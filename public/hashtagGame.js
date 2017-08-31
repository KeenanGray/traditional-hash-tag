function ChangePage() {

}

function SavePhoto() {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);

    // Stop all video streams.
    //player.srcObject.getVideoTracks().forEach(track => track.stop());
}

function BeginCapture() {
    function hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    if (hasGetUserMedia()) {
        // Good to go!
    } else {
        alert('getUserMedia() is not supported in your browser');
    }

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
