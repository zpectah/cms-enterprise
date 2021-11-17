import project from '../../config/project.json';
import environmental from '../../config/environmental.json';

export default {
	env: window.APPENV, // Environment name (development, test, production)
	timestamp: window.APPTIMESTAMP, // Build timestamp
	project: project, // Project configuration object
	environmental: environmental[window.APPENV], // Environmental configuration object

	// Mapbox configuration
	mapbox: {
		token: project.private.mapboxToken,
		defaultLocation: {
			longitude: 14.501273600376752,
			latitude: 50.08322927731517,
			zoom: 10,
		},
	},

	// Temporary configuration
	tmp: {
		languageList: ['en'],
		languageDefault: 'en',
	},
};
