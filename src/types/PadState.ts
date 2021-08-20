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
	 * Whether to ignore keyboard events (except Escape), for example when a text input is focused.
	 */
	frozen: boolean;
	/**
	 * Array of pressed keys' codes.
	 */
	pressedButtons: string[];

	/**
	 * The coords of the currently selected button to configurate.
	 */
	selectedButton?: number[];
}

export default PadState;