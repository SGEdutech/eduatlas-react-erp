import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Router from './Router';

// CSS
import './App.css';
import './core/css/material-kit.css';

// Components
import AddTuition from './components/AddTuition';
import ErpManager from './components/ErpManager';
import Loading from './components/Loading';
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
			const { data: userInfo } = await axios.get(`${host}/user/info`, { withCredentials: true });
			this.setState({ userInfo });
		} catch (error) {
			console.error(error);
		}
	}

	updateUserInfo = userInfo => this.setState({ userInfo });

	render() {
		const { userInfo } = this.state;
		return (
			<>
				<Router>
					<>
						<Navbar userInfo={userInfo} />
						<Switch>
							<Route exact path="/" render={() => <Loading userInfo={userInfo} />}></Route>
							<Route exact path="/dashboard" component={ErpManager}></Route>
							<Route exact path="/add-tuition" component={AddTuition}></Route>
							<Route exact path="/login" component={Login}></Route>
							<Route exact path="/signup" component={Signup}></Route>
						</Switch>
					</>
				</Router>
				<BackTop />
			</>
		);
	}
}

export default App;
