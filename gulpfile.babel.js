import { src, dest, series, watch as gulpWatch } from 'gulp';
import colors from 'colors';
import del from 'del';
import browserify from 'browserify';
import tsify from 'tsify';
import vinylSource from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import gulpReplace from 'gulp-replace';
import gulpRename from 'gulp-rename';
import gulpJsonMinify from 'gulp-jsonminify';
import gulpImageMin from 'gulp-image';
import babelify from 'babelify';
import gulpUglify from 'gulp-uglify';
import gulpSourceMaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import gulpHtmlMin from 'gulp-htmlmin';
import gulpCleanCss from 'gulp-clean-css';
import gulpCssImport from 'gulp-cssimport';

const sass = require('gulp-sass')(require('sass'));

import CONF from './gulp.config';
import { date } from './utils/utils';

const getMessage = (text) => {
	let s =
		`[`.white +
		`${date.getTodayObject().hour}:${date.getTodayObject().minute}:${
			date.getTodayObject().second
		}`.gray +
		`]`.white;

	console.log(s + text);
};
const printMessage = (development, taskName, end = false, app = 'all') => {
	let timer =
		`[` +
		`${date.getTodayObject().hour}:${date.getTodayObject().minute}:${
			date.getTodayObject().second
		}`.gray +
		`] `;
	let dev = `[` + `${development}`.cyan + `]`;
	let application = `[` + `${app.toUpperCase()}`.cyan + `]`;
	let task = `[` + `${taskName}`.magenta + `]`;
	let f = timer + dev + application + task + ` ... `;

	if (end) {
		f = f + `done`.green;
	}

	console.log(f);
};

const ROOT = CONF.PATH.BASE;
const ALL = '**/*';

const Options = {
	gulpJsonMinify: {},
	gulpImageMin: {},
	Scripts: {
		babelify: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
			plugins: ['@babel/plugin-transform-runtime'],
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		sourcemaps: {
			largeFile: true,
		},
	},
	Html: {
		htmlMin: {
			collapseWhitespace: true,
			removeComments: true,
		},
	},
	Styles: {
		cleanCss: {
			compatibility: 'ie9',
		},
		rename: {
			suffix: '.min',
		},
	},
	Watch: {},
};
const Sources = {
	Php: [
		ROOT + CONF.PATH.SRC + '**/*.php',
		ROOT + CONF.PATH.SRC + '**/.htaccess',
		ROOT + CONF.PATH.SRC + '**/*.xml',
		ROOT + CONF.PATH.SRC + '**/*.txt',
	],
	Images: ROOT + CONF.PATH.SRC + CONF.FOLDER.IMAGES + ALL,
	Json: [
		`${ROOT + CONF.PATH.SRC}**/*.json`,
		`!${ROOT + CONF.PATH.SRC}**/${CONF.FOLDER.SCRIPTS}**/*.json`,
	],
	Scripts: {
		admin: [
			ROOT +
				CONF.PATH.SRC +
				CONF.FOLDER.ADMIN +
				CONF.FOLDER.SCRIPTS +
				CONF.SCRIPTS.INPUT,
		],
		web: [
			ROOT +
				CONF.PATH.SRC +
				CONF.FOLDER.WEB +
				CONF.FOLDER.SCRIPTS +
				CONF.SCRIPTS.INPUT,
		],
	},
	Scripts2Watch: {
		admin: [
			ROOT + CONF.PATH.SRC + CONF.FOLDER.ADMIN + '**/*.js',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.ADMIN + '**/*.jsx',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.ADMIN + '**/*.ts',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.ADMIN + '**/*.tsx',
			`${ROOT + CONF.PATH.SRC + CONF.FOLDER.ADMIN}**/${
				CONF.FOLDER.SCRIPTS
			}**/*.json`,
		],
		web: [
			ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB + '**/*.js',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB + '**/*.jsx',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB + '**/*.ts',
			ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB + '**/*.tsx',
			`${ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB}**/${
				CONF.FOLDER.SCRIPTS
			}**/*.json`,
		],
	},
	Styles: {
		web: [
			ROOT +
				CONF.PATH.SRC +
				CONF.FOLDER.WEB +
				CONF.FOLDER.STYLES +
				CONF.STYLES.INPUT,
		],
	},
	Styles2Watch: {
		web: [ROOT + CONF.PATH.SRC + CONF.FOLDER.WEB + CONF.FOLDER.STYLES + '**/*'],
	},
	Html: [ROOT + CONF.PATH.SRC + '**/*.html', ROOT + CONF.PATH.SRC + '**/*.htm'],
};

