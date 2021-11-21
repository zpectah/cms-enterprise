export default (optionsArray: string[], t: any) => {
	let options = [];

	optionsArray.map((type) => {
		options.push({
			label: t(`types:${type}`),
			value: type,
		});
	});

	return options;
};
