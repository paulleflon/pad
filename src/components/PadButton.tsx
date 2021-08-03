import React from 'react';
import '../style/PadButton.sass';
import PadButtonProps from '../types/PadButtonProps';

/**
 * A button in a Pad.
 */
class PadButton extends React.Component<PadButtonProps> {
	constructor(props: PadButtonProps) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<div className='pad-button'>
				{this.props.label && <div className='pad-button-label'>{this.props.label}</div>}
			</div>
		);
	}

	static defaultProps = {
		colors: {
			active: '#fffc33',
			flat: false,
			resting: '#aaaaaa'
		}
	};
}

export default PadButton;