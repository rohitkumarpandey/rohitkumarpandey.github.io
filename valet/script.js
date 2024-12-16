
// async function findVehicle(vehicleNumber) {
//     const response = await fetch('./data.json');
//     if (response && response.ok) {
//         response.json().then(data => {
//             console.log(data)
//         });
//     } 
    
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const searchBtn = document.getElementById('vehicle-search-btn');
//     if (searchBtn) {
//         searchBtn.addEventListener('click', () => {
//             findVehicle('123');
//         })
//     }
// });
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ocrResult = document.getElementById("ocrResult");
const ctx = canvas.getContext("2d");

// Start video stream
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing webcam:", err);
    alert("Webcam access is required to use this feature.");
  });

// Function to capture a frame and process OCR
function processFrame() {
  // Set canvas dimensions to match video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw current video frame to canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get image data from canvas
  const imageData = canvas.toDataURL("image/png");

  // Perform OCR on the current frame
  Tesseract.recognize(imageData, "eng")
    .then(({ data: { text } }) => {
      // Update the OCR result
      ocrResult.textContent = "Detected Text: " + text;
    })
    .catch((error) => {
      console.error("Error during OCR:", error);
      ocrResult.textContent = "Error detecting text.";
    });
}

// Process frames at regular intervals
setInterval(processFrame, 1000); // Adjust interval as needed (e.g., 500ms for faster updates)