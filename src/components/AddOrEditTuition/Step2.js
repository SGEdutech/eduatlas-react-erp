import React, { Component } from 'react';

import {
	Col,
	Form,
	Icon,
	Input,
	InputNumber,
	Row,
	Select
} from 'antd';
const Option = Select.Option;

const colLayout = {
	xs: 24,
	md: 12
};


class Step2 extends Component {
	render() {
		const { getFieldDecorator, tuitionInfo } = this.props;

		const selectBefore = (
			<Select defaultValue="Http://" style={{ width: 90 }}>
				<Option value="Http://">Http://</Option>
				<Option value="Https://">Https://</Option>
			</Select>
		);

		return (
			<>
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							label="Contact Person"
							hasFeedback={true}>
							{getFieldDecorator('contactPerson', {
								initialValue: tuitionInfo.contactPerson
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Primary Number"
							hasFeedback={true}>
							{getFieldDecorator('primaryNumber', {
								initialValue: tuitionInfo.primaryNumber
							})(
								<InputNumber className="w-100" max={99999999999} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Secondary Number"
							hasFeedback={true}>
							{getFieldDecorator('secondaryNumber', {
								initialValue: tuitionInfo.secondaryNumber
							})(
								<InputNumber className="w-100" max={99999999999} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Email"
							hasFeedback={true}>
							{getFieldDecorator('email', {
								initialValue: tuitionInfo.email,
								rules: [{
									type: 'email', message: 'Not a valid email!'
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Website"
							hasFeedback={true}>
							{getFieldDecorator('website', {
								initialValue: tuitionInfo.website
							})(
								<Input addonBefore={selectBefore} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Link to Facebook"
							hasFeedback={true}>
							{getFieldDecorator('fbLink', {
								initialValue: tuitionInfo.fbLink
							})(
								<Input addonBefore={<Icon type="facebook" />} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Link to Twitter"
							hasFeedback={true}>
							{getFieldDecorator('twitterLink', {
								initialValue: tuitionInfo.twitterLink
							})(
								<Input addonBefore={<Icon type="twitter" />} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Link to Youtube"
							hasFeedback={true}>
							{getFieldDecorator('youtubeLink', {
								initialValue: tuitionInfo.youtubeLink
							})(
								<Input addonBefore={<Icon type="youtube" />} />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Link to Instagram"
							hasFeedback={true}>
							{getFieldDecorator('instaLink', {
								initialValue: tuitionInfo.instaLink
							})(
								<Input addonBefore={<Icon type="instagram" />} />
							)}
						</Form.Item>
					</Col>
				</Row>
			</>
		);
	}
}

export default Step2;

