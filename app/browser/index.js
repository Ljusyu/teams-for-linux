(function () {
	const path = require('path');
	const { ipcRenderer, remote } = require('electron');
	const trayNotifications = require('./tray-notifications');
	require('./zoom')();

	const iconPath = path.join(__dirname, '../assets/icons/icon-96x96.png');

	trayNotifications({
		ipc: ipcRenderer,
		iconPath,
	});

	// HACK: changing the userAgent to chrome after 5 seconds to fix the issue of notifications disapearing.
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			setTimeout(navigator.__defineGetter__('userAgent', () => remote.getGlobal('edgeUserAgent')), 5000);
		},
	);
}());