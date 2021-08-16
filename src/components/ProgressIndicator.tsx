import React from 'react';
import '../style/ProgressIndicator.sass';

/**
 * Indicator of the progress of a PadButton's audio.
 */
function ProgressIndicator(props: { duration: number, active: boolean }): React.ReactElement {
	const style = { animation: `progressing ${props.duration}s linear` } as React.CSSProperties;
	return (
		<div className='progress-indicator'>
			{props.active && <div className='progress-indicator-inner' style={style}></div>}
		</div>
	);
}

export default ProgressIndicator;