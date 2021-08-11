import React from 'react';
import '../style/TitleBar.sass';

/**
 * A custom title bar for desktop.
 */
function TitleBar(): React.ReactElement {
	return (
		<div className='title-bar'>
			<div className='app-name'>Pad</div>
			<div className='action-buttons'>
				<div className='action-button' onClick={window.electron.minimize}>
					<span className='material-icons'>horizontal_rule</span>
				</div>
				<div className='action-button' onClick={window.electron.toggleMaximized}>
					<span className='material-icons' id='maximize'>crop_square</span>
				</div>
				<div className='action-button' id='close' onClick={window.electron.closeApp}>
					<span className='material-icons'>close</span>
				</div>
			</div>
		</div>
	);
}

export default TitleBar;