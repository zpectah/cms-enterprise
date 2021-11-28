export const getLanguagesFields = (langList: string[] = [], model: any) => {
	const lang = {};

	langList.map((lng) => {
		lang[lng] = model;
	});

	return lang;
};
