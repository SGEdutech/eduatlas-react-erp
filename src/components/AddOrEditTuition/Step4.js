import React, { Component } from 'react';

import ResultCard from './ResultCard';

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

class Step4 extends Component {
	state = {
		selectedFile: null,
		selectedFileList: [],
		showAddResultModal: false
	}

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	handleAddResultCancel = () => this.setState({ showAddResultModal: false });

	handleAddResultBtnClick = () => {
		this.setState({ showAddResultModal: true });
	}

	initAddResult = () => {
		const { addResult, form } = this.props;
		const { selectedFile } = this.state;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			sanatizeFormObj(values);
			values.cover = selectedFile;
			addResult(values);
			form.resetFields();
			this.setState({ showAddResultModal: false });
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
		const { removeResult, tuitionInfo } = this.props;
		const { bragging } = tuitionInfo;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { selectedFileList, showAddResultModal } = this.state;
		return (
			<>
				<Card
					className="h-100 mb-3"
					hoverable
					onClick={this.handleAddResultBtnClick}
				>
					<Meta
						description={
							<Row align="middle" justify="center" type="flex">Add New Result</Row>
						}
					/>
				</Card>
				<List
					grid={gridConfig}
					dataSource={bragging}
					renderItem={item => (
						<List.Item>
							<ResultCard resultInfo={item} removeResult={removeResult} />
						</List.Item>
					)}
				/>
				{/* Add Course Modal */}
				<Modal
					centered
					onCancel={this.handleAddResultCancel}
					onOk={this.initAddResult}
					okText="Add"
					title="Add Result"
					visible={showAddResultModal}>
					<Form layout="vertical">
						<Form.Item label="Result Title">
							{getFieldDecorator('title', {
								rules: [{ required: true, message: 'Title is required!' }]
							})(
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

export default Form.create({ name: 'add-result' })(Step4);

