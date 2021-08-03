/**
 * Props of a PadButton component.
 */
interface PadButtonProps {
	/**
	 * Whether the PadButton is currently being pressed.
	 */
	active: boolean;
	/**
	 * Whether the AltRight key is pressed, which displays the code of the PadButton.
	 */
	alt: boolean;
	/**
	 * Color properties of the PadButton.
	 */
	colors: {
		/**
		 * The color to display when the PadButton is active.
		 * @default '#fffc33'
		 */
		active: string;
		/**
		 * When set to true, the colors will not have a slight radial gradient effect to smooth it.
		 * @default false
		 */
		flat: boolean;
		/**
		 * The color to display when the PadButton is not active.
		 * @default '#aaaaaa'
		 */
		resting: string;
	};
	/**
	 * The code of the key that triggers this PadButton.
	 */
	code: string;
	/**
	 * A text to display on the PadButton.
	 */
	label?: string;
}

export default PadButtonProps;