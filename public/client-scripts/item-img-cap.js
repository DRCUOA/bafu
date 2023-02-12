/*
* item image capture
*/

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.getElementById('video');
    video.srcObject = stream;
  })
  .catch(console.error);

const form = document.getElementById('enter-new-details-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const canvas = document.getElementById('canvas');
  const video = document.getElementById('video');
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
  const formData = new FormData(form);
  const imageBlob = await new Promise((resolve) => {
  canvas.toBlob(resolve, 'image/jpeg');
  });
  formData.append('image', imageBlob);
  
  const response = await fetch('/items/create-new', {
  method: 'POST',
  body: formData,
  });
  if (!response.ok) {
  console.error(await response.text());
  }
  });