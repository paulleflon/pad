// This declares our electron features for them to be usable in our React Typescript context.

declare interface Window {
	/**
	 * API to interact with the Electron process.
	 */
	electron: {
		/**
		 * Shuts down the application.
		 */
		closeApp(): void;
		/**
		 * Reads the content of a locale audio file.
		 * @param path The path to the file.
		 * @returns The ArrayBuffer of the file's data.
		 */
		async importAudio(path: string): Promise<ArrayBuffer>;
		/**
		 * Minimizes the app's window to tray.
		 */
		minimize(): void;
		/**
		 * Toggles between maximized window and floating window.
		 */
		toggleMaximized(): void;
	}
}