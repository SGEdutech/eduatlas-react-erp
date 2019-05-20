import React, { Component } from 'react';

import { host } from '../../config.json';

import { Menu } from 'antd';

const eduatlasAddress = 'https://eduatlas.com';

class LeftMenu extends Component {
	render() {
		return (
			<Menu mode={this.props.mode} selectedKeys={[]} >
				<Menu.Item key="mail">
					<a href={eduatlasAddress + '/'} target='_blank' rel="noopener noreferrer">Home</a>
				</Menu.Item>
				<Menu.Item key="tuitons">
					<a href={eduatlasAddress + '/search/tuition'} target='_blank' rel="noopener noreferrer">Institute/Tuitions</a>
				</Menu.Item>
				<Menu.Item key="schools">
					<a href={eduatlasAddress + '/search/school'} target='_blank' rel="noopener noreferrer">Schools</a>
				</Menu.Item>
				<Menu.Item key="events">
					<a href={eduatlasAddress + '/search/event'} target='_blank' rel="noopener noreferrer">Events</a>
				</Menu.Item>
			</Menu >
		);
	}
}

export default LeftMenu;
