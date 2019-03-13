import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Router from './Router';

// CSS
import './App.css';
import './core/css/material-kit.css';

// Components
import ErpManager from './components/ErpManager';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={ErpManager}></Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
