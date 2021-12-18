import { alpha } from '@mui/material/styles';

import palette from '../palette';

export default {
	palette: {
		...palette,
		//
		primary: palette.veryPeri,
	},
	fontSizeBase: '14px',
	spacer: '1.5rem',
	transition: {
		duration: '.125s',
	},
	ui: {
		fontFamilyBase: `'Roboto', Verdana, Arial, Helvetica, sans-serif`,
		borderBase: alpha(palette.anthracite, 0.25),
		borderSecondary: alpha(palette.anthracite, 0.05),
	},
	view: {
		color: palette.anthracite,
		bg: palette.cloudDancer,
	},
	header: {
		height: '50px',
		color: palette.anthracite,
		bg: alpha(palette.cloudDancer, 0.75),
		zIndex: 1100,
		backdropBlur: '.5rem',
	},
	footer: {
		height: '2.25rem',
		color: alpha(palette.anthracite, 0.5),
	},
	content: {
		breadcrumbs: {
			color: alpha(palette.anthracite, 0.5),
		},
	},
	sidebar: {
		width: '17rem',
		color: palette.anthracite,
		bg: palette.cloudDancer,
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
			color: palette.veryPeri,
			animation: {
				color_a: palette.veryPeri,
				color_b: alpha(palette.veryPeri, 0.25),
			},
			zIndex: 1750,
		},
		block: {
			height: '100px',
		},
		page: {},
	},
	wysiwyg: {
		border: `1px solid ${alpha(palette.anthracite, 0.25)}`,
		raw: {
			fontSize: '1rem',
			color: palette.light,
			bg: palette.anthracite,
			radius: '0.25rem',
		},
	},
	dataTable: {
		heading: {
			bg: alpha(palette.volcanicGlass, 0.125),
		},
	},
	uploader: {
		outerWrapper: {
			bg: alpha(palette.volcanicGlass, 0.125),
			color: palette.white,
		},
		avatar: {
			size: '40px',
		},
		hiddenDropWrapper: {
			bg: alpha(palette.black, 0.75),
			color: palette.light,
			zIndex: 1250,
		},
		uploader: {
			height: '200px',
			border: `5px dashed ${alpha(palette.anthracite, 0.5)}`,
			radius: '0.5rem',
		},
		othersBlock: {
			bg: alpha(palette.deepTaupe, 0.35),
			color: palette.anthracite,
			border: `5px solid ${alpha(palette.anthracite, 0.5)}`,
			radius: '0.5rem',
		},
		cropper: {
			height: '750px',
			source: {
				bg: alpha(palette.anthracite, 0.9),
			},
			output: {
				bg: alpha(palette.anthracite, 0.9),
				mobile: {
					size: '35vw',
				},
				desktop: {
					size: '15vw',
				},
			},
			options: {
				bg: alpha(palette.cloudDancer, 0.75),
			},
		},
	},
	picker: {
		noItems: {
			border: `1px dashed ${alpha(palette.anthracite, 0.125)}`,
			radius: '0.25rem',
		},
		selected: {
			size: '75px',
			bg: alpha(palette.anthracite, 0.35),
			radius: '0.35rem',
			titleGradient: `linear-gradient(to top, ${palette.anthracite} 0%, ${alpha(
				palette.anthracite,
				0.5,
			)} 70%, ${alpha(palette.anthracite, 0)} 100%)`,
		},
	},
	form: {
		row: {
			label: {
				width: '300px',
			},
			input: {},
		},
	},
	scrollable: {
		barWidth: '30px',
	},
};
