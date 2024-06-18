const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  enableRightClick: () => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      let params = {
        selectionText: window.getSelection().toString(),
        isEditable:
          e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA",
        isImage: e.target.nodeName === "IMG",
        imageURL: e.target.src,
      };

      ipcRenderer.send("show-context-menu", e.x, e.y, params);
    });
  },
});
