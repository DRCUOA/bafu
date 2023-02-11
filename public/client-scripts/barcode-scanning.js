/*
* script to support barcode scanning
*/

if (document.querySelector('#interactive')) {
  const scanBtn = document.querySelector('#new-item-form-btn');
  scanBtn.addEventListener('click', function () {
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
        // capture scan image and set the imageData src - NOT WORKING : see buggy mess below for last attempt.
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

 // capture scan image and set the imageData src
          // const canvas = document.createElement("canvas");
          // canvas.width = vport.offsetWidth;
          // canvas.height = vport.offsetHeight;
          // const context = canvas.getContext("2d");
          // context.drawImage(Quagga.canvas.dom.source, 0, 0, canvas.width, canvas.height);
          // const imageData = canvas.toDataURL("image/png");
          // cap.src = imageData;
          // console.log(`cap.src = ${cap.src}`);