import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
	Icon,
	Row
} from 'antd';

function Loading(props) {
	const loadingJsx = (
		<div>
			<Row style={{ height: '80vh' }} type="flex" justify="center" align="middle">
				<Icon style={{ fontSize: 64 }} type="smile" theme="twoTone" twoToneColor="#00bcd4" spin />
			</Row>
		</div>
	);
	const { userInfo } = props;
	if (userInfo === null) return loadingJsx;
	const isLoggedIn = Object.keys(userInfo).length !== 0;
	return isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />;
}

export default Loading;
