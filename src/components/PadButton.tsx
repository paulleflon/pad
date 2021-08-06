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
		const style = {
			backgroundColor: this.props.colors[this.props.active ? 'active' : 'resting']
		};
		let label;
		if (this.props.label)
			label = this.props.label;
		if (this.props.alt)
			label = this.props.code;
		return (
			<div
				className='pad-button'
				style={style}
				onMouseDown={() => this.props.onMouseDown(this.props.code)}
				onMouseUp={() => this.props.onMouseUp(this.props.code)}
			>
				{<div className='pad-button-label'>{label}</div>}
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