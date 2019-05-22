import React, { Component } from 'react';

import {
	Card,
	Icon
} from 'antd';
const { Meta } = Card;

class GalleryCard extends Component {
	render() {
		const { imageInfo, removeGallery } = this.props;
		return (
			<Card
				actions={[<Icon onClick={() => removeGallery(imageInfo)} type="delete" />]}
				cover={<img alt="img" src={window.URL.createObjectURL(imageInfo.path.originFileObj)} />}
			>
				<Meta title={imageInfo.imageName} description={<>Album: {imageInfo.album}</>} />
			</Card>
		);
	}
}

export default GalleryCard;

