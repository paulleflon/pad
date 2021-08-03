/**
 * Props of a PadButton component.
 */
interface PadButtonProps {
	colors: {
		/**
		 * The color to display when the button is active.
		 * @default '#fffc33'
		 */
		active: string;
		/**
		 * When set to true, the colors will not have a slight radial gradient effect to smooth it.
		 * @default false
		 */
		flat: boolean;
		/**
		 * The color to display when the button is not active.
		 * @default '#aaaaaa'
		 */
		resting: string;
	};
	/**
	 * A text to display on the button.
	 */
	label?: string;
}

export default PadButtonProps;