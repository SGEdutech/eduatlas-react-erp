import React, { Component } from 'react';

import GalleryCard from './GalleryCard';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import {
	Button,
	Card,
	Form,
	Icon,
	Input,
	List,
	message,
	Modal,
	Row,
	Upload
} from 'antd';
const { Meta } = Card;

const gridConfig = {
	gutter: 16, xs: 1, md: 2, lg: 3, xl: 3, xxl: 4
};

class Step6 extends Component {
	state = {
		selectedFile: null,
		selectedFileList: [],
		showAddGalleryModal: false
	}

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	handleAddGalleryCancel = () => this.setState({ showAddGalleryModal: false });

	handleAddGalleryBtnClick = () => {
		this.setState({ showAddGalleryModal: true });
	}

	initAddGallery = () => {
		const { addGallery, form } = this.props;
		const { selectedFile } = this.state;
		form.validateFieldsAndScroll(async (err, values) => {
			if (err) {
				console.log(err);
				return err;
			}
			if (Boolean(selectedFile) === false) {
				message.error('No image found');
				return;
			}
			sanatizeFormObj(values);
			values.path = selectedFile;
			addGallery(values);
			form.resetFields();
			this.setState({ showAddGalleryModal: false });
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
		const { removeGallery, tuitionInfo } = this.props;
		const { gallery } = tuitionInfo;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { selectedFileList, showAddGalleryModal } = this.state;
		return (
			<>
				<Card
					className="h-100 mb-3"
					hoverable
					onClick={this.handleAddGalleryBtnClick}
				>
					<Meta
						description={
							<Row align="middle" justify="center" type="flex">Add New Image</Row>
						}
					/>
				</Card>
				<List
					grid={gridConfig}
					dataSource={gallery}
					renderItem={item => (
						<List.Item>
							<GalleryCard imageInfo={item} removeGallery={removeGallery} />
						</List.Item>
					)}
				/>
				{/* Add Faculty Modal */}
				<Modal
					centered
					onCancel={this.handleAddGalleryCancel}
					onOk={this.initAddGallery}
					okText="Add"
					title="Add Image"
					visible={showAddGalleryModal}>
					<Form layout="vertical">
						<Form.Item label="Image Name">
							{getFieldDecorator('imageName', {
								rules: [{ required: true, message: 'Name is required!' }]
							})(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="Album">
							{getFieldDecorator('album')(
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

export default Form.create({ name: 'add-gallery' })(Step6);

