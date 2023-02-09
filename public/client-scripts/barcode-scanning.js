/*
* script to support barcode scanning
*/
if (document.querySelector('#interactive')) {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#interactive'),
      constraints: {
        width: 480,
        height: 320,
        facingMode: "environment"
      },
    },
    decoder: {
      readers: ["code_128_reader", "upc_reader"]
    }
  }, function (err) {
    if (err) { console.log(err); return }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  });

  Quagga.onDetected(function (result) {
    console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
  });
}


