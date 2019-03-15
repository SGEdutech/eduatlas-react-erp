import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { host } from '../../config.json';

import {
	Icon,
	Menu,
	message
} from 'antd';
const SubMenu = Menu.SubMenu;

class RightMenu extends Component {
	handleLogoutClick = async () => {
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data } = axios.post(`${host}/auth/local/logout`, {}, { withCredentials: true });
			console.log(data);
			hideLoadingMessage();
			message.success('Log out successful!');
		} catch (error) {
			hideLoadingMessage();
			message.error('Log out unsuccessful!');
		}
	}

	render() {
		const { userInfo } = this.props;
		const userMenuItemsJsx = userInfo === null || userInfo === undefined || Object.keys(userInfo).length === 0 ? (
			<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" /></span>}>
				<Menu.Item key="setting:1"><Link to="/login">Login</Link></Menu.Item>
			</SubMenu>
		) : (
				<SubMenu title={<span><Icon style={{ fontSize: 20 }} type="user" />{userInfo.firstName.substr(0, 16)}</span>}>
					<Menu.Item key="setting:1">Dashboard</Menu.Item>
					<Menu.Item key="setting:2">Switch Role</Menu.Item>
					<Menu.Item key="setting:3" onClick={this.handleLogoutClick}>Logout</Menu.Item>
				</SubMenu>
			);

		return (
			<Menu mode={this.props.mode}>
				{userMenuItemsJsx}
			</Menu>
		);
	}
}

export default withRouter(RightMenu);
