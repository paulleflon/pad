import React from 'react';
import Pad from './components/Pad';
import TitleBar from './components/TitleBar';
function App(): React.ReactElement {
	return (
		<>
			<TitleBar />
			<div className="App">
				<Pad />
			</div>
		</>
	);
}

export default App;