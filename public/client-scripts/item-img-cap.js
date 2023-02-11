/*
* item image capture
*/

if (document.querySelector('#item-image-capture')) {
  // 1. find the canvas element on the document with id 'item-image-capture'
  const canvas = document.getElementById('item-image-capture');

  // 2. set the canvas element context such that it will be able to display an image when one is captured
  const context = canvas.getContext('2d');

  // 3. find the button element on the document with id 'snap-item-image'
  const snapButton = document.getElementById('snap-item-image');

  // 4. start the camera on the device
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    let frozen = false;

    // Display the live stream in the canvas
    (function loop() {
      if (!frozen) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(loop);
      }
    })();

    // 5. add document event listener for key events: on "ctrl-p" event - freeze image and draw on canvas
    let controlLeftPressed = false;
    document.addEventListener('keydown', () => {
      if (event.code === "ControlLeft") {
        controlLeftPressed = true;
      }
      if (controlLeftPressed = true && event.code === 'KeyP') {
        frozen = true;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      } 
    });
    document.addEventListener('keyup', () => {
      if(event.code === "ControlLeft") {
        controlLeftPressed = false;
      }
    });

    // 6. save the image in an object for later use in the code
    const image = new Image();
    image.src = canvas.toDataURL();
    console.log(image.src)
    // You can use the `image` object in the rest of your code
  });
};