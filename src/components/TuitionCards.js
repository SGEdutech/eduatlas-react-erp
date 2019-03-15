import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { host } from '../config.json';

import {
	Avatar,
	Button,
	Card,
	List,
	Modal,
	Row,
	Tag
} from 'antd';
const { Meta } = Card;


const data = [
	{
		title: 'PV EDUCATION PVT. LTD.',
		rating: 2.5
	},
	{
		title: 'THE BRAIN LAB',
		rating: 5,
		url: 'https://eduatlas.com/images/tuitionPics/brainLab-1545988442793.PNG'
	},
	{
		title: 'Aba Academy',
		rating: 5
	},
	{
		title: 'MEEND MURCHHANA MUSIC INSTITUTE',
		rating: 5
	},
	{
		title: 'WINDOWS THE ART AND CRAFT CORNER',
		rating: 2
	},
	{
		addNewTuition: true
	}
];

const gridConfig = {
	gutter: 16, xs: 1, md: 2, lg: 3, xl: 4, xxl: 5
};

function getRatingColor(rating) {
	if (rating >= 4) {
		return 'green';
	} else if (rating > 2) {
		return 'orange';
	}
	return 'red';
}

class TuitionCards extends Component {
	state = {
		showAddTuitionModal: false,
		showTuitionManageModal: false,
		tuitionName: null
	}

	async componentDidMount() {
		const { data } = await axios.get(`${host}/tuition/claimed`, { withCredentials: true });
		console.log(data);
	}

	handleCardClick = title => {
		this.setState({
			tuitionName: title,
			showTuitionManageModal: true
		});
	}

	handleTuitionAddClick = () => this.setState({ showAddTuitionModal: true })
	handleAddTuitionCancel = () => this.setState({ showAddTuitionModal: false })
	handleTuitionManageCancel = () => this.setState({ showTuitionManageModal: false })

	render() {
		const { showAddTuitionModal, showTuitionManageModal, tuitionName } = this.state;
		return (
			<>
				<List
					grid={gridConfig}
					dataSource={data}
					renderItem={item => (
						Boolean(item.addNewTuition) === false ?
							<List.Item>
								<Card
									hoverable
									onClick={() => this.handleCardClick(item.title)}>
									<Meta
										avatar={<Avatar src={item.url} style={{ backgroundColor: '#00bcd4' }}>{item.title.substr(0, 1)}</Avatar>}
										title={item.title}
										description={
											<Tag color={getRatingColor(item.rating)}>{item.rating}/5</Tag>
										}
									/>
								</Card>
							</List.Item> :
							<List.Item>
								<Card
									className="h-100"
									hoverable
									onClick={this.handleTuitionAddClick}
								>
									<Meta
										description={
											<Row align="middle" justify="center" type="flex">Add New</Row>
										}
									/>
								</Card>
							</List.Item>
					)}
				/>
				{/* Tuition Modal */}
				<Modal
					centered
					footer={null}
					onCancel={this.handleTuitionManageCancel}
					title={tuitionName}
					visible={showTuitionManageModal}
				>
					<div className="text-center">
						<Button block className="my-2" icon="tool" size="large" type="primary">Study Monitor</Button><br />
						<Button block className="my-2" icon="eye" size="large" type="primary">View Listing</Button><br />
						<Button block className="my-2" icon="edit" size="large" type="primary">Edit Listing </Button><br />
						<Button block className="my-2" icon="delete" size="large" type="danger">Unclaim</Button>
					</div>
				</Modal>
				{/* Add Tuition Modal */}
				<Modal
					centered
					closable={false}
					footer={null}
					onCancel={this.handleAddTuitionCancel}
					visible={showAddTuitionModal}
				>
					<div className="text-center">
						<a href="https://eduatlas.com"><Button block className="my-2" icon="search" size="large" type="primary">Find & Claim A Listing</Button></a><br />
						<Link to="/add-tuition"><Button block className="my-2" icon="plus" onClick={this.handleAddTuitionClick} size="large" type="primary">Add New </Button></Link>
					</div>
				</Modal>
			</>
		);
	}
}

export default TuitionCards;

