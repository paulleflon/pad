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
	 * @returns Whether the file has been successfully loaded.
	 */
	async loadSound(file: string): Promise<boolean> {
		const buffer = await window.electron.importAudio(file);
		if (!buffer)
			return false;
		return new Promise(resolve => {
			this.decodeAudioData(buffer, decoded => {
				this.sounds.set(file, decoded);
				resolve(true);
			});
		});
	}

	/**
	 * Plays a sound.
	 * @param name The name of the sound to play.
	 * @param volume The volume to play the sound with.
	 * @param end The function to call when the sound ends.
	 */
	playSound(name: string, volume: number, end: () => void): void {
		if (!this.sounds.has(name))
			return;
		// Type assertion required because we know that it is defined with the check, but TypeScript can't understand it.
		const buffer = this.sounds.get(name) as AudioBuffer;
		const source = this.createBufferSource();
		source.buffer = buffer;
		const gain = this.createGain();
		gain.gain.value = volume;
		source.connect(gain);
		gain.connect(this.destination);
		source.start();
		source.addEventListener('ended', end);
	}
}