const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        kiosk: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Importante!
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true
    });

    win.loadFile('index.html');
}

// Configurar IPC para fechar a janela
ipcMain.on('close-app', () => {
    app.quit(); // Fecha completamente a aplicação
});

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});