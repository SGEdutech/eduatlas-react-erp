
import React, { Component } from 'react';

import {
	Icon,
	Menu
} from 'antd';
const SubMenu = Menu.SubMenu;

class RightMenu extends Component {
	state = {
		user: {
			name: 'Mannvender Singh Dalal'
		}
	}

	render() {
		const { user } = this.state;

		const defaultOptionsJsx = (
			<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" /></span>}>
				<Menu.Item key="setting:1">Login</Menu.Item>
			</SubMenu>
		);

		const userOptionsJsx = (
			<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" />{user.name.substr(0, 16)}</span>}>
				<Menu.Item key="setting:1">Dashboard</Menu.Item>
				<Menu.Item key="setting:2">Switch Role</Menu.Item>
				<Menu.Item key="setting:3">Logout</Menu.Item>
			</SubMenu>
		);

		return (
			<Menu mode={this.props.mode}>
				{Boolean(user) === false ? defaultOptionsJsx : userOptionsJsx}
			</Menu>
		);
	}
}

export default RightMenu;
