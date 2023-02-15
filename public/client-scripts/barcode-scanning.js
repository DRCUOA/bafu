/*
* script to support barcode scanning
*/

if (document.querySelector('#interactive')) {
  const scanBtn = document.querySelector('#new-item-form-btn');
  const animatedLine = document.querySelector('#animatedLine');
  // document listener for manually barcode entry:
  const keydownHandler = function (event) {
    if (event.shiftKey && event.key === 'M') {
      console.log('Shift + M was pressed');
      const manualBarcodeForm = document.querySelector("#enter-manual-barcode-form");
      manualBarcodeForm.style.display = "block";
    }
  };
  document.addEventListener('keydown', keydownHandler);
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
        document.removeEventListener('keydown', keydownHandler);
        vport.style.display = 'none';
        Quagga.stop();
        const barcodeFound = document.querySelector('#barcode-found');
        barcodeFound.value = data.codeResult.code;
        // check if the barcode detected already exists in the database.
        checkIfBarcodeExists(data.codeResult.code).then((item) => {
          if (item) {
            let sendBack = JSON.stringify(item);
            fetch(`/search-items/manual-search?item=${sendBack}`)
              .then(response => response.text())
              .then(newPageHtml => {
                // Replace the current page with the new page HTML
                document.documentElement.innerHTML = newPageHtml;
              })
              .catch(error => console.error(error));
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
  document.addEventListener('keyup', (event) => {
    if (event.key === "Escape") {
      document.querySelector('#new-item-form').style.display = 'none';
    } else {
      document.querySelector('#new-item-form').style.display = 'block';
    }
  });
  document.querySelector("#close-new-details-form").addEventListener('click', (event) => {
    document.querySelector('#new-item-form').style.display = 'none';
  });
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

async function checkIfBarcodeExists(barcode) {
  return await fetch(`/search-items/item_check?barcode=${barcode}`)
    .then(response => response.json());
}

// Client-side code to handle search box input and make AJAX request
if (document.querySelector('#search-box')) {
  const searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchBox.value.trim();
      if (searchTerm.length > 0) {
        fetch(`/search-items/gen-search?q=${searchTerm}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => response.text())
        .then(newPageHtml => {
          // Replace the current page with the new page HTML
          document.documentElement.innerHTML = newPageHtml;
        })
        .catch(error => console.error(error));
      }
    }
  });
}

/* LEARNING NOTES: 
The "fetch" function returns a Response object, which is an object representing the response to a request.  This response object is a Promise. To access the actual item data, you need to extract the data from the Response object. You can do this by calling the ".json()" method on the Response object, which will parse the response body as JSON and return a promise that resolves to a JavaScript object.

The fetch call in JavaScript is designed to make an HTTP request to a server and receive a response back as a Promise. By default, this response is in the form of a Response object that contains metadata about the response (e.g., status code, headers) and the response body as a stream of bytes.

The fetch call does not have any built-in functionality for rendering a new page or updating the current page in the browser. Instead, it's up to the client-side code (e.g., JavaScript) to handle the response from the server and update the page as needed.

If your server-side code is configured to use res.render to generate a new page, the fetch call can receive the new page as an HTML string in the response body, but it's up to the client-side code to decide how to handle this HTML string. For example, you could use JavaScript to update the innerHTML property of an element in the current page with the new HTML string, effectively "replacing" the current page with the new one.

So, to summarize, the fetch call in JavaScript can receive a new page as an HTML string in the response body, but it's up to the client-side code to handle this response and update the current page as needed.
*/

