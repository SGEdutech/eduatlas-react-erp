import React, { Component } from 'react';

import FacultyCard from './FacultyCard';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import {
	Button,
	Card,
	Form,
	Icon,
	Input,
	List,
	Modal,
	Row,
	Upload
} from 'antd';
const { Meta } = Card;

const gridConfig = {
	gutter: 16, xs: 1, md: 2, lg: 3, xl: 3, xxl: 4
};

class Step5 extends Component {
	state = {
		selectedFile: null,
		selectedFileList: [],
		showAddFacultyModal: false
	}

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	handleAddFacultyCancel = () => this.setState({ showAddFacultyModal: false });

	handleAddFacultyBtnClick = () => {
		this.setState({ showAddFacultyModal: true });
	}

	initAddFaculty = () => {
		const { addFaculty, form } = this.props;
		const { selectedFile } = this.state;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			values.path = selectedFile;
			addFaculty(values);
			form.resetFields();
			this.setState({ showAddFacultyModal: false });
		});
	}

	onChange = info => {
		const nextState = {};
		switch (info.file.status) {
			case 'uploading':
				nextState.selectedFileList = [info.file];
				break;
			case 'done':
				nextState.selectedFile = info.file;
				nextState.selectedFileList = [info.file];
				break;

			default:
				// error or removed
				nextState.selectedFile = null;
				nextState.selectedFileList = [];
		}
		this.setState(nextState);
	};

	render() {
		const { removeFaculty, tuitionInfo } = this.props;
		const { team } = tuitionInfo;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { selectedFileList, showAddFacultyModal } = this.state;
		return (
			<>
				<Card
					className="h-100 mb-3"
					hoverable
					onClick={this.handleAddFacultyBtnClick}
				>
					<Meta
						description={
							<Row align="middle" justify="center" type="flex">Add New Faculty</Row>
						}
					/>
				</Card>
				<List
					grid={gridConfig}
					dataSource={team}
					renderItem={item => (
						<List.Item>
							<FacultyCard facultyInfo={item} removeFaculty={removeFaculty} />
						</List.Item>
					)}
				/>
				{/* Add Faculty Modal */}
				<Modal
					centered
					onCancel={this.handleAddFacultyCancel}
					onOk={this.initAddFaculty}
					okText="Add"
					title="Add Faculty"
					visible={showAddFacultyModal}>
					<Form layout="vertical">
						<Form.Item label="Faculty Name">
							{getFieldDecorator('name', {
								rules: [{ required: true, message: 'Name is required!' }]
							})(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Qualification">
							{getFieldDecorator('qualification')(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Description">
							{getFieldDecorator('description')(
								<Input />
							)}
						</Form.Item>
						<Upload
							accept="image/*"
							customRequest={this.dummyRequest}
							fileList={selectedFileList}
							onChange={this.onChange}>
							<Button block><Icon type="upload" /> Choose File</Button>
						</Upload>
					</Form>
				</Modal>
			</>
		);
	}
}

export default Form.create({ name: 'add-faculty' })(Step5);

