import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	/**
	 * Shuts down the application.
	 */
	closeApp(): void {
		ipcRenderer.send('close');
	},
	/**
	 * Minimizes the app's window to tray.
	 */
	minimize(): void {
		ipcRenderer.send('window.minimize');
	},
	/**
	 * Toggles between maximized window and floating window.
	 */
	toggleMaximized(): void {
		ipcRenderer.send('window.toggleMaximized');
	}
})