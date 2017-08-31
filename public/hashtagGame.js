function JoinGame() {
    $.ajax({
        type: 'GET',
        url: '/JoinGame',
        success: function (result) {
            $("html").html(result);

        }
    });
}


function UploadPhotos() {
    var files = document.getElementById('takePictureField').files;

    if (files.length > 0) {
        // One or more files selected, process the file upload

        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

    }
    $.ajax({
        url: '/Upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            alert("done")
        },
        xhr: function () {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function (evt) {

                if (evt.lengthComputable) {
                    // calculate the percentage of upload completed
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);

                    // update the Bootstrap progress bar with the new percentage
                    $('.progress-bar').text(percentComplete + '%');
                    $('.progress-bar').width(percentComplete + '%');

                    // once the upload reaches 100%, set the progress bar text to done
                    if (percentComplete === 100) {
                        $('.progress-bar').html('Done');
                    }

                }

            }, false);

            return xhr;
        }

    });
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
