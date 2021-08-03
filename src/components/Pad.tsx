import React from 'react';
import '../style/Pad.sass';
import PadProps from '../types/PadProps';
import PadState from '../types/PadState';
import PadButton from './PadButton';

class Pad extends React.Component<PadProps, PadState> {
	constructor(props: PadProps) {
		super(props);
		this.state = { pressed: [] };
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			this.setState({ pressed: [...this.state.pressed, e.code] });
		});
		window.addEventListener('keyup', (e: KeyboardEvent) => {
			this.setState({ pressed: this.state.pressed.filter(k => k !== e.code) });
		});
	}

	render(): React.ReactNode {
		const rows = [];
		for (let i = 0; i < this.props.rows; i++) {
			const cells = [];
			for (let j = 0; j < this.props.columns; j++) {
				const k = defaultKeyCodes[i][j];
				cells.push(<PadButton code={k} key={k} active={this.state.pressed.includes(k)} />);
			}
			rows.push(<div className='pad-button-row'>{cells}</div>);
		}
		return (
			<div className='pad'>
				{rows}
			</div>
		);
	}

	static defaultProps = {
		columns: 4,
		rows: 4
	};
}

export default Pad;

/**
 * Default key codes for PadButtons in a 4x4 Pad.
 */
const defaultKeyCodes = [
	['Digit1', 'Digit2', 'Digit3', 'Digit4'],
	['KeyQ', 'KeyW', 'KeyE', 'KeyR'],
	['KeyA', 'KeyS', 'KeyD', 'KeyF'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV'],
];
// Temporary