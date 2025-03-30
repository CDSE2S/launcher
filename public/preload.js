const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    launchGame: (gamePath) => ipcRenderer.send("launch-game", gamePath),
    selectGame: () => ipcRenderer.invoke("select-game")
});
