import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import eaLogo from '../logo.svg';

import { host } from '../config.json';

import {
	Avatar,
	Button,
	Col,
	Icon,
	Form,
	Input,
	message,
	Row
} from 'antd';

const colLayout = {
	xs: {
		span: 24
	},
	sm: {
		span: 12,
		offset: 6
	},
	lg: {
		span: 8,
		offset: 8
	}
};

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const hideLoadingMessage = message.loading('Action in progress..', 0);

		const { form, history: { push } } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			try {
				this.login(values);
				hideLoadingMessage();
				message.success('Log-In successful!');
				push('/');
			} catch (error) {
				hideLoadingMessage();
				message.error('There was a problem Logging-In!');
			}
		});
	}

	login = async values => {
		try {
			await axios.post(host + '/auth/local/login', values);
			return true;
		} catch (error) {
			console.error(error);
			return new Promise((resolve, reject) => reject(false));
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="container">
				<Row className="mt-3" type="flex" justify="center">
					<Avatar src={eaLogo} size={128} icon="user" />
				</Row>
				<Row className="mb-3" type="flex" justify="center">
					<h2 className="text-capitalize">EduAtlas</h2>
				</Row>
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Form.Item
								hasFeedback={true}>
								{getFieldDecorator('username', {
									rules: [{
										type: 'email', message: 'Not a valid E-mail!'
									},
									{
										required: true, message: 'Please provide email!'
									}]
								})(
									<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								hasFeedback={true}>
								{getFieldDecorator('password', {
									rules: [{
										required: true, message: 'Please input your password!'
									}]
								})(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item>
								<Button type="primary" block htmlType="submit">
									Login
								</Button>
							</Form.Item>
						</Col>
						<Col {...colLayout} className="mb-3">
							<Row type="flex" justify="center">
								<Link to="/sign-up"> Sign-Up!</Link>
							</Row>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default withRouter(Form.create({ name: 'login' })(Login));
