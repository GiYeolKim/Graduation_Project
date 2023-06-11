const dropZone = document.getElementById('drop-zone');
const videoImg = document.getElementById('video-img');
const videoPlayer = document.getElementById('video-player');
const uploadButton = document.getElementById('upload-button');
const trainingButton = document.getElementById('training');
const dropContainer = document.getElementById('drop-container');
const generatedVideo = document.getElementById('generated-video');
const progressIndicator = document.getElementById('progress-indicator');
const blurOverlay = document.getElementById('blur-overlay');
generatedVideo.style.display = 'none';

var video_URL = "";
var file;
blurOverlay.classList.add('hidden');
blurOverlay.style.display = 'hidden';
document.addEventListener('DOMContentLoaded', function() {
  var source = new EventSource("/stream");
  source.onmessage = function(event) {
    console.log(event);
    var logElement = document.getElementById("response-text");
    logElement.innerHTML += event.data + "<br>";
  };
});

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#f1f1f1';
});

dropZone.addEventListener('dragleave', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '';
});

document.addEventListener('DOMContentLoaded', function() {
    var updateButton = document.getElementById('update-button');
	var videoElement = document.getElementById('video-element');

    updateButton.addEventListener('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/get-dummy-text', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var dummyTextElement = document.getElementById('dummy-text');
                dummyTextElement.textContent = response.dummy_text;
            }
        };
        xhr.send();
    });
});


dropZone.addEventListener('drop', (event) => {
    event.preventDefault();

    dropZone.style.backgroundColor = '';
    const files = event.dataTransfer.files;

    if (files.length > 0 && files[0].type.startsWith('video/')) {
        const fileReader = new FileReader();
        file = files[0];
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
            // Hide the image element
            videoImg.classList.add('hidden');
            // Show the video element and set its source to the dropped file
            videoPlayer.classList.remove('hidden');
            videoPlayer.src = fileReader.result;
            video_URL = fileReader.result;
			dropContainer.remove();
        }
		videoImg.remove();

    }
	else {
		document.getElementById('drop-container').style.display = 'block';

	}

});

function showProgressIndicator() {
  if (progressIndicator) {
    progressIndicator.style.display = 'block';
	blurOverlay.classList.remove('hidden');
  }
}

function hideProgressIndicator() {
  if (progressIndicator) {
    progressIndicator.style.display = "none";
	blurOverlay.classList.add('hidden');
  }
}


// Hide the video container initially
videoPlayer.classList.add('hidden');


uploadButton.addEventListener('click', function() {
  const formData = new FormData();
  formData.append('video', file);
	showProgressIndicator();
  // Send the video file to the server
    fetch("/upload-video", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error('Upload failed');
      }
    })
    .then(function (blob) {
      // Hide the progress indicator
      hideProgressIndicator();

      // Create a temporary URL for the videoA blob
      const videoUrl = URL.createObjectURL(blob);

      // Display the generated video
      const videoElement = document.getElementById("generated-video");
      videoElement.src = videoUrl;
      videoElement.style.display = "block";
    })
    .catch(function (error) {
      // Hide the progress indicator
      hideProgressIndicator();
      console.error("Error:", error);
    });
});

trainingButton.addEventListener('click', () => {
    fetch('/training', {
    method: 'POST',
    body: ""
  }).then(response => {
    console.log('Video uploaded successfully');
    console.log(response);
  }).catch(error => {
      console.log(formData);
    console.error('Error uploading video:', error);
  });
})

/*
document.getElementById("upload-button").addEventListener("click", function () {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "video/*";
  fileInput.click();

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    // Show the progress indicator


    // Send the video file to the server
    fetch("/upload-video", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Hide the progress indicator
        hideProgressIndicator();

        // Display the generated video
        var videoElement = document.getElementById("generated-video");
        videoElement.src = data.videoUrl;
        videoElement.style.display = "block";
      })
      .catch(function (error) {
        // Hide the progress indicator
        hideProgressIndicator();
        console.error("Error:", error);
      });
  });
});
*/

document.addEventListener('DOMContentLoaded', function() {
  var source = new EventSource("/stream");
  source.onmessage = function(event) {
    console.log(event);
    var logElement = document.getElementById("response-text");
    logElement.innerText = event.data;
  };
});
