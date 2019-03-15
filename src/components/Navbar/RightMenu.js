import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
	Icon,
	Menu
} from 'antd';
const SubMenu = Menu.SubMenu;

class RightMenu extends Component {
	render() {
		const { userInfo } = this.props;

		const userMenuItemsJsx = Boolean(userInfo) === false ?
			<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" /></span>}>
				<Menu.Item key="setting:1"><Link to="/login">Login</Link></Menu.Item>
			</SubMenu> :
			<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" />{userInfo.name.substr(0, 16)}</span>}>
				<Menu.Item key="setting:1">Dashboard</Menu.Item>
				<Menu.Item key="setting:2">Switch Role</Menu.Item>
				<Menu.Item key="setting:3">Logout</Menu.Item>
			</SubMenu>;

		return (
			<Menu mode={this.props.mode}>
				{userMenuItemsJsx}
			</Menu>
		);
	}
}

export default RightMenu;
