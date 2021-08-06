import React from 'react';
import Pad from './components/Pad';

function App(): React.ReactElement {
	console.log('app');
	return (
		<div className="App">
			<Pad />
		</div>
	);
}

export default App;