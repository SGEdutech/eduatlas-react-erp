import React, { Component } from 'react';

import {
	Col,
	Form,
	Input,
	Row,
	Select,
	InputNumber
} from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

const colLayout = {
	xs: 24,
	md: 12
};

const children = [
	<Option value="Library/Study Area">Library/Study Area</Option>,
	<Option value="Smart Classes">Smart Classes</Option>,
	<Option value="Study Material">Study Material</Option>,
	<Option value="AC Classes">AC Classes</Option>,
	<Option value="Internet/WIFI">Internet/WIFI</Option>,
	<Option value="Transport">Transport</Option>,
	<Option value="E-Learning">E-Learning</Option>
];

class Step1 extends Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="pt-3">
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							label="Institute Name"
							hasFeedback={true}>
							{getFieldDecorator('name', {
								// initialValue: code,
								rules: [{
									required: true, message: 'Name is required!'
								}, {
									validator: this.validateInstitueName
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="City"
							hasFeedback={true}>
							{getFieldDecorator('city', {
								// initialValue: code,
								rules: [{
									required: true, message: 'City is required!'
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="State"
							hasFeedback={true}>
							{getFieldDecorator('state', {
								// initialValue: code,
								rules: [{
									required: true, message: 'State is required!'
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Address Line 1"
							hasFeedback={true}>
							{getFieldDecorator('addressLine1', {
								// initialValue: code,
								rules: [{
									required: true, message: 'AL1 is required!'
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Address Line 2"
							hasFeedback={true}>
							{getFieldDecorator('addressLine2', {
								// initialValue: code,
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Pin Code"
							hasFeedback={true}>
							{getFieldDecorator('pin', {
								// initialValue: code,
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							label="About Your Institute"
							hasFeedback={true}>
							{getFieldDecorator('about', {
								// initialValue: code,
							})(
								<TextArea rows={4} />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							label="Facilities"
							hasFeedback={true}>
							{getFieldDecorator('facilities', {
								// initialValue: code,
							})(
								<Select
									mode="tags"
									style={{ width: '100%' }}
									placeholder="Tags Mode"
								>
									{children}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default Form.create({ name: 'add-tuition' })(Step1);

