/**
 * Properties of a Pad's button. Not to confuse with the props of a PadButton React Component.
 */
interface ButtonProperties {
	/**
	 * Whether the button is currently playing a sound.
	 */
	active: boolean;
	/**
	 * The color to display when the button component is active.
	 */
	activeColor: string;
	/**
	 * The path to this button's audio file.
	 */
	audio?: string;
	/**
	 * The code of the key that triggers this button.
	 */
	code: string;
	/**
	 * Whether an issue is going on with the button.
	 */
	failing?: boolean;
	/**
	 * When set to true, the button's colors will not have a slight radial gradient effect.
	 */
	flatColors: boolean;
	/**
	 * The color to display when the button component is not active.
	 */
	idleColor: string;
	/**
	 * A text to display on the button component.
	 */
	label: string;
	/**
	 * The position of this button on the Pad.
	 */
	position: number[];
	/**
	 * The volume to play this pad's audio to. Decimal value included in [0, 1].
	 */
	volume: number;
}

export default ButtonProperties;