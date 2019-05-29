import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { host, eduatlas as eduatlasAddress } from '../config.json';

import NewLeadCard from './Leads/NewLeadCard';

import {
	Badge,
	Col,
	Empty,
	message,
	Row,
	Tabs
} from 'antd';
const { TabPane } = Tabs;

const badgeColor = { backgroundColor: '#00bcd4' };
const colLayout = {
	xs: 24, nd: 12, lg: 8
};

class Leads extends Component {
	state = {
		listingInfo: undefined,
		tabPosition: 'left'
	}
	async componentDidMount() {
		this.resize();
		const { match: { params: { listingId, listingType } } } = this.props;
		try {
			const { data: listingInfo } = await axios.get(`${host}/${listingType}?_id=${listingId}`);
			this.setState({ listingInfo });
		} catch (error) {
			message.error('There was a problem connecting with the server!');
			console.error(error);
		}
	}

	updateLeads = updatedLead => {
		this.setState(prevState => {
			const { listingInfo } = prevState;
			const leads = listingInfo.leads;
			const newLeadsArr = leads.map(leadInfo => leadInfo._id === updatedLead._id ? updatedLead : leadInfo);
			return { listingInfo: { ...listingInfo, leads: newLeadsArr } };
		});
	}

	resize() {
		if (window.innerWidth < 768) {
			this.setState({ tabPosition: 'top' });
		}
	}

	render() {
		const { listingInfo } = this.state;

		const newLeads = [];
		const followUpLeads = [];
		const closedLeads = [];
		if (listingInfo) {
			listingInfo.leads.forEach(leadInfo => {
				if (leadInfo.comments.length === 0) {
					newLeads.push(leadInfo);
				} else if (leadInfo.status === 'closed' || leadInfo.status === 'enrolled') {
					closedLeads.push(leadInfo);
				} else if (leadInfo.comments.length >= 0 && leadInfo.status === 'active') {
					followUpLeads.push(leadInfo);
				}
			});
		}

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		return (
			<div className="container">
				<Tabs className="border p-2" tabPosition={this.state.tabPosition}>
					<TabPane tab={<>New Leads<Badge count={newLeads.length} style={badgeColor}></Badge></>} key="1">
						<Row gutter={16}>
							{newLeads.length === 0 ? emptyJsx :
								newLeads.map(leadInfo => {
									return <Col key={leadInfo._id} {...colLayout}>
										<NewLeadCard leadInfo={leadInfo} updateLeads={this.updateLeads} />
									</Col>;
								})}
						</Row>
					</TabPane>
					<TabPane tab={<>Follow Ups<Badge count={followUpLeads.length} style={badgeColor}></Badge></>} key="2">
						{followUpLeads.length === 0 ? emptyJsx :
							followUpLeads.map(leadInfo => {
								return <Col key={leadInfo._id} {...colLayout}>
									<NewLeadCard leadInfo={leadInfo} updateLeads={this.updateLeads} />
								</Col>;
							})}
					</TabPane>
					<TabPane tab={<>Closed<Badge count={closedLeads.length} style={badgeColor}></Badge></>} key="3">
						{closedLeads.length === 0 ? emptyJsx :
							closedLeads.map(leadInfo => {
								return <Col key={leadInfo._id} {...colLayout}>
									<NewLeadCard leadInfo={leadInfo} updateLeads={this.updateLeads} />
								</Col>;
							})}
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default withRouter(Leads);

