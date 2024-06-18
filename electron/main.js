const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const Axios = require("axios");

async function downloadImage(url, filepath) {
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let window = null;

const createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false, // Disable nodeIntegration for security
      preload: path.join(__dirname, "preload.js"), // Load preload script for context menu handling
    },
    show: false,
  });
  window.loadURL(startUrl);
  window.maximize();
  window.show();
  //window.webContents.openDevTools({ mode: 'detach' });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// Handle context menu request from renderer process
ipcMain.on("show-context-menu", (event, x, y, params) => {
  const { selectionText, isEditable, isImage, imageURL } = params;
  let template = [];

  if (selectionText.length > 0) {
    // If text is selected
    template.push({ label: "Copiar", role: "copy" });
  }

  if (isEditable) {
    // If right-clicked on an input field
    template.push({ label: "Pegar", role: "paste" });
  }

  if (isImage && imageURL) {
    // If right-clicked on an image
    template.push({
      label: "Descargar imagen...",
      click: async () => {
        // Show dialog to choose download location
        dialog
          .showSaveDialog({
            defaultPath: path.basename(imageURL),
            buttonLabel: "Save",
            filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
          })
          .then((result) => {
            if (!result.canceled) {
              // Read the image file

              // Save the image file to the chosen location

              downloadImage(imageURL, result.filePath);
            }
          })
          .catch((err) => {
            console.error("Error saving image:", err);
          });
      },
    });
  }

  if (template.length > 0) {
    const menu = Menu.buildFromTemplate(template);
    menu.popup({
      window,
      x: x,
      y: y,
    });
  }
});
