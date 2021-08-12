/**
 * Extended AudioContext class including utility methods to manage a Pad's audio.
 */
export default class AudioManager extends AudioContext {
	/**
	 * The sounds loaded in the manager, mapped by their paths.
	 */
	sounds: Map<string, AudioBuffer>;

	constructor() {
		super();
		this.sounds = new Map();
	}

	/**
	 * Loads a sound in the manager.
	 * @param file The path to the file.
	 */
	async loadSound(file: string): Promise<void> {
		const buffer = await window.electron.importAudio(file);
		return new Promise(resolve => {
			this.decodeAudioData(buffer, decoded => {
				this.sounds.set(file, decoded);
				resolve();
			});
		});
	}

	/**
	 * Plays a sound.
	 * @param name The name of the sound to play.
	 */
	playSound(name: string): void {
		if (!this.sounds.has(name))
			return;
		// Type assertion required because we know that it is defined with the check, but TypeScript can't understand it.
		const buffer = this.sounds.get(name) as AudioBuffer;
		const source = this.createBufferSource();
		source.buffer = buffer;
		source.connect(this.destination);
		source.start();
	}
}