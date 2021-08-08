/**
 * Properties of a Pad's button. Not to confuse with the props of a PadButton React Component.
 */
interface ButtonProperties {
	/**
	 * The color to display when the button component is active.
	 */
	activeColor: string;
	/**
	 * The code of the key that triggers this button.
	 */
	code: string;
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
}

export default ButtonProperties;