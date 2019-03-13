import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

class LeftMenu extends Component {
	render() {
		return (
			<Menu mode={this.props.mode}>
				<Menu.Item key="mail">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="tuitons">
					<a href="https://eduatlas.com/searchdetails.html?page=1&items=18&typeOfInfo=tuition">Institute/Tuitions</a>
				</Menu.Item>
				<Menu.Item key="schools">
					<a href="https://eduatlas.com/searchdetails.html?page=1&items=18&typeOfInfo=school">Schools</a>
				</Menu.Item>
				<Menu.Item key="events">
					<a href="https://eduatlas.com/searchdetails.html?page=1&items=18&typeOfInfo=event">Events</a>
				</Menu.Item>
			</Menu>
		);
	}
}

export default LeftMenu;
