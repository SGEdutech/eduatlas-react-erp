import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NewLeadCard from './NewLeadCard';
import sanatizeFormObj from '../../scripts/sanatize-form-obj';
import { host } from '../../config.json';

import {
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Row
} from 'antd';
const Meta = Card.Meta;
const { TextArea } = Input;

const modalColLayout = {
	xs: 24
};

class NewLeads extends Component {
	state = {
		showRespondModal: false
	}
	handleAddLeadBtnClick = () => this.setState({ showRespondModal: true });
	handleAddLeadCancel = () => this.setState({ showRespondModal: false });
	handleFormSubmit = () => {
		const { form } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			console.log(values);
			this.initAddLead(values);
		});
	}
	handleModalConfirm = () => this.handleFormSubmit();
	initAddLead = async values => {
		const { addLeads, match: { params: { listingId, listingType } } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: addedLead } = await axios.post(`${host}/${listingType}/${listingId}/lead`, values);
			addLeads(addedLead);
			hideLoadingMessage();
			this.handleAddLeadCancel();
			message.success('Lead added successfully!');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}
	render() {
		const { colLayout, emptyJsx, form, newLeads } = this.props;
		const { showRespondModal } = this.state;
		const { getFieldDecorator } = form;
		return (
			<>
				<Card
					className="h-100"
					hoverable
					onClick={this.handleAddLeadBtnClick}
				>
					<Meta
						description={
							<Row align="middle" justify="center" type="flex">Add Leads</Row>
						}
					/>
				</Card>
				<Row gutter={16}>
					{newLeads.length === 0 ? emptyJsx :
						newLeads.map(leadInfo => {
							return <Col className="p-2" key={leadInfo._id} {...colLayout}>
								<NewLeadCard leadInfo={leadInfo} updateLeads={this.updateLeads} />
							</Col>;
						})}
				</Row>

				<Modal
					centered
					okText='Add'
					onCancel={this.handleAddLeadCancel}
					onOk={this.handleModalConfirm}
					title='Add leads'
					visible={showRespondModal}>
					<Form>
						<Row gutter={16}>
							<Col {...modalColLayout}>
								<Form.Item
									label="Student/Parent Name"
									hasFeedback={true}>
									{getFieldDecorator('name', {
										rules: [{
											required: true, message: 'Name is required!'
										}]
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...modalColLayout}>
								<Form.Item
									label="Email"
									hasFeedback={true}>
									{getFieldDecorator('email', {
										rules: [{
											type: 'email', message: 'Not a valid E-mail!'
										}]
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...modalColLayout}>
								<Form.Item
									label="Phone Number"
									hasFeedback={true}>
									{getFieldDecorator('phone', {
										rules: [{
											required: true, message: 'Phone is required!'
										}]
									})(
										<InputNumber className="w-100" />
									)}
								</Form.Item>
							</Col>
							<Col {...modalColLayout}>
								<Form.Item
									label="Query from Student/Parent"
									hasFeedback={true}>
									{getFieldDecorator('message', {
										rules: [{
											required: true, message: 'Message is required!'
										}]
									})(
										<TextArea rows={4} />
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			</>
		);
	}
}

export default withRouter(Form.create({ name: 'add-new-lead' })(NewLeads));
