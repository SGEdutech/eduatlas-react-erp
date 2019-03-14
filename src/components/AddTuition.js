import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Step1 from '../components/AddTuition/Step1';

import {
	Button,
	message,
	Row,
	Steps
} from 'antd';
const Step = Steps.Step;

const steps = [{
	title: 'Necessary Info',
	content: <Step1 />,
}];

class AddTuition extends Component {
	state = {
		current: 0
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
		return (
			<>
				<Navbar />
				<div className="container mb-3">
					<Steps current={current}>
						{steps.map(item => <Step key={item.title} title={item.title} />)}
					</Steps>
					<div className="steps-content my-3">{steps[current].content}</div>
					<Row className="steps-action" justify="end" type="flex">
						{
							current < steps.length - 1 && <Button type="primary" onClick={() => this.next()}>Next</Button>
						}
						{
							current === steps.length - 1 && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
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

export default AddTuition;
