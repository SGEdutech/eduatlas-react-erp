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
		// TODO: Pull this to variable
		tuitionInfo: { name: null, _id: null },
		claimedTuitions: []
	}

	calcualteAndInsertRatingInTuitions = institutes => {
		institutes = institutes.map(institute => {
			let sumOfRatings = 0;
			institute.reviews.forEach(review => {
				sumOfRatings += review.rating;
			});
			const finalRating = institute.reviews.length === 0 ? 2.5 : parseFloat(sumOfRatings / institute.reviews.length).toFixed(2);
			institute.rating = finalRating;
			return institute;
		});
	}

	async componentDidMount() {
		const { data } = await axios.get(`${host}/tuition/claimed`, { withCredentials: true });
		this.calcualteAndInsertRatingInTuitions(data);
		this.setState({ claimedTuitions: [...data, { addNewTuition: true }] });
	}

	handleCardClick = ({ _id, name }) => {
		this.setState({
			tuitionInfo: { _id, name },
			showTuitionManageModal: true
		});
	}

	handleAddTuitionCancel = () => this.setState({ showAddTuitionModal: false })
	handleTuitionAddClick = () => this.setState({ showAddTuitionModal: true })
	handleTuitionManageCancel = () => this.setState({ showTuitionManageModal: false })

	render() {
		const { claimedTuitions, showAddTuitionModal, showTuitionManageModal, tuitionInfo } = this.state;
		return (
			<>
				<List
					grid={gridConfig}
					dataSource={claimedTuitions}
					renderItem={item => (
						Boolean(item.addNewTuition) === false ?
							<List.Item>
								<Card
									hoverable
									onClick={() => this.handleCardClick(item)}>
									<Meta
										avatar={<Avatar src={item.img_tuitionCoverPic} style={{ backgroundColor: '#00bcd4' }}>{item.name.substr(0, 1).toUpperCase()}</Avatar>}
										title={item.name}
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
					title={tuitionInfo.name}
					visible={showTuitionManageModal}>
					<div className="text-center">
						<Button block className="my-2" icon="tool" size="large" type="primary">Study Monitor</Button><br />
						<Button block className="my-2" icon="eye" size="large" type="primary">View Listing</Button><br />
						<Link to={`/edit-tuition/${tuitionInfo._id}`}><Button block className="my-2" icon="edit" size="large" type="primary">Edit Listing</Button></Link><br />
						<Button block className="my-2" icon="delete" size="large" type="danger">Unclaim</Button>
					</div>
				</Modal>
				{/* Add Tuition Modal */}
				<Modal
					centered
					closable={false}
					footer={null}
					onCancel={this.handleAddTuitionCancel}
					visible={showAddTuitionModal}>
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

