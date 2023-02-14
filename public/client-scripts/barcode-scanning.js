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
        const barcodeFound = document.querySelector('#barcode-found');
        barcodeFound.value = data.codeResult.code;
        // check if the barcode detected already exists in the database.
        checkIfBarcodeExists(data.codeResult.code).then((item) => {
          if (item) {
          console.log(`barcode :${data.codeResult.code}, found in database. Item found:`, item);
          } else {
          document.querySelector('#new-item-form').style.display = 'block';
          addEventListenerForm();
          }
          });
        scanBtn.disabled = false;
      });
    });
  });
}

function addEventListenerForm() {
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

/* LEARNING NOTE: 
the "fetch" function returns a Response object, which is an object representing the response to a request.  To access the actual item data, you need to extract the data from the Response object. You can do this by calling the ".json()" method on the Response object, which will parse the response body as JSON and return a promise that resolves to a JavaScript object.
*/
async function checkIfBarcodeExists(barcode) {
  return await fetch(`/search-items/item_check?barcode=${barcode}`)
      .then(response => response.json());
}