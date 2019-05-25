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

export default Step2;

