import React, { Component } from 'react';

import {
	Button,
	Col,
	Icon,
	Row,
	Upload
} from 'antd';

const colLayout = {
	xs: 24,
	md: 12
};

class Step2 extends Component {
	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	onChange = info => {
		const nextState = {};
		const { addFileToState } = this.props;
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
		addFileToState(nextState);
	};

	render() {
		const { selectedFileList } = this.props;
		return (
			<>
			{/* TODO: user should be able to view previous cover image while edit is true */}
				<Row gutter={16}>
					<Col {...colLayout}>
						<Upload
							accept="image/*"
							customRequest={this.dummyRequest}
							fileList={selectedFileList}
							onChange={this.onChange}>
							<Button block><Icon type="upload" /> Choose File</Button>
						</Upload>
					</Col>
				</Row>
			</>
		);
	}
}
export default Step2;

