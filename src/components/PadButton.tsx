import React from 'react';
import '../style/PadButton.sass';
import PadButtonProps from '../types/PadButtonProps';
import ProgressIndicator from './ProgressIndicator';

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
			backgroundColor: this.props.idleColor,
			'--activeColor': this.props.activeColor
		};
		let label;
		if (this.props.label)
			label = this.props.label;
		if (this.props.alt)
			label = this.props.code;
		const buffer = this.props.audioManager.sounds.get(this.props.audio);
		let duration;
		if (buffer)
			duration = buffer.duration;
		return (
			<div
				className={'pad-button ' + (this.props.active ? 'active ' : '') + this.props.className}
				style={style}
				onMouseDown={() => this.props.select(this.props.position)}
			>
				{<div className='pad-button-label'>{label}</div>}
				{this.props.type === 'toggle' &&
					<ProgressIndicator
						duration={duration}
						active={this.props.active}
					/>
				}
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