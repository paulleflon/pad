import React from 'react';
import '../style/PadButton.sass';
import PadButtonProps from '../types/PadButtonProps';

/**
 * A button in a Pad.
 */
class PadButton extends React.Component<PadButtonProps> {
	constructor(props: PadButtonProps) {
		super(props);
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.shiftKey && e.code === this.props.code)
				this.props.select(this.props.position);
		});
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
				className={'pad-button ' + this.props.className}
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