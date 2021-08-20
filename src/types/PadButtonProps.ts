import AudioManager from '../audio/AudioManager';
import ButtonProperties from './ButtonProperties';

/**
 * Props of a PadButton component.
 */
interface PadButtonProps extends ButtonProperties {
	/**
	 * The AudioManager of the Pad.
	 */
	audioManager: AudioManager,
	/**
	 * Whether the AltRight key is pressed, which displays the code of the PadButton.
	 */
	alt: boolean;
	/**
	 * An extension to the default className of a PadButton.
	 */
	className?: string;
	/**
	 * Whether to ignore key events.
	 */
	frozen: boolean;
	/**
	 * The function to call to select this button in the configurator.
	 */
	select: (coos: number[]) => void;
}

export default PadButtonProps;