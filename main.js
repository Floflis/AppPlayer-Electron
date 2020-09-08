const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
const fs = require("fs");
const path = require("path");

const isDev = require('electron-is-dev');

let mainWindow;
let config;
let def = true;

let args = process.argv;
global.args = args;

/*app.commandLine.appendSwitch('force-gpu-rasterization');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-es3-apis');
app.commandLine.appendSwitch('enable-webgl-draft-extensions');
app.commandLine.appendSwitch('js-flags', '--harmony_proxies --harmony_collections');

app.commandLine.appendSwitch('disable-plugins');
app.commandLine.appendSwitch('disable-internal-flash');
app.commandLine.appendSwitch('disable-popup-blocking');
app.commandLine.appendSwitch('enable-gamepad');
app.commandLine.appendSwitch('enable-html5-camera');
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('disable-software-rasterizer');*/

if (fs.existsSync(path.join(__dirname, "config.json"))) {
	config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), 'utf-8'));

	console.log(config);

	def = false;
} else {
	console.log("No configuration file, back to default settings");
}

function createWindow() {
	console.log('preload', path.join(__dirname, './preload.js'))
	mainWindow = new BrowserWindow({
		webPreferences: {
			plugins: true,
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		},
		width: (def ? 800 : config.window.width),
		height: (def ? 600 : config.window.height),
		frame: (def ? false : config.window.frame),
		fullscreen: (def ? false : config.window.fullscreen),
		transparent: (def ? true : config.window.transparent),
		alwaysOnTop: (def ? false : config.window.alwaysOnTop),
	});

	if (process.argv[1]) {
		console.log('process.argv[1]', process.argv[1])
		// mainWindow.loadFile('./index-preview.html');
		mainWindow.loadURL(process.argv[1]);
	}
	else {
		console.log(`file://${__dirname}/www/index.html`)
		mainWindow.loadURL(`file://${__dirname}/www/index.html`);
	}

	if ((def ? false : config.developer.show_dev_tools))
		mainWindow.webContents.openDevTools();

	if (isDev) {
		console.log('Running in development');
		console.log("cmd line arguments : ", args);
	} else {
		console.log('Running in production');
	}

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
});
