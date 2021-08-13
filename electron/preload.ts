import { ipcRenderer, contextBridge } from 'electron';
import { readFile } from 'fs/promises';

contextBridge.exposeInMainWorld('electron', {
	/**
	 * Shuts down the application.
	 */
	closeApp(): void {
		ipcRenderer.send('close');
	},
	/**
	 * Reads the content of a locale audio file and returns it.
	 * @param path The path to the file.
	 * @returns The file's data.
	 */
	async importAudio(path: string): Promise<ArrayBuffer | false> {
		let file;
		try {
			file = await readFile(path);
		} catch (err) {
			return false;
		}
		return file.buffer;
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