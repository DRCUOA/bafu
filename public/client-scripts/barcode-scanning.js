/*
* script to support barcode scanning
*/
if (document.querySelector('#interactive')) {

  // new-item-form modal
  if (document.querySelector('#enter-new-details-form')) {
    let viewport = document.querySelector("#interactive");
    // Get the modal and it's close control btn, add el for click, display on modal on click
    const modalNewItemForm = document.querySelector('#new-item-form');
    const closeNewItemForm = document.querySelector('#close-new-details-form');
    document.querySelector('#new-item-form-btn').addEventListener('click', function () {
      viewport.style.display = "block";
      document.querySelector("#animatedLine line").style.animationPlayState = "running";
    });

    document.getElementById("enter-new-details-form").addEventListener("submit", function (event) {
      console.log('submit event fired')
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

  // scanner viewport
  let barcodeDetected = false;

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#interactive'),
      constraints: {
        width: (280 * 1.5),
        height: 280,
        facingMode: "environment"
      },
    },
    decoder: {
      readers: [
        "i2of5_reader"
      ]
    },
    debug: {
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: true,
      showPattern: false
    },
    multiple: false
  }, function (err) {
    if (err) { console.log(err); return }
    console.log("Initialization finished. Ready to start");
  });

  Quagga.onDetected(function (result) {
    const modalNewItemForm = document.querySelector('#new-item-form');
    const closeNewItemForm = document.querySelector('#close-new-details-form');
    const viewport = document.querySelector("#interactive");
    document.querySelector("#output").innerHTML = `<p>Barcode Read: <span style="color: blue;">${result.codeResult.code}</span></p>`;
    console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    barcodeDetected = true;
    viewport.style.display = "none";
    document.querySelector("#animatedLine line").style.animationPlayState = "paused";
    modalNewItemForm.style.display = 'block';

    // When the close button is clicked, set the modal's display property to "none"
    closeNewItemForm.addEventListener('click', function () {
      console.log('close control btn clicked')
      modalNewItemForm.style.display = "none";
      viewport.style.display = "block";
      barcodeDetected = false;
      document.querySelector("#animatedLine line").style.animationPlayState = "running";
    });
  });

  setInterval(function () {
    if (barcodeDetected) {
      Quagga.stop();
    } else if (!barcodeDetected) {
      Quagga.start();
    }
  }, 1000);
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