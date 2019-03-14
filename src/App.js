import axios from 'axios';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

// CSS
import './App.css';
import './core/css/material-kit.css';

// Components
import AddTuition from './components/AddTuition';
import ErpManager from './components/ErpManager';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

import { BackTop } from 'antd';

import { host } from './config.json';

class App extends Component {
	state = {
		userInfo: {}
	}

	async componentDidMount() {
		try {
			const { data } = await axios.get(host + '/user/info');
			this.setState({ userInfo: data });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { userInfo } = this.state;

		const bodyContentJsx = Boolean(userInfo) === false ?
			<Switch>
				<Route exact path="/" component={Login}></Route>
				<Route exact path="/sign-up" component={Signup}></Route>
			</Switch> :
			<Switch>
				<Route exact path="/" component={ErpManager}></Route>
				<Route exact path="/add-tuition" component={AddTuition}></Route>
			</Switch>;

		return (
			<>
				<Router>
					<>
						<Navbar userInfo={userInfo} />
						{bodyContentJsx}
					</>
				</Router>
				<BackTop />
			</>
		);
	}
}

export default App;
