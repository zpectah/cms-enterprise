import palette from '../palette';

export default {
	palette: palette,
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
			height: '60px',
		},
	},
};
