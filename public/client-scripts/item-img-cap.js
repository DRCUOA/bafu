// NOT IN USE CURRENTLY


// const context = canvas.getContext('2d');

// async function startCamera() {
//   const stream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false
//   });
//   video.srcObject = stream;
//   video.play();
// }

// async function captureImage() {
//   context.drawImage(video, 0, 0, 320, 240);
//   const dataURL = canvas.toDataURL('image/jpeg');
//   return await fetch(dataURL)
//     .then(res => res.blob())
//     .then(blob => new File([blob], 'item_image.jpeg', { type: 'image/jpeg' }));
// }

// startCamera();

// const form = document.getElementById('enter-new-details-form');
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);
//   const file = await captureImage();
//   formData.append('item_image', file);

//   const response = await fetch('/items/create-new', {
//     method: 'POST',
//     body: formData,
//   });
//   if (!response.ok) {
//     console.error(await response.text());
//   }
// });

