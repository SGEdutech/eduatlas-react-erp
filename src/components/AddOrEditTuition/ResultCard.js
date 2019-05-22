import React, { Component } from 'react';

import {
	Card,
	Icon
} from 'antd';
const { Meta } = Card;

class ResultCard extends Component {
	render() {
		const { resultInfo, removeResult } = this.props;
		return (
			<Card
				actions={[<Icon onClick={() => removeResult(resultInfo)} type="delete" />]}
				cover={<img alt="img" src={resultInfo.cover ? window.URL.createObjectURL(resultInfo.cover.originFileObj) : undefined} />}
			>
				<Meta title={resultInfo.title} description={resultInfo.description} />
			</Card>
		);
	}
}

export default ResultCard;

