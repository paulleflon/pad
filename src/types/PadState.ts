import ButtonProperties from './ButtonProperties';

/**
 * The state of a Pad component.
 */
interface PadState {
	/**
	 * Array of the Pad Buttons' properties. 2 dimensional array mapped as the [y][x] positions of the buttons. 
	 */
	buttonProperties: ButtonProperties[][];
	/**
	 * Array of pressed keys' codes.
	 */
	pressedButtons: string[];

	/**
	 * The coords of the currently selected button to configurate.
	 */
	selectedButton?: [number, number];
}

export default PadState;