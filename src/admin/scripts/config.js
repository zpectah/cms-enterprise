import project from '../../config/project.json';
import environmental from '../../config/environmental.json';
import options from '../../config/options.json';

export default {
	// Environment name (development, test, production)
	env: window.APPENV,

	// Build timestamp
	timestamp: window.APPTIMESTAMP,

	// Temporary token
	tmp_token: window.TMP_TOKEN,

	// Temporary token
	user_token: window.USER_TOKEN,

	// Project configuration object
	project: project,

	// Project options object
	options: options,

	// Environmental configuration object
	environmental: environmental[window.APPENV],

	// Temporary configuration
	tmp: {
		languageList: project.web.language.list,
		languageDefault: project.web.language.default,
	},
};
