import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Step1 from './AddOrEditEvent/Step1';
import Step2 from './AddOrEditEvent/Step2';

import sanatizeFormObj from '../scripts/sanatize-form-obj';
import convertModelToFormData from '../scripts/modelToFormData';

import { host, eduatlas as eduatlasAddress } from '../config.json';

import {
	Button,
	Form,
	message,
	Row,
	Steps
} from 'antd';
const Step = Steps.Step;


class AddOrEditEvent extends Component {
	state = {
		current: 0,
		eventInfo: {},
		formStepsData: {},
		loading: false,
		selectedFile: null,
		selectedFileList: []
	}

	addFileToState = newState => {
		this.setState(() => newState);
	}

	async componentDidMount() {
		const { edit, match: { params: { eventId } } } = this.props;
		if (Boolean(edit) === false) return;
		try {
			const { data: eventInfo } = await axios.get(`${host}/event?_id=${eventId}`);
			this.setState({ eventInfo });
		} catch (error) {
			message.error('There was a problem connecting with the server!');
			console.error(error);
		}
	}

	handleDoneClick = () => {
		// FIXME: loading btn not showing up
		this.setState({ loading: true });
		this.handleFormSubmit();
		this.setState({ loading: false });
	}

	initEditEvent = async () => {
		const { formStepsData } = this.state; 
		const { history: { push }, match: { params: { eventId } } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: eventInfo } = await axios.put(`${host}/event/${eventId}`, formStepsData);
			this.setState({ eventInfo });
			hideLoadingMessage();
			message.success('Event edited successfully!');
			push('/dashboard');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}

	initAddEvent = async () => {
		const { formStepsData } = this.state;
		const { history: { push } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const config = { headers: { 'Content-Type': 'multipart/form-data' } };
			const form_data = convertModelToFormData(formStepsData);
			const { data: addedEvent } = await axios.post(`${host}/event`, form_data, config);
			if (Boolean(addedEvent._id) === false) console.log(addedEvent, 'ERR: event data not fetched')
			await axios.post(`${host}/user/add-claim`, { listingId: addedEvent._id, listingCategory: 'event' }, { withCredentials: true });
			hideLoadingMessage();
			message.success('Event added successfully!');
			push('/dashboard');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}

	handleFormSubmit = () => {
		const { edit, form } = this.props;
		const { formStepsData, selectedFile } = this.state;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			if (selectedFile) formStepsData.eventCoverPic = selectedFile.originFileObj;
			this.setState(previousState => ({
				formStepsData: { ...previousState.formStepsData, ...values }
			}));
			edit ? this.initEditEvent() : this.initAddEvent();
		});
	}

	next() {
		// Store data in state
		const { form } = this.props;
		let isError = false;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				isError = true;
				return err;
			}
			sanatizeFormObj(values);
			this.setState(previousState => ({
				formStepsData: { ...previousState.formStepsData, ...values }
			}));
		});
		if (isError) return;
		// load next step
		const current = this.state.current + 1;
		this.setState({ current });
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}


	render() {
		const { current, eventInfo, formStepsData, loading, selectedFileList } = this.state;
		const { edit } = this.props;
		const steps = [{
			title: 'Necessary Info',
			content: <Step1 eventInfo={edit ? eventInfo : formStepsData} getFieldDecorator={this.props.form.getFieldDecorator} />
		}, {
			title: 'Cover Image',
			content: <Step2 eventInfo={edit ? eventInfo : formStepsData} selectedFileList={selectedFileList} addFileToState={this.addFileToState} />
		}];

		return (
			<>
				<div className="container mb-3">
					<Steps current={current}>
						{steps.map(item => <Step key={item.title} title={item.title} />)}
					</Steps>
					<div className="steps-content my-3">
						<Form onSubmit={this.handleFormSubmit} className="pt-3">{steps[current].content}</Form>
					</div>
					<Row className="steps-action" justify="end" type="flex">
						{
							current < steps.length - 1 && <Button type="primary" onClick={() => this.next()}>Next</Button>
						}
						{
							current === steps.length - 1 && <Button loading={loading} type="primary" onClick={this.handleDoneClick}>Done</Button>
						}
						{
							current > 0 && (
								<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
									Previous
								</Button>
							)
						}
					</Row>
				</div>
			</>
		);
	}
}

export default withRouter(Form.create({ name: 'add-event' })(AddOrEditEvent));

