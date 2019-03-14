import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import TuitionCards from '../components/TuitionCards';

class ErpManager extends Component {
	render() {
		return (
			<>
				<Navbar />
				<div className="container">
					<TuitionCards />
				</div>
			</>
		);
	}
}

export default ErpManager;

