import { join } from "path";
import { URL } from "url";
import { BrowserWindow, app, shell } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

app.on("ready", async () => {
	await prepareNext(".");

	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: {
			nodeIntegration: false,
			preload: join(__dirname, "preload.ts")
		}
	});

	mainWindow.webContents.on("zoom-changed", (event, url) => {
		event.preventDefault();
		shell.openExternal(url);
	});

	const url = isDev ? "http://localhost:8000/" : new URL("../out/index.html", `file://${__dirname}`).toString();

	mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);
