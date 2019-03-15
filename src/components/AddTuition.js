import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Step1 from '../components/AddTuition/Step1';

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

class AddTuition extends Component {
	state = {
		current: 0
	}

	handleDoneClick = () => {
		const wasSuccessful = this.handleFormSubmit();
		if (wasSuccessful) {
			console.log('redirect');
		}
	}

	handleFormSubmit = () => {
		const { form, history: { push } } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			const hideLoadingMessage = message.loading('Action in progress..', 0);
			try {
				const { data: addedTuition } = await axios.post(`${host}/tuition`, values, { withCredentials: true });
				await axios.post(`${host}/user/add-claim`, { listingId: addedTuition._id, listingCategory: 'tuition' }, { withCredentials: true });
				hideLoadingMessage();
				message.success('Tuition added successfully!');
				push('/dashboard');
			} catch (error) {
				console.error(error);
				hideLoadingMessage();
				message.error('There was some problem with server!');
			}
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
		const { current } = this.state;

		const steps = [{
			title: 'Necessary Info',
			content: <Step1 getFieldDecorator={this.props.form.getFieldDecorator} />
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

export default withRouter(Form.create({ name: 'add-tuition' })(AddTuition));

