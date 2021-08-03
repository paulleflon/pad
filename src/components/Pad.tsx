import React from 'react';
import '../style/Pad.sass';
import PadProps from '../types/PadProps';
import PadButton from './PadButton';

class Pad extends React.Component<PadProps> {
	constructor(props: PadProps) {
		super(props);

	}

	render(): React.ReactNode {
		const rows = [];
		for (let i = 0; i < this.props.rows; i++) {
			const cells = [];
			for (let j = 0; j < this.props.columns; j++) {
				const k = defaultKeyCodes[i][j];
				cells.push(<PadButton code={k} key={k} />);
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
	[49, 50, 51, 52],
	[81, 87, 69, 82],
	[65, 83, 68, 70],
	[90, 88, 67, 86]
];
// Temporary