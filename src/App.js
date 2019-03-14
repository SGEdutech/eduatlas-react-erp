import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

// CSS
import './App.css';
import './core/css/material-kit.css';

// Components
import AddTuition from './components/AddTuition';
import ErpManager from './components/ErpManager';

import { BackTop } from 'antd';

class App extends Component {
	render() {
		return (
			<>
				<Router>
					<Switch>
						<Route exact path="/" component={ErpManager}></Route>
						<Route exact path="/add-tuition" component={AddTuition}></Route>
					</Switch>
				</Router>
				<BackTop />
			</>
		);
	}
}

export default App;
