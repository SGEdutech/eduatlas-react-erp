import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { host } from '../config.json';

import {
	Avatar,
	Button,
	Card,
	Divider,
	List,
	message,
	Modal,
	Popconfirm,
	Row,
	Tag
} from 'antd';
const { Meta } = Card;

const gridConfig = {
	gutter: 16, xs: 1, md: 2, lg: 3, xl: 3, xxl: 4
};

function getRatingColor(rating) {
	if (rating >= 4) {
		return 'green';
	}
	if (rating > 2) {
		return 'orange';
	}
	return 'red';
}

class ListingCards extends Component {
	state = {
		claimedTuitions: [],
		claimedSchools: [],
		claimedEvents: [],
		showAddListingModal: false,
		showListingManageModal: false,
		// TODO: Pull this to variable
		listingInfo: { name: null, _id: null, listingType: null }
	}

	calcualteAndInsertRating = institutes => {
		if (Boolean(institutes) === false || Boolean(institutes.length) === false) return;
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
		try {
			const { data: claimedTuitionData } = await axios.get(`${host}/tuition/claimed`, { withCredentials: true });
			this.calcualteAndInsertRating(claimedTuitionData);
			const { data: claimedSchools } = await axios.get(`${host}/school/claimed`, { withCredentials: true });
			this.calcualteAndInsertRating(claimedSchools);
			const { data: claimedEvents } = await axios.get(`${host}/event/claimed`, { withCredentials: true });
			this.setState({ claimedTuitions: claimedTuitionData.map(tuition => { tuition.listingType = 'tuition'; return tuition }), claimedSchools: claimedSchools.map(school => { school.listingType = 'school'; return school }), claimedEvents: claimedEvents.map(event => { event.listingType = 'event'; return event }) });
		} catch (error) {
			console.error(error);
		}
	}

	handleCardClick = ({ _id, name, listingType }) => {
		this.setState({
			listingInfo: { _id, name, listingType },
			showListingManageModal: true
		});
	}

	handleAddTuitionCancel = () => this.setState({ showAddListingModal: false })

	handleTuitionAddClick = () => this.setState({ showAddListingModal: true })

	handleTuitionManageCancel = () => this.setState({ showListingManageModal: false })

	removeClaimedListingFromState = (listingId, listingType) => {
		switch (listingType) {
			case 'tuition':
				this.setState(prevState => ({ claimedTuitions: prevState.claimedTuitions.filter(tuition => tuition._id !== listingId) }));
				break;
			case 'school':
				this.setState(prevState => ({ claimedSchools: prevState.claimedSchools.filter(school => school._id !== listingId) }));
				break;
			case 'event':
				this.setState(prevState => ({ claimedEvents: prevState.claimedEvents.filter(event => event._id !== listingId) }));
				break;
			default:
				break;
		}
	}

	handleUnclaimBtnClick = async () => {
		const { listingInfo: { _id: listingId, listingType } } = this.state;
		const hideLoadingMessage = message.loading('Action in progress..', 0);
		try {
			await axios.delete(`${host}/user/remove-claim`, { data: { listingCategory: listingType, listingId }, withCredentials: true });
			hideLoadingMessage();
			message.success('Unclaim successful!');
			this.removeClaimedListingFromState(listingId, listingType);
			this.setState({ showListingManageModal: false });
		} catch (error) {
			console.error(error);
			hideLoadingMessage();
			message.success('There was some problem connecting to server!');
		}
	}

	render() {
		const { claimedTuitions, claimedSchools, claimedEvents, showAddListingModal, showListingManageModal, listingInfo } = this.state;
		return (
			<>
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
				<Divider orientation="left">Institute/Tuitions</Divider>
				<List
					grid={gridConfig}
					dataSource={claimedTuitions}
					renderItem={item => (
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
						</List.Item>
					)}
				/>
				<Divider orientation="left">Events</Divider>
				<List
					grid={gridConfig}
					dataSource={claimedEvents}
					renderItem={item => (
						<List.Item>
							<Card
								hoverable
								onClick={() => this.handleCardClick(item)}>
								<Meta
									avatar={<Avatar src={item.img_eventCoverPic} style={{ backgroundColor: '#00bcd4' }}>{item.name.substr(0, 1).toUpperCase()}</Avatar>}
									title={item.name}
								/>
							</Card>
						</List.Item>
					)}
				/>
				<Divider orientation="left">Schools</Divider>
				<List
					grid={gridConfig}
					dataSource={claimedSchools}
					renderItem={item => (
						<List.Item>
							<Card
								hoverable
								onClick={() => this.handleCardClick(item)}>
								<Meta
									avatar={<Avatar src={item.img_schoolCoverPic} style={{ backgroundColor: '#00bcd4' }}>{item.name.substr(0, 1).toUpperCase()}</Avatar>}
									title={item.name}
									description={
										<Tag color={getRatingColor(item.rating)}>{item.rating}/5</Tag>
									}
								/>
							</Card>
						</List.Item>
					)}
				/>

				{/* Listing Modal */}
				<Modal
					centered
					footer={null}
					onCancel={this.handleTuitionManageCancel}
					title={listingInfo.name}
					visible={showListingManageModal}>
					<div className="text-center">
						{listingInfo.listingType === 'tuition' && <a href={host + '/app/' + listingInfo._id} target='_blank' rel="noopener noreferrer">
							<Button block className="my-2" icon="tool" size="large" type="primary">Study Monitor</Button><br />
						</a>}
						<Link to={`/leads/${listingInfo.listingType}/${listingInfo._id}`}><Button block className="my-2" icon="monitor" size="large" type="primary">Leads</Button></Link><br />
						<a href={'https://eduatlas.com/' + listingInfo.listingType + '/' + listingInfo._id} target='_blank' rel="noopener noreferrer">
							<Button block className="my-2" icon="eye" size="large" type="primary">View Listing</Button>
						</a><br />
						<Link to={`/edit-${listingInfo.listingType}/${listingInfo._id}`}><Button block className="my-2" icon="edit" size="large" type="primary">Edit Listing</Button></Link><br />
						<Popconfirm title="Are you sure ?" onConfirm={this.handleUnclaimBtnClick} okText="Yes" cancelText="No">
							<Button block className="my-2" icon="delete" size="large" type="danger">
								Unclaim
							</Button>
						</Popconfirm>
					</div>
				</Modal>
				{/* Add listing Modal */}
				<Modal
					centered
					closable={false}
					footer={null}
					onCancel={this.handleAddTuitionCancel}
					visible={showAddListingModal}>
					<div className="text-center">
						<a href={'https://eduatlas.com/'} target='_blank' rel="noopener noreferrer">
							<Button block className="my-2" icon="search" size="large" type="primary">Find & Claim A Listing</Button>
						</a><br />
						<Link to="/add-tuition">
							<Button block className="my-2" icon="plus" onClick={this.handleAddTuitionClick} size="large" type="primary">Add New Institute </Button>
						</Link>
						<Link to="/add-event">
							<Button block className="my-2" icon="plus" onClick={this.handleAddEventClick} size="large" type="primary">Add New Event </Button>
						</Link>
					</div>
				</Modal>
			</>
		);
	}
}

export default ListingCards;

