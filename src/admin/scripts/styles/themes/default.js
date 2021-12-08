import palette from '../palette';

export default {
	palette: {
		...palette,
		//
		primary: palette.indigo,
	},
	fontSizeBase: '14px',
	spacer: '1.5rem',
	transition: {
		duration: '.125s',
	},
	ui: {
		borderBase: 'rgba(150,150,150,.35)',
		borderSecondary: 'rgba(150,150,150,.125)',
	},
	view: {
		color: palette.dark,
		bg: palette.light,
	},
	header: {
		height: '50px',
		color: palette.dark,
		bg: palette._light,
		zIndex: 1100,
		backdropBlur: '.5rem',
	},
	footer: {
		height: '2.25rem',
		color: 'rgba(100,100,100,.75)',
	},
	content: {
		breadcrumbs: {
			color: 'rgba(100,100,100,.75)',
		},
	},
	sidebar: {
		width: '17rem',
		color: palette.dark,
		bg: palette.light,
		zIndex: 1050,
	},
	drawer: {
		header: {
			height: '62px',
		},
	},
	toasts: {
		zIndex: 1995,
		width: '300px',
		default: {
			color: palette.white,
			bg: palette.grey,
		},
		success: {
			color: palette.white,
			bg: palette.green,
		},
		error: {
			color: palette.white,
			bg: palette.red,
		},
	},
	preloader: {
		bar: {
			height: '3px',
			color: palette.indigo,
			animation: {
				color_a: palette.indigo,
				color_b: 'rgba(48,63,159,.5)',
			},
			zIndex: 1750,
		},
		block: {},
		page: {},
	},
};
