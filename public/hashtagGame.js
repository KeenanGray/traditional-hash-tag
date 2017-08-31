function JoinGame() {
    $.ajax({
        type: 'GET',
        url: '/JoinGame',
        success: function (result) {
            $("html").html(result);

        }
    });
}


function PhotoAdded() {
    selectedFile = document.getElementById('takePictureField').files[0];

    var formData = new FormData();
    formData.append('uploads[]', selectedFile, selectedFile.name);


    if (selectedFile) {
        $.ajax({
            url: '/Upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('upload successful!');
            }
        });
    }
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
