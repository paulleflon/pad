import archiver from 'archiver';
import fs from 'fs';
import ButtonProperties from '../types/ButtonProperties';

/**
 * Bundles current Pad configuration in a single file containing audio files and button properties.
 * @param props The ButtonProperties to save in the project file.
 * @param target The location to store the config file to.
 */
export function bundle(props: ButtonProperties[][], target: string): Promise<void> {
	return new Promise(resolve => {
		const out = fs.createWriteStream(target);
		const archive = archiver('zip');
		archive.pipe(out);
		archive.append(JSON.stringify(props), { name: 'properties.json' });
		archive.on('finish', resolve);
		for (const { audio, position } of props.flat()) {
			if (!audio)
				continue;
			const ext = audio.substring(audio.lastIndexOf('.') + 1);
			archive.append(fs.createReadStream(audio), { name: `audio-${position[0]}-${position[1]}.${ext}` });
		}
		archive.finalize();
	});
}