import ButtonProperties from './ButtonProperties';

interface ButtonConfiguratorProps {
	/**
	 * The properties of the currently being configured button.
	 */
	button?: ButtonProperties;
	/**
	 * Function to set whether the Pad's key events must be ignored.
	 */
	setFreezed: (freezed: boolean) => void;
	/**
	 * A function to call with the updated properties of the button. 
	 */
	updater?: (p: Partial<ButtonProperties>) => void;
}

export default ButtonConfiguratorProps;