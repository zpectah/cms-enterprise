import palette from '../palette';

export default {
	color: palette,
	fontSizeBase: '14px',
	spacer: '1.5rem',
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
		bg: palette.light,
		zIndex: 1100,
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
};
