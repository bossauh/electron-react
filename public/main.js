const { app, BrowserWindow } = require("electron");
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

const isDev = require("electron-is-dev");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });

    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(win.webContents);

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
};

app.on("ready", createWindow);

// Setup react dev tools
app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => {
            console.log("Added Extension:", name);
        })
        .catch((err) => {
            console.log("An error occurred:", err);
        });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
