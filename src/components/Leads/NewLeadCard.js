import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';
import { host, eduatlas as eduatlasAddress } from '../../config.json';

import {
	Card,
	Col,
	Comment,
	DatePicker,
	Form,
	Input,
	List,
	message,
	Modal,
	Row,
	Select,
	Divider
} from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

const colLayout = {
	xs: 24
};

class NewLeadCard extends Component {
	state = {
		showRespondModal: false
	}
	handleFormSubmit = () => {
		const { form } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			console.log(values);
			if (values.comment) {
				this.initUpdateLeadWithComment(values);
			} else {
				this.initUpdateLead(values);
			}
		});
	}
	handleModalConfirm = () => {
		this.handleFormSubmit();
	}
	handleRespondLeadBtnClick = () => this.setState({ showRespondModal: true });
	handleRespondLeadCancel = () => this.setState({ showRespondModal: false });
	initUpdateLead = async values => {
		const { leadInfo, match: { params: { listingId, listingType } }, updateLeads } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: updatedLead } = await axios.put(`${host}/${listingType}/${listingId}/lead/${leadInfo._id}`, values);
			updateLeads(updatedLead);
			hideLoadingMessage();
			this.handleRespondLeadCancel();
			message.success('Lead updated successfully!');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}
	initUpdateLeadWithComment = async values => {
		const { leadInfo, match: { params: { listingId, listingType } }, updateLeads } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			if (values.comment) values.comment = { message: values.comment };
			const { data: updatedLead } = await axios.post(`${host}/${listingType}/${listingId}/lead/${leadInfo._id}/comment`, values);
			updateLeads(updatedLead);
			hideLoadingMessage();
			this.handleRespondLeadCancel();
			message.success('Lead updated successfully!');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}
	render() {
		const { leadInfo, form } = this.props;
		const { getFieldDecorator } = form;
		const { showRespondModal } = this.state;
		return (
			<>
				<Card
					actions={[<span onClick={this.handleRespondLeadBtnClick}>Respond</span>]}
				>
					<Row>
						{leadInfo.message}
					</Row>
					<Row justify="end" type="flex">
						<small>{moment(leadInfo.createdAt).format('LLL')}</small>
					</Row>
					<Row className="text-secondary">
						<small>{leadInfo.name}</small>
					</Row>
					<Row className="text-secondary">
						<small>{leadInfo.phone}</small>
					</Row>
					<Row className="text-secondary">
						<small>{leadInfo.email}</small>
					</Row>
				</Card>
				{/* Respond to lead Modal */}
				<Modal
					centered
					okText='Confirm'
					onCancel={this.handleRespondLeadCancel}
					onOk={this.handleModalConfirm}
					title='Respond to lead'
					visible={showRespondModal}>
					<Row className="text-secondary">
						<small>{leadInfo.name}</small>
					</Row>
					<Row className="text-secondary">
						<small>{leadInfo.phone}</small>
					</Row>
					<Row className="text-secondary">
						<small>{leadInfo.email}</small>
					</Row>
					<List
						className="comment-list"
						header={`${leadInfo.comments.length} comments`}
						itemLayout="horizontal"
						dataSource={leadInfo.comments}
						renderItem={comment => (
							<li>
								<Comment
									content={comment.message}
									datetime={moment(comment.createdAt).format('LLL')}
								/>
							</li>
						)}
					/>
					<Divider orientation="left">Input Fields</Divider>
					<Form>
						<Row gutter={16}>
							<Col {...colLayout}>
								<Form.Item
									label="Comment"
									hasFeedback={true}>
									{getFieldDecorator('comment')(
										<TextArea rows={4} />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									label="Next Follow-Up Date"
									hasFeedback={true}>
									{getFieldDecorator('nextFollowUp', {
										initialValue: moment(leadInfo.nextFollowUp)
									})(
										<DatePicker className="w-100" format='LLL' showTime use12Hours />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									label="Status"
									hasFeedback={true}>
									{getFieldDecorator('status', {
										initialValue: leadInfo.status
									})(
										<Select className="w-100">
											<Option value="active">Active</Option>
											<Option value="closed">Closed</Option>
											<Option value="enrolled">Enrolled</Option>
										</Select>
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

export default withRouter(Form.create({ name: 'update-lead' })(NewLeadCard));

