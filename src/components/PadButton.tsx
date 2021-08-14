import React from 'react';
import '../style/PadButton.sass';
import PadButtonProps from '../types/PadButtonProps';

/**
 * A button in a Pad.
 */
class PadButton extends React.Component<PadButtonProps> {

	componentDidMount(): void {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.shiftKey && e.code === this.props.code)
				this.props.select(this.props.position);
		});
	}

	render(): React.ReactNode {
		const style = {
			backgroundColor: this.props.active ? this.props.activeColor : this.props.idleColor
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
				onMouseDown={() => this.props.select(this.props.position)}
			>
				{<div className='pad-button-label'>{label}</div>}
			</div>
		);
	}

	static defaultProps = {
		activeColor: '#fffc33',
		flatColors: false,
		idleColor: '#aaaaaa'
	};
}

export default PadButton;