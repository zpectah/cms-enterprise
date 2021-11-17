import project from '../../config/project.json';
import environmental from '../../config/environmental.json';

export default {
	// Environment name (development, test, production)
	env: window.APPENV,

	// Build timestamp
	timestamp: window.APPTIMESTAMP,

	// Project configuration object
	project: project,

	// Environmental configuration object
	environmental: environmental[window.APPENV],

	// Temporary configuration
	tmp: {
		languageList: project.web.language.list,
		languageDefault: project.web.language.default,
	},
};
