export default obj => {
	const keys = Object.keys(obj);
	keys.forEach(key => {
		const value = obj[key];
		if (Boolean(value) === false) delete obj[key];
	});
};