const TaskDef = {
	Clean: (path, env, cb) => {
		process.env.NODE_ENV = env;
		return del.sync(
			[
				path + '**/*',
				`!` + path + CONF.FOLDER.LOGS + `**/*`,
				`!` + path + CONF.FOLDER.UPLOADS + `**/*`,
			],
			cb(printMessage(env, 'Clean', true)),
		);
	},
	Environment: (path, env, cb) => {
		src(ROOT + CONF.ENV.INPUT)
			.pipe(gulpReplace(CONF.KEY.ENV_ENV, env))
			.pipe(gulpReplace(CONF.KEY.ENV_TIMESTAMP, date.getTimestampString()))
			.pipe(gulpRename(CONF.ENV.OUTPUT))
			.pipe(dest(path + CONF.FOLDER.CONFIG));
		cb(printMessage(env, 'Environment', true));
	},
	Php: (path, env, cb) => {
		src(Sources.Php).pipe(dest(path));
		cb(printMessage(env, 'PHP', true));
	},
	Images: (path, env, cb) => {
		src(Sources.Images)
			.pipe(
				gulpIf(
					env !== CONF.ENVIRONMENT.DEV,
					gulpImageMin(Options.gulpImageMin),
				),
			)
			.pipe(dest(path + CONF.FOLDER.IMAGES));
		cb(printMessage(env, 'Images', true));
	},
	Json: (path, env, cb) => {
		src(Sources.Json)
			.pipe(
				gulpIf(
					env !== CONF.ENVIRONMENT.DEV,
					gulpJsonMinify(Options.gulpJsonMinify),
				),
			)
			.pipe(dest(path));
		cb(printMessage(env, 'JSON', true));
	},
	Scripts: (path, env, app = 'admin', cb) => {
		browserify({
			entries: Sources.Scripts[app],
			extensions: Options.Scripts.extensions,
		})
			.plugin(tsify)
			.transform(babelify.configure(Options.Scripts.babelify))
			.bundle()
			.pipe(vinylSource(CONF.SCRIPTS.OUTPUT))
			.pipe(
				gulpIf(env !== CONF.ENVIRONMENT.DEV, dest(path + CONF.FOLDER.SCRIPTS)),
			)
			.pipe(gulpIf(env !== CONF.ENVIRONMENT.DEV, vinylBuffer()))
			.pipe(
				gulpIf(
					env !== CONF.ENVIRONMENT.DEV,
					gulpSourceMaps.init(Options.Scripts.sourcemaps),
				),
			)
			.pipe(
				gulpIf(
					env !== CONF.ENVIRONMENT.DEV,
					gulpRename({ extname: '.min.js' }),
				),
			)
			.pipe(gulpIf(env !== CONF.ENVIRONMENT.DEV, gulpUglify()))
			.pipe(gulpIf(env !== CONF.ENVIRONMENT.DEV, gulpSourceMaps.write()))
			.pipe(dest(path + CONF.FOLDER.SCRIPTS));
		cb(printMessage(env, 'Scripts', true, app));
	},
	Styles: (path, env, app = 'web', cb) => {
		src(Sources.Styles[app])
			.pipe(gulpSourceMaps.init({}))
			.pipe(sass({}).on('error', sass.logError))
			.pipe(gulpCssImport({}))
			.pipe(
				gulpIf(env !== CONF.ENVIRONMENT.DEV, dest(path + CONF.FOLDER.STYLES)),
			)
			.pipe(
				gulpIf(
					env !== CONF.ENVIRONMENT.DEV,
					gulpCleanCss(Options.Styles.cleanCss),
				),
			)
			.pipe(
				gulpIf(env !== CONF.ENVIRONMENT.DEV, gulpRename(Options.Styles.rename)),
			)
			.pipe(gulpIf(env !== CONF.ENVIRONMENT.DEV, gulpSourceMaps.write()))
			.pipe(dest(path + CONF.FOLDER.STYLES));
		cb(printMessage(env, 'Styles', true, app));
	},
	Html: (path, env, cb) => {
		src(Sources.Html)
			.pipe(
				gulpIf(env !== CONF.ENVIRONMENT.DEV, gulpHtmlMin(Options.Html.htmlMin)),
			)
			.pipe(dest(path));
		cb(printMessage(env, 'HTML', true));
	},
};

