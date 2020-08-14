// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { dialog } = require("electron").remote;
const path = require("path");

// Add an event listener to our button.
document.getElementById("myButton").addEventListener("click", () => {
  // When the button is clicked, open the native file picker to select a PDF.
  console.log("clicked");
  dialog.showOpenDialog(
    {
      properties: ["openFile"], // set to use openFileDialog
      filters: [{ name: "PDFs", extensions: ["pdf"] }], // limit the picker to just pdfs
    },
    (filepaths) => {
      // Since we only allow one file, just use the first one
      const filePath = filepaths[0];

      const viewerEle = document.getElementById("viewer");
      viewerEle.innerHTML = ""; // destroy the old instance of PDF.js (if it exists)

      // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
      const iframe = document.createElement("iframe");
      iframe.src = path.resolve(
        __dirname,
        `../public/pdfjs/web/viewer.html?file=${filePath}`
      );

      // Add the iframe to our UI.
      viewerEle.appendChild(iframe);
    }
  );
});
