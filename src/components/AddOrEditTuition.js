import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Step1 from './AddOrEditTuition/Step1';

import sanatizeFormObj from '../scripts/sanatize-form-obj';

import { host } from '../config.json';

import {
	Button,
	Form,
	message,
	Row,
	Steps
} from 'antd';
const Step = Steps.Step;

const eduatlasAddress = 'https://eduatlas.com';

class AddOrEditTuition extends Component {
	state = {
		current: 0,
		tuitionInfo: {}
	}

	async componentDidMount() {
		const { edit, match: { params: { tuitionId } } } = this.props;
		if (edit === false) return;
		try {
			const { data: tuitionInfo } = await axios.get(`${eduatlasAddress}/tuition?_id=${tuitionId}`);
			this.setState({ tuitionInfo });
		} catch (error) {
			message.error('There was a problem connecting with the server!');
			console.error(error);
		}
	}

	handleDoneClick = () => {
		this.handleFormSubmit();
	}

	initEditTuition = async values => {
		const { history: { push }, match: { params: { tuitionId } } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: tuitionInfo } = await axios.put(`${eduatlasAddress}/tuition/${tuitionId}`, values);
			this.setState({ tuitionInfo });
			hideLoadingMessage();
			message.success('Tuition edited successfully!');
			push('/dashboard');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}

	initAddTuition = async values => {
		const { history: { push } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: addedTuition } = await axios.post(`${eduatlasAddress}/tuition`, values);
			await axios.post(`${host}/user/add-claim`, { listingId: addedTuition._id, listingCategory: 'tuition' }, { withCredentials: true });
			hideLoadingMessage();
			message.success('Tuition added successfully!');
			push('/dashboard');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}

	handleFormSubmit = () => {
		const { edit, form } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			edit ? this.initEditTuition(values) : this.initAddTuition(values);
		});
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}


	render() {
		const { current, tuitionInfo } = this.state;
		const steps = [{
			title: 'Necessary Info',
			content: <Step1 getFieldDecorator={this.props.form.getFieldDecorator} tuitionInfo={tuitionInfo} />
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
							current === steps.length - 1 && <Button type="primary" onClick={this.handleDoneClick}>Done</Button>
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

export default withRouter(Form.create({ name: 'add-tuition' })(AddOrEditTuition));

