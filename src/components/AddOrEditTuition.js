import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Step1 from './AddOrEditTuition/Step1';
import Step2 from './AddOrEditTuition/Step2';
import Step3 from './AddOrEditTuition/Step3';
import Step4 from './AddOrEditTuition/Step4';
import Step5 from './AddOrEditTuition/Step5';
import Step6 from './AddOrEditTuition/Step6';
import Step7 from './AddOrEditEvent/Step2';

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
		formStepsData: { bragging: [], coursesOffered: [], gallery: [], team: [] },
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
		// used by courses step
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.coursesOffered.push(courseData) :
				newState.tuitionInfo.coursesOffered.push(courseData);
			return newState;
		});
	}

	addFaculty = facultyData => {
		// used by results step
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.team.push(facultyData) :
				newState.tuitionInfo.team.push(facultyData);
			return newState;
		});
	}

	addFileToState = newState => {
		this.setState(() => newState);
	}

	addGallery = imageData => {
		// used by results step
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.gallery.push(imageData) :
				newState.tuitionInfo.gallery.push(imageData);
			return newState;
		});
	}

	addResult = resultData => {
		// used by results step
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.bragging.push(resultData) :
				newState.tuitionInfo.bragging.push(resultData);
			return newState;
		});
	}

	handleDoneClick = () => {
		// FIXME: loading btn not showing up
		this.setState({ loading: true });
		this.handleFormSubmit();
		this.setState({ loading: false });
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

	removeCourse = courseData => {
		// used by courses step
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

	removeFaculty = facultyData => {
		// used by results step
		// TODO: result title must be unique
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.team = newState.formStepsData.team.filter(result => result.name !== facultyData.name) :
				newState.tuitionInfo.team = newState.tuitionInfo.team.filter(result => result.name !== facultyData.name);
			return newState;
		});
	}

	removeGallery = imageData => {
		// used by results step
		// TODO: result title must be unique
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.gallery = newState.formStepsData.gallery.filter(image => image.imageName !== imageData.imageName) :
				newState.tuitionInfo.gallery = newState.tuitionInfo.gallery.filter(image => image.imageName !== imageData.imageName);
			return newState;
		});
	}

	removeResult = resultData => {
		// used by results step
		// TODO: result title must be unique
		const { edit } = this.props;
		this.setState(previousState => {
			const newState = previousState;
			Boolean(edit) === false ?
				newState.formStepsData.bragging = newState.formStepsData.bragging.filter(result => result.title !== resultData.title) :
				newState.tuitionInfo.bragging = newState.tuitionInfo.bragging.filter(result => result.title !== resultData.title);
			return newState;
		});
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
			},
			{
				title: 'Results',
				content: <Step4 addResult={this.addResult} removeResult={this.removeResult} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			},
			{
				title: 'Faculty',
				content: <Step5 addFaculty={this.addFaculty} removeFaculty={this.removeFaculty} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			},
			{
				title: 'Gallery',
				content: <Step6 addGallery={this.addGallery} removeGallery={this.removeGallery} tuitionInfo={edit ? tuitionInfo : formStepsData} />
			},
			{
				title: 'Cover Image',
				content: <Step7 eventInfo={edit ? tuitionInfo : formStepsData} selectedFileList={selectedFileList} addFileToState={this.addFileToState} />
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

