import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import LeftMenu from './Navbar/LeftMenu';
import RightMenu from './Navbar/RightMenu';

import {
	Button,
	Col,
	Drawer,
	Icon,
	Row
} from 'antd';

import './Navbar/Navbar.css';
import eaLogo from '../logo.svg';

class Navbar extends Component {
	state = {
		visible: false
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { userInfo } = this.props;
		return (
			<nav className="menu mb-5">
				<div className="menu__logo">
					<Row type="flex" align="middle">
						<Col span={6}>
							<img alt="logo" src={eaLogo}></img>
						</Col>
						<Col span={18}>
							<Link to="/">EduAtlas</Link>
						</Col>
					</Row>
				</div>
				<div className="menu__container">
					<div className="menu_left">
						<LeftMenu mode="horizontal" />
					</div>
					<div className="menu_rigth">
						<RightMenu mode="horizontal" />
					</div>
					<Button
						className="menu__mobile-button"
						type="primary"
						onClick={this.showDrawer}
					>
						<Icon type="align-right" />
					</Button>
					<Drawer
						title="Basic Drawer"
						placement="right"
						className="menu_drawer"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}>
						<LeftMenu mode="inline" />
						<RightMenu mode="inline" userInfo={userInfo} />
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default Navbar;
