import project from '../../config/project.json';
import environmental from '../../config/environmental.json';

export default {
	env: window.APPENV,
	timestamp: window.APPTIMESTAMP,
	project: project,
	environmental: environmental[window.APPENV],
	mapbox: {
		token: project.private.mapboxToken,
		defaultLocation: {
			longitude: 14.501273600376752,
			latitude: 50.08322927731517,
			zoom: 10,
		},
	},
};
