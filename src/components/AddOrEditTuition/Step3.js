import React, { Component } from 'react';

import CourseCard from './CourseCard';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import {
	Card,
	DatePicker,
	Form,
	Input,
	InputNumber,
	List,
	Modal,
	Row
} from 'antd';
const { Meta } = Card;

const colLayout = {
	xs: 24,
	md: 8,
	lg: 6
};

const gridConfig = {
	gutter: 16, xs: 1, md: 2, lg: 3, xl: 3, xxl: 4
};

class Step3 extends Component {
	state = {
		showAddCourseModal: false
	}

	handleAddCourseCancel = () => this.setState({ showAddCourseModal: false });

	handleAddCourseBtnClick = () => {
		this.setState({ showAddCourseModal: true });
	}

	initAddCourse = () => {
		const { addCourse, form } = this.props;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			addCourse(values);
			form.resetFields();
			this.setState({ showAddCourseModal: false });
		});
	}

	render() {
		const { removeCourse, tuitionInfo } = this.props;
		const { coursesOffered } = tuitionInfo;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { showAddCourseModal } = this.state;
		return (
			<>
				<Card
					className="h-100 mb-3"
					hoverable
					onClick={this.handleAddCourseBtnClick}
				>
					<Meta
						description={
							<Row align="middle" justify="center" type="flex">Add New Course</Row>
						}
					/>
				</Card>
				<List
					grid={gridConfig}
					dataSource={coursesOffered}
					renderItem={item => (
						<List.Item>
							<CourseCard courseInfo={item} removeCourse={removeCourse} />
						</List.Item>
					)}
				/>
				{/* Add Course Modal */}
				<Modal
					centered
					onCancel={this.handleAddCourseCancel}
					onOk={this.initAddCourse}
					okText="Add"
					title="Add Course"
					visible={showAddCourseModal}>
					<Form layout="vertical">
						<Form.Item label="Course Title">
							{getFieldDecorator('title', {
								rules: [{ required: true, message: 'Title is required!' }]
							})(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Age Group">
							{getFieldDecorator('ageGroup')(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Duration">
							{getFieldDecorator('duration')(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Fee">
							{getFieldDecorator('fee')(
								<InputNumber className="w-100" />
							)}
						</Form.Item>
						<Form.Item label="Next Batch Start Date">
							{getFieldDecorator('nextBatch')(
								<DatePicker className="w-100" />
							)}
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}

export default Form.create({ name: 'add-course' })(Step3);

