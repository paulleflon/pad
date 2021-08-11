import React from 'react';
import Pad from './components/Pad';
import TitleBar from './components/TitleBar';
function App(): React.ReactElement {
	return (
		<div className="App">
			<TitleBar />
			<Pad />
		</div>
	);
}

export default App;