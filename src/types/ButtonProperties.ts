/**
 * Properties of a Pad's button. Not to confuse with the props of a PadButton React Component.
 */
interface ButtonProperties {
	/**
	 * The code of the key that triggers this button.
	 */
	code: string;
	/**
	 * Color properties of the button component.
	 */
	colors: {
		/**
		 * The color to display when the button component is active.
		 */
		active: string;
		/**
		 * When set to true, the colors will not have a slight radial gradient effect to smooth it.
		 */
		flat: boolean;
		/**
		 * The color to display when the button component is not active.
		 */
		resting: string;
	};
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