import axios from 'axios';
import React, { Component } from 'react';
import { parse } from 'papaparse';
import { withRouter } from 'react-router-dom';
import { host } from '../../config.json';

import {
	Button,
	Col,
	Icon,
	message,
	notification,
	Row,
	Upload
} from 'antd';

class ExcelLeadUpload extends Component {
	state = {
		selectedFile: null,
		selectedFileList: []
	};

	addLeads = async values => {
		// TODO: backend path for adding multiple leads does not exist
		const { addLeads, match: { params: { listingId, listingType } } } = this.props;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			const { data: addedLead } = await axios.post(`${host}/${listingType}/${listingId}/lead/multiple`, { leads: values });
			addLeads(addedLead);
			hideLoadingMessage();
			message.success('Leads added successfully!');
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.error('There was some problem with server!');
		}
	}

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	getLeadObjects = leadsData => {
		return leadsData.map(lead => {
			const studentObj = {
				email: lead['E-Mail'],
				name: lead['Name'],
				phone: parseInt(lead['Phone']),
				message: lead['Query'],
				source: lead['Source']
			};
			return studentObj;
		});
	}

	handleEmptyLastObj = leadsData => {
		const lastLeadData = leadsData[leadsData.length - 1];
		if (Boolean(lastLeadData['Name']) === false && Boolean(lastLeadData['Query']) === false && Boolean(lastLeadData['E-Mail']) === false && Boolean(lastLeadData['Phone']) === false) leadsData.pop();
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
		this.setState(() => nextState);
	};

	parseCsv = () => {
		const { state: { selectedFile: { originFileObj } }, validateAndAddLeads } = this;
		parse(originFileObj, {
			header: true,
			complete: res => validateAndAddLeads(res.data)
		});
	}

	showErrorMessage = message => {
		notification.error({
			description: message,
			duration: 0,
			message: 'Student can\'t be added'
		});
	}

	validateAndAddLeads = leadDataJson => {
		const { match: { params: { listingId, listingType } } } = this.props;
		console.log(leadDataJson)
		const isValid = this.validateLeadsData(leadDataJson);
		if (isValid === false) return;
		// Reordering every lead to send to database
		const leadObjs = this.getLeadObjects(leadDataJson);
		console.log(leadObjs)
		this.addLeads(leadObjs);
		this.setState({ selectedFile: null, selectedFileList: [] });
	}

	validateEmail = leadsData => {
		let isValid = true;
		leadsData.forEach((leadData, index) => {
			// regex for validating email
			const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(leadData['E-Mail']);
			if (isEmailValid === false) {
				this.showErrorMessage(`Email at row ${index + 2} is not valid`);
				isValid = false;
			}
		});
		return isValid;
	}

	validatePhoneNumber = leadsData => {
		let isValid = true;
		leadsData.forEach((leadData, index) => {
			const isPhoneNumberValid = Boolean(leadData['Phone'].length <= 12);
			if (isPhoneNumberValid === false) {
				this.showErrorMessage(`Phone Number at row ${index + 2} is not valid, use only numbers`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateDuplicateEntries = leadsData => {
		let isValid = true;
		leadsData.forEach((leadData, index) => {
			const leadIndex = leadsData.findIndex(lead => lead['Phone'] === leadData['Phone'] || lead['E-Mail'] === leadData['E-Mail']);
			if (leadIndex !== index) {
				this.showErrorMessage(`Phone or E-Mail at row ${index + 2} has another entry with same value in in csv file`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateRequiredFields = leadsData => {
		let isValid = true;
		leadsData.forEach((leadData, index) => {
			if (Boolean(leadData['Name']) === false || Boolean(leadData['Phone']) === false) {
				this.showErrorMessage(`Lead data at row ${index + 2} is missing some compulsary field(s)!`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateLeadsData = leadsData => {
		this.handleEmptyLastObj(leadsData);
		const isAnyEntryDuplicate = this.validateDuplicateEntries(leadsData);
		const areRequiredFieldsValid = this.validateRequiredFields(leadsData);
		const arePhoneNumberValid = this.validatePhoneNumber(leadsData);
		const areEmailValid = this.validateEmail(leadsData);
		return isAnyEntryDuplicate && areRequiredFieldsValid && arePhoneNumberValid && areEmailValid;
	}

	render() {
		const { selectedFileList } = this.state;
		return (
			<>
				<Col className="my-1">
					<a href={`${host}/excel-template/add-lead`} download="add-lead.csv">
						<Button block type="primary">
							Download Sample File
						</Button>
					</a>
				</Col>
				<Row type="flex" justify="center">
					<Col className="my-1">
						<Upload
							accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
							customRequest={this.dummyRequest}
							fileList={this.state.selectedFileList}
							onChange={this.onChange}>
							<Button block><Icon type="upload" /> Choose File</Button>
						</Upload>
					</Col>
				</Row>
				<Col className="my-1" >
					<Button block
						disabled={selectedFileList.length === 0}
						onClick={this.parseCsv}
						type="primary">
						Save
					</Button>
				</Col>
			</>
		);
	}
}

export default withRouter(ExcelLeadUpload);

