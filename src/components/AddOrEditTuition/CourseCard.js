import moment from 'moment';
import React, { Component } from 'react';

import {
	Card,
	Col,
	Icon,
	Row
} from 'antd';

class CourseCard extends Component {
	render() {
		const { courseInfo, removeCourse } = this.props;
		return (
			<Card
				actions={[<Icon onClick={() => removeCourse(courseInfo)} type="delete" />]}
				className="h-100"
				onClick={this.handleTuitionAddClick}
				title={courseInfo.title}
			>
				<Row>
					<Col span={10}>
						Age:
					</Col>
					<Col className="one-line-ellipsis" span={12}>
						{courseInfo.ageGroup}
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						Duration:
					</Col>
					<Col className="one-line-ellipsis" span={12}>
						{courseInfo.duration}
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						Fee:
					</Col>
					<Col className="one-line-ellipsis" span={12}>
						{courseInfo.fee}
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						Next Batch:
					</Col>
					<Col className="one-line-ellipsis" span={12}>
						{courseInfo.nextBatch && moment(courseInfo.nextBatch).format('DD/MM/YY')}
					</Col>
				</Row>
			</Card>
		);
	}
}

export default CourseCard;

