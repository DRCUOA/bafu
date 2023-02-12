/*
* script to support barcode scanning
*/

if (document.querySelector('#interactive')) {
  const scanBtn = document.querySelector('#new-item-form-btn');
  const animatedLine = document.querySelector('#animatedLine');
  // scan button click event:
  scanBtn.addEventListener('click', function () {
    animatedLine.style.display = "block";
    scanBtn.disabled = true;
    document.querySelector('#interactive').style.display = 'block';
    const vport = document.querySelector('#interactive');
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          width: (280 * 1.5),
          height: 280,
          facingMode: "environment"
        },
        target: vport
      },
      decoder: {
        readers: [
          "i2of5_reader",
        ]
      },
      debug: {
        showCanvas: true,
        showPatches: true,
        showFoundPatches: true,
        showSkeleton: true,
        showLabels: true,
        showPatchLabels: true,
        showRemainingPatchLabels: true,
        boxFromPatches: {
          showTransformed: true,
          showTransformedBox: true,
          showBB: true
        },
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: true,
        showPattern: false
      },
      multiple: false
    }, function (err) {
      if (err) { console.log(err); return }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      // on code detected:
      Quagga.onDetected(function (data) {
        vport.style.display = 'none';
        Quagga.stop();
        document.querySelector('#new-item-form').style.display = 'block';
        addEventListnerForm();
        const barcodeFound = document.querySelector('#barcode-found');
        barcodeFound.value = data.codeResult.code;
        // capture scan image
          const form = document.querySelector('#new-item-form-btn');
          const canvas = document.querySelector('#canvas');
          const context = canvas.getContext('2d');
          const image = new Image();
          let imageFile = null;
        
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              const video = document.createElement('video');
              video.srcObject = stream;
              video.play();
              video.addEventListener('play', () => {
                const width = video.videoWidth;
                const height = video.videoHeight;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                updateImage();
              });
            })
            .catch(error => {
              console.error('Error accessing camera:', error);
            });
        
          const updateImage = () => {
            image.src = canvas.toDataURL('image/jpeg', 0.9);
            dataURItoFile(image.src, 'image.jpg', 'image/jpeg')
              .then((file) => {
                imageFile = file;
              })
              .catch((error) => {
                console.error('Error converting data URI to file:', error);
              });
          };
        
          const dataURItoFile = (dataURI, filename, mimeType) => {
            return fetch(dataURI)
              .then((response) => response.arrayBuffer())
              .then((arrayBuffer) => new File([arrayBuffer], filename, { type: mimeType }));
          };
        
          form.addEventListener('submit', (event) => {
            event.preventDefault(); // prevent default form submission
            // add form data and image file to FormData object and send to server using XMLHttpRequest, fetch, or other method
            const formData = new FormData(form);
            formData.append('image', imageFile);
            // send formData to server
          });
      
        
        
        scanBtn.disabled = false;
      });
    });
  });
}

function addEventListnerForm() {
  document.getElementById("enter-new-details-form").addEventListener("submit", function (event) {
    console.log('submit event fired');
    event.preventDefault();
    const formElements = event.target.elements;
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].value === "") {
        const placeholder = formElements[i].getAttribute("placeholder");
        if (placeholder) {
          formElements[i].value = placeholder;
        }
      }
    }
    this.submit();
  });
}

// readers: [
//   "code_128_reader",
//   "ean_reader",
//   "ean_8_reader",
//   "code_39_reader",
//   "code_39_vin_reader",
//   "codabar_reader",
//   "upc_reader",
//   "upc_e_reader",
//   "i2of5_reader",
//   "2of5_reader",
//   "code_93_reader"]



 // // 1. find the canvas element on the document with id 'item-image-capture'
        // const canvas = document.getElementById('item-image-capture');
        // // 2. set the canvas element context such that it will be able to display an image when one is captured
        // const context = canvas.getContext('2d');
        // // 3. find the button element on the document with id 'snap-item-image'
        // const snapButton = document.getElementById('snap-item-image');
        // // 4. start the camera on the device
        // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        //   const video = document.createElement('video');
        //   video.srcObject = stream;
        //   video.play();
        //   let frozen = false;
        //   // Display the live stream in the canvas
        //   (function loop() {
        //     if (!frozen) {
        //       context.drawImage(video, 0, 0, canvas.width, canvas.height);
        //       requestAnimationFrame(loop);
        //     }
        //   })();
        //   // 5. add document event listener for key events: on "backQuote-1" event - freeze image and draw on canvas
        //   let DigitOnePressed = false;
        //   document.addEventListener('keydown', () => {
        //     if (event.code === "Digit1") {
        //       DigitOnePressed = true;
        //     }
        //     if (DigitOnePressed = true && event.code === 'Backquote') {
        //       frozen = true;
        //       context.drawImage(video, 0, 0, canvas.width, canvas.height);
        //     }
        //   });
        //   document.addEventListener('keyup', () => {
        //     if (event.code === "Backquote") {
        //       DigitOnePressed = false;
        //     }
        //   });
        //   // 6. save the image in an object for later use in the code
        //   const image = new Image();
        //   const imageSubmitHolder = document.querySelector("#image-blob"); 
        //   image.src = canvas.toDataURL();
        //   console.log(image.binaryData);
        //   imageSubmitHolder.innerHTML = `<input type="hidden" name="imageBlob" id="image-blob" value="${image.src}">`
        // });

 // capture scan image and set the imageData src
          // const canvas = document.createElement("canvas");
          // canvas.width = vport.offsetWidth;
          // canvas.height = vport.offsetHeight;
          // const context = canvas.getContext("2d");
          // context.drawImage(Quagga.canvas.dom.source, 0, 0, canvas.width, canvas.height);
          // const imageData = canvas.toDataURL("image/png");
          // cap.src = imageData;
          // console.log(`cap.src = ${cap.src}`);