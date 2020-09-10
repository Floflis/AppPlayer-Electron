const { app, BrowserWindow } = require('electron');
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const handler = require('serve-handler');

const isDev = require('electron-is-dev');

let mainWindow;
let config;

let args = process.argv;

/*
app.commandLine.appendSwitch('force-gpu-rasterization');
app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
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

if (existsSync(join(__dirname, 'config.json'))) {
	config = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf-8'));
} else {
	console.log('No configuration file, back to default settings');
}

const defaultConfig = {
	window: {
		width: 800,
		height: 600,
		frame: false,
		fullscreen: false,
		transparent: true,
		alwaysOnTop: false
	},
	developer: {
		show_dev_tools: false
	}
}

const appConfig = {
	...defaultConfig,
	...config
}

function createWindow() {
	console.log('preload', join(__dirname, './preload.js'))
	mainWindow = new BrowserWindow({
		webPreferences: {
			plugins: true,
			nodeIntegration: true,
			// TODO replace by ipc calls
			enableRemoteModule: true,
			preload: join(__dirname, 'preload.js')
		},
		width: appConfig.window.width,
		height: appConfig.window.height,
		frame: appConfig.window.frame,
		fullscreen: appConfig.window.fullscreen,
		transparent: appConfig.window.transparent,
		alwaysOnTop: appConfig.window.alwaysOnTop,
	});

	if (process.argv[1]) {
		console.log('process.argv[1]', process.argv[1])
		mainWindow.loadURL(process.argv[1]);
	}
	else {

		const config = {
			public: `${__dirname}/www`,
			directoryListing: false
		};

		require('http').createServer(function (request, response) {
			return handler(request, response, config)
		}).listen(8080);
		mainWindow.loadURL(`http://localhost:8080`);
	}

	if ((appConfig.developer.show_dev_tools))
		mainWindow.webContents.openDevTools();

	if (isDev) {
		console.log('Running in development');
		console.log('cmd line arguments : ', args);
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