const Tasks = {
	Clean: {
		DEV: (cb) => TaskDef.Clean(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) =>
			TaskDef.Clean(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) =>
			TaskDef.Clean(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Environment: {
		DEV: (cb) =>
			TaskDef.Environment(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) =>
			TaskDef.Environment(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) =>
			TaskDef.Environment(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Php: {
		DEV: (cb) => TaskDef.Php(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) => TaskDef.Php(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) => TaskDef.Php(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Images: {
		DEV: (cb) => TaskDef.Images(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) =>
			TaskDef.Images(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) =>
			TaskDef.Images(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Json: {
		DEV: (cb) => TaskDef.Json(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) =>
			TaskDef.Json(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) =>
			TaskDef.Json(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Html: {
		DEV: (cb) => TaskDef.Html(ROOT + CONF.PATH.DEV, CONF.ENVIRONMENT.DEV, cb),
		TEST: (cb) =>
			TaskDef.Html(ROOT + CONF.PATH.TEST, CONF.ENVIRONMENT.TEST, cb),
		PROD: (cb) =>
			TaskDef.Html(ROOT + CONF.PATH.PROD, CONF.ENVIRONMENT.PROD, cb),
	},
	Scripts: {
		admin: {
			DEV: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.DEV + CONF.FOLDER.ADMIN,
					CONF.ENVIRONMENT.DEV,
					'admin',
					cb,
				),
			TEST: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.TEST + CONF.FOLDER.ADMIN,
					CONF.ENVIRONMENT.TEST,
					'admin',
					cb,
				),
			PROD: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.PROD + CONF.FOLDER.ADMIN,
					CONF.ENVIRONMENT.PROD,
					'admin',
					cb,
				),
		},
		web: {
			DEV: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.DEV + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.DEV,
					'web',
					cb,
				),
			TEST: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.TEST + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.TEST,
					'web',
					cb,
				),
			PROD: (cb) =>
				TaskDef.Scripts(
					ROOT + CONF.PATH.PROD + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.PROD,
					'web',
					cb,
				),
		},
	},
	Styles: {
		web: {
			DEV: (cb) =>
				TaskDef.Styles(
					ROOT + CONF.PATH.DEV + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.DEV,
					'web',
					cb,
				),
			TEST: (cb) =>
				TaskDef.Styles(
					ROOT + CONF.PATH.TEST + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.TEST,
					'web',
					cb,
				),
			PROD: (cb) =>
				TaskDef.Styles(
					ROOT + CONF.PATH.PROD + CONF.FOLDER.WEB,
					CONF.ENVIRONMENT.PROD,
					'web',
					cb,
				),
		},
	},
};

const taskWatch = (cb) => {
	gulpWatch(Sources.Php, Options.Watch, Tasks.Php.DEV);
	gulpWatch(Sources.Images, Options.Watch, Tasks.Images.DEV);
	gulpWatch(Sources.Json, Options.Watch, Tasks.Json.DEV);
	gulpWatch(
		[...Sources.Scripts2Watch.admin],
		Options.Watch,
		Tasks.Scripts.admin.DEV,
	);
	gulpWatch(
		[...Sources.Scripts2Watch.web],
		Options.Watch,
		Tasks.Scripts.web.DEV,
	);
	gulpWatch([...Sources.Styles2Watch.web], Options.Watch, Tasks.Styles.web.DEV);
	gulpWatch(Sources.Html, Options.Watch, Tasks.Html.DEV);

	cb(
		getMessage(
			` Watching changes in project structure. You should reload browser manually.`
				.yellow,
		),
	);
};

const dev = series(
	Tasks.Clean.DEV,
	series(
		Tasks.Php.DEV,
		Tasks.Json.DEV,
		Tasks.Images.DEV,
		Tasks.Scripts.admin.DEV,
		Tasks.Scripts.web.DEV,
		Tasks.Styles.web.DEV,
		Tasks.Html.DEV,
	),
	Tasks.Environment.DEV,
);
export const test = series(
	Tasks.Clean.TEST,
	series(
		Tasks.Php.TEST,
		Tasks.Json.TEST,
		Tasks.Images.TEST,
		Tasks.Scripts.admin.TEST,
		Tasks.Scripts.web.TEST,
		Tasks.Styles.web.TEST,
		Tasks.Html.TEST,
	),
	Tasks.Environment.TEST,
);
export const prod = series(
	Tasks.Clean.PROD,
	series(
		Tasks.Php.PROD,
		Tasks.Json.PROD,
		Tasks.Images.PROD,
		Tasks.Scripts.admin.PROD,
		Tasks.Scripts.web.PROD,
		Tasks.Styles.web.PROD,
		Tasks.Html.PROD,
	),
	Tasks.Environment.PROD,
);

export const start = series(dev, taskWatch);

export default dev;
