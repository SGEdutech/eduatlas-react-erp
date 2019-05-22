import React, { Component } from 'react';

import {
	Card,
	Icon,
	Row
} from 'antd';
const { Meta } = Card;

class ResultCard extends Component {
	render() {
		const { facultyInfo, removeFaculty } = this.props;
		return (
			<Card
				actions={[<Icon onClick={() => removeFaculty(facultyInfo)} type="delete" />]}
				cover={<img alt="img" src={facultyInfo.path ? window.URL.createObjectURL(facultyInfo.path.originFileObj): undefined} />}
			>
				<Meta title={facultyInfo.title}
					description={<>
						<Row>Qualification: {facultyInfo.qualification}</Row>
						<Row>Description: {facultyInfo.description}</Row>
					</>} />
			</Card>
		);
	}
}

export default ResultCard;

