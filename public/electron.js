const { app, BrowserWindow, ipcMain, shell, dialog } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js") // Secure communication with React
        }
    });

    mainWindow.loadURL("http://localhost:3000"); // Load React app in dev mode
    mainWindow.on("closed", () => (mainWindow = null));
});

// Listen for game launch event
ipcMain.on("launch-game", (event, gamePath) => {
    shell.openPath(gamePath); // Opens the game
});

// Allow user to select a game
ipcMain.handle("select-game", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Executables", extensions: ["exe"] }]
    });

    return result.filePaths[0] || null;
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
