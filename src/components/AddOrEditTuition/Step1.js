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
	<Option key="1" value="Library/Study Area">Library/Study Area</Option>,
	<Option key="2" value="Smart Classes">Smart Classes</Option>,
	<Option key="3" value="Study Material">Study Material</Option>,
	<Option key="4" value="AC Classes">AC Classes</Option>,
	<Option key="5" value="Internet/WIFI">Internet/WIFI</Option>,
	<Option key="6" value="Transport">Transport</Option>,
	<Option key="7" value="E-Learning">E-Learning</Option>
];

class Step1 extends Component {
	render() {
		const { getFieldDecorator, tuitionInfo } = this.props;
		return (
			<>
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							label="Institute Name"
							hasFeedback={true}>
							{getFieldDecorator('name', {
								initialValue: tuitionInfo.name,
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
								initialValue: tuitionInfo.city,
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
								initialValue: tuitionInfo.state,
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
								initialValue: tuitionInfo.addressLine1,
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
								initialValue: tuitionInfo.addressLine2
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
								initialValue: tuitionInfo.pin
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
							{getFieldDecorator('description', {
								initialValue: tuitionInfo.description
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
								initialValue: tuitionInfo.facilities
							})(
								<Select
									mode="tags"
									style={{ width: '100%' }}
									placeholder="Tags Mode">
									{children}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
			</>
		);
	}
}

export default Step1;

