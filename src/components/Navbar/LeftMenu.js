import React, { Component } from 'react';

import { host } from '../../config.json';

import { Menu } from 'antd';

class LeftMenu extends Component {
	render() {
		return (
			<Menu mode={this.props.mode}>
				<Menu.Item key="mail">
					<a href={host + '/'} target='_blank' rel="noopener noreferrer">Home</a>
				</Menu.Item>
				<Menu.Item key="tuitons">
					<a href={host + '/searchdetails.html?page=1&items=18&typeOfInfo=tuition'} target='_blank' rel="noopener noreferrer">Institute/Tuitions</a>
				</Menu.Item>
				<Menu.Item key="schools">
					<a href={host + '/searchdetails.html?page=1&items=18&typeOfInfo=school'} target='_blank' rel="noopener noreferrer">Schools</a>
				</Menu.Item>
				<Menu.Item key="events">
					<a href={host + '/searchdetails.html?page=1&items=18&typeOfInfo=event'} target='_blank' rel="noopener noreferrer">Events</a>
				</Menu.Item>
			</Menu>
		);
	}
}

export default LeftMenu;
