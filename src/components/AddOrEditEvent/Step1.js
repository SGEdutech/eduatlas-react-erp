import React, { Component } from 'react';

import {
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	TimePicker
} from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

const colLayout = {
	xs: 24,
	md: 12
};

const children = [
	<Option key="1" value="Classes & Workshops">Classes & Workshops</Option>,
	<Option key="2" value="Camps">Camps</Option>,
	<Option key="3" value="Festivals ">Festivals </Option>,
	<Option key="4" value="Adventure & Sports">Adventure & Sports</Option>,
	<Option key="5" value="Scholarships">Scholarships</Option>,
	<Option key="6" value="Competitions">Competitions</Option>,
	<Option key="7" value="Concerts & Shows">Concerts & Shows</Option>,
	<Option key="8" value="Fairs & Exhibitions">Fairs & Exhibitions</Option>,
	<Option key="10" value="Travel And Activities">Travel And Activities</Option>,
	<Option key="11" value="Fun places to visit">Fun places to visit</Option>
];

class Step1 extends Component {
	render() {
		const { getFieldDecorator, eventInfo } = this.props;
		return (
			<>
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							label="Event Name"
							hasFeedback={true}>
							{getFieldDecorator('name', {
								initialValue: eventInfo.name,
								rules: [{
									required: true, message: 'Name is required!'
								}]
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Category"
							hasFeedback={true}>
							{getFieldDecorator('category', {
								initialValue: eventInfo.category
							})(
								<Select
									style={{ width: '100%' }}
									placeholder="Click/Tap to select">
									{children}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Entry Fee"
							hasFeedback={true}>
							{getFieldDecorator('entryFee', {
								initialValue: eventInfo.entryFee
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="About Your Event"
							hasFeedback={true}>
							{getFieldDecorator('description', {
								initialValue: eventInfo.description
							})(
								<TextArea rows={4} />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Divider orientation="left" >Age Group</Divider>
					<Col {...colLayout}>
						<Form.Item
							label="From"
							hasFeedback={true}>
							{getFieldDecorator('fromAge', {
								initialValue: eventInfo.fromAge
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="To"
							hasFeedback={true}>
							{getFieldDecorator('toAge', {
								initialValue: eventInfo.toAge
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Divider orientation="left" >Location</Divider>
					<Col {...colLayout}>
						<Form.Item
							label="Address Line 1"
							hasFeedback={true}>
							{getFieldDecorator('addressLine1', {
								initialValue: eventInfo.addressLine1,
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
								initialValue: eventInfo.addressLine2
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
								initialValue: eventInfo.city,
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
								initialValue: eventInfo.state,
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
							label="Pin Code"
							hasFeedback={true}>
							{getFieldDecorator('pin', {
								initialValue: eventInfo.pin
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Divider orientation="left">Date And Time</Divider>
					<Col {...colLayout}>
						<Form.Item
							label="Start Date"
							hasFeedback={true}>
							{getFieldDecorator('fromDate', {
								initialValue: eventInfo.fromDate
							})(
								<DatePicker format="DD/MM/YY" className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="End Date"
							hasFeedback={true}>
							{getFieldDecorator('toDate', {
								initialValue: eventInfo.toDate
							})(
								<DatePicker format="DD/MM/YY" className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Start Time"
							hasFeedback={true}>
							{getFieldDecorator('fromTime', {
								initialValue: eventInfo.fromTime
							})(
								<TimePicker className="w-100" use12Hours format="h:mm a" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="End Time"
							hasFeedback={true}>
							{getFieldDecorator('toTime', {
								initialValue: eventInfo.toTime
							})(
								<TimePicker className="w-100" use12Hours format="h:mm a" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Last Date of Registration"
							hasFeedback={true}>
							{getFieldDecorator('lastDateRegistration', {
								initialValue: eventInfo.lastDateRegistration
							})(
								<DatePicker format="DD/MM/YY" className="w-100" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Divider orientation="left">Organiser/Contact Person</Divider>
					<Col {...colLayout}>
						<Form.Item
							label="Contact Person Name"
							hasFeedback={true}>
							{getFieldDecorator('organiserName', {
								initialValue: eventInfo.organiserName
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Phone"
							hasFeedback={true}>
							{getFieldDecorator('organiserPhone', {
								initialValue: eventInfo.organiserPhone
							})(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Email"
							hasFeedback={true}>
							{getFieldDecorator('organiserEmail', {
								initialValue: eventInfo.organiserEmail
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
								initialValue: eventInfo.website
							})(
								<Input />
							)}
						</Form.Item>
					</Col>
				</Row>
			</>
		);
	}
}

export default Step1;

