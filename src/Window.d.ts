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
		 * Minimizes the app's window to tray.
		 */
		minimize(): void;
		/**
		 * Toggles between maximized window and floating window.
		 */
		toggleMaximized(): void;
	}
}