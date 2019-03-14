import React, { Component } from 'react';

import Step1 from '../components/AddTuition/Step1';

import sanatizeFormObj from '../scripts/sanatize-form-obj';

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
		const wasSuccessful = this.handleSubmit();
		if (wasSuccessful) {
			console.log('redirect');
		}
	}

	handleSubmit = () => {
		const { form } = this.props;
		let isFormValid = null;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.log(err);
				isFormValid = false;
				// error must be returned, else code breaks
				return err;
			}
			sanatizeFormObj(values);
			// TODO: put action here
			isFormValid = true;
		});
		return isFormValid;
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
						<Form onSubmit={this.handleSubmit} className="pt-3">{steps[current].content}</Form>
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

export default Form.create({ name: 'add-tuition' })(AddTuition);

