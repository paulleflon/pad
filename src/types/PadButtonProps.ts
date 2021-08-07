import ButtonProperties from './ButtonProperties';

/**
 * Props of a PadButton component.
 */
interface PadButtonProps extends ButtonProperties {
	/**
	 * Whether the PadButton is currently being pressed.
	 */
	active: boolean;
	/**
	 * Whether the AltRight key is pressed, which displays the code of the PadButton.
	 */
	alt: boolean;
	/**
	 * An extension to the default className of a PadButton.
	 */
	className?: string;
	/**
	 * The function to call when the PadButton starts being pressed.
	 */
	onMouseDown: (k: string) => void;
	/**
	 * The function to call when the PadButton stops being pressed.
	 */
	onMouseUp: (k: string) => void;
	/**
	 * The function to call to select this button in the configurator.
	 */
	select: (coos: number[]) => void;
}

export default PadButtonProps;