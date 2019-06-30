import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { host } from '../config.json';

import ExcelLeadUpload from './Leads/ExcelLeadUpload';
import FollowUpLeads from './Leads/FollowUpLeads';
import NewLeadCard from './Leads/NewLeadCard';
import NewLeads from './Leads/NewLeads';

import {
	Badge,
	Col,
	Empty,
	message,
	Tabs
} from 'antd';
const { TabPane } = Tabs;

const badgeColor = { backgroundColor: '#00bcd4' };
const colLayout = {
	xs: 24, md: 12, lg: 8
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

	addLeads = addedLead => {
		this.setState(prevState => {
			const { listingInfo } = prevState;
			// TODO: test if-else block
			if (Array.isArray(addedLead)) {
				listingInfo.leads = [...listingInfo.leads, ...addedLead];
			} else {
				listingInfo.leads.push(addedLead);
			}
			return { listingInfo: { ...listingInfo } };
		});
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
				<Tabs className="border p-2 mb-5" tabPosition={this.state.tabPosition}>
					<TabPane tab={<>New Leads<Badge className="ml-1" count={newLeads.length} style={badgeColor}></Badge></>} key="1">
						<NewLeads addLeads={this.addLeads} colLayout={colLayout} emptyJsx={emptyJsx} newLeads={newLeads} updateLeads={this.updateLeads} />
					</TabPane>
					<TabPane tab={<>Follow Ups<Badge className="ml-1" count={followUpLeads.length} style={badgeColor}></Badge></>} key="2">
						<FollowUpLeads colLayout={colLayout} emptyJsx={emptyJsx} followUpLeads={followUpLeads} updateLeads={this.updateLeads} />
					</TabPane>
					<TabPane tab={<>Closed<Badge className="ml-1" count={closedLeads.length} style={badgeColor}></Badge></>} key="3">
						{closedLeads.length === 0 ? emptyJsx :
							closedLeads.map(leadInfo => {
								return <Col className="p-2" key={leadInfo._id} {...colLayout}>
									<NewLeadCard leadInfo={leadInfo} updateLeads={this.updateLeads} />
								</Col>;
							})}
					</TabPane>
					<TabPane tab={<>Excel Upload</>} key="4">
						<ExcelLeadUpload addLeads={this.addLeads} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

// FIXME: memory leak: check wearnings
export default withRouter(Leads);

