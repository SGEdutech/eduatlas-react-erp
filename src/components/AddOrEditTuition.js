import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Step1 from './AddOrEditTuition/Step1';
import Step2 from './AddOrEditTuition/Step2';
import Step3 from './AddOrEditTuition/Step3';

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

class AddOrEditTuition extends Component {
	state = {
		current: 0,
		formStepsData: { coursesOffered: [] },
		loading: false,
		selectedFile: null,
		selectedFileList: [],
		tuitionInfo: {}
	}

	async componentDidMount() {
		const { edit, match: { params: { tuitionId } } } = this.props;
		if (Boolean(edit) === false) return;
		try {
			const { data: tuitionInfo } = await axios.get(`${host}/tuition?_id=${tuitionId}`);
			this.setState({ tuitionInfo });
		} catch (error) {
			message.error('There was a problem connecting with the server!');
			console.error(error);
		}
	}

	addCourse = courseData => {
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.coursesOffered.push(courseData) :
				newState.tuitionInfo.coursesOffered.push(courseData);
			return newState;
		});
	}
	removeCourse = courseData => {
		// TODO: course names must be unique
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.coursesOffered = newState.formStepsData.coursesOffered.filter(course => course.title !== courseData.title) :
				newState.tuitionInfo.coursesOffered = newState.tuitionInfo.coursesOffered.filter(course => course.title !== courseData.title);
			return newState;
		});
	}

	handleDoneClick = () => {
		// FIXME: loading btn not showing up
		this.setState({ loading: true });
		this.handleFormSubmit();
		this.setState({ loading: false });
	}

	initEditTuition = async () => {
		const { formStepsData } = this.state;
		const { history: { push }, match: { params: { tuitionId } } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: tuitionInfo } = await axios.put(`${host}/tuition/${tuitionId}`, formStepsData);
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

	initAddTuition = async () => {
		const { formStepsData } = this.state;
		const { history: { push } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const config = { headers: { 'Content-Type': 'multipart/form-data' } };
			const form_data = convertModelToFormData(formStepsData);
			const { data: addedTuition } = await axios.post(`${host}/tuition`, form_data, config);
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
		const { formStepsData, selectedFile } = this.state;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			if (selectedFile) formStepsData.tuitionCoverPic = selectedFile.originFileObj;
			this.setState(previousState => ({
				formStepsData: { ...previousState.formStepsData, ...values }
			}));
			edit ? this.initEditTuition() : this.initAddTuition();
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
		const { current, tuitionInfo, formStepsData, loading, selectedFileList } = this.state;
		const { edit } = this.props;
		const steps = [
			{
				title: 'Necessary Info',
				content: <Step1 getFieldDecorator={this.props.form.getFieldDecorator} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			},
			{
				title: 'Additional Info',
				content: <Step2 getFieldDecorator={this.props.form.getFieldDecorator} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			},
			{
				title: 'Courses',
				content: <Step3 addCourse={this.addCourse} removeCourse={this.removeCourse} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			}
		];

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

export default withRouter(Form.create({ name: 'add-tuition' })(AddOrEditTuition));

