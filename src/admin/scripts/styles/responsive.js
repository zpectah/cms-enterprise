import { PIXEL_COEFFICIENT, RESPONSIVE_BREAKPOINTS } from '../constants';

export const mediaPrefix = (
	media,
	prefix = '@media only screen and',
	unit = 'px',
) => {
	let r = '';

	if (media.min && media.max) {
		r = `${prefix} (min-width: ${media.min}${unit}) and (max-width: ${
			media.max - PIXEL_COEFFICIENT
		}${unit})`;
	} else if (media.min && !media.max) {
		r = `${prefix} (min-width: ${media.min}${unit})`;
	} else if (!media.min && media.max) {
		r = `${prefix} (max-width: ${media.max - PIXEL_COEFFICIENT}${unit})`;
	}

	return r;
};

const media = {
	min: {
		sm: mediaPrefix({ min: RESPONSIVE_BREAKPOINTS.sm }),
		md: mediaPrefix({ min: RESPONSIVE_BREAKPOINTS.md }),
		lg: mediaPrefix({ min: RESPONSIVE_BREAKPOINTS.lg }),
		xl: mediaPrefix({ min: RESPONSIVE_BREAKPOINTS.xl }),
		xxl: mediaPrefix({ min: RESPONSIVE_BREAKPOINTS.xxl }),
	},
	max: {
		sm: mediaPrefix({ max: RESPONSIVE_BREAKPOINTS.sm }),
		md: mediaPrefix({ max: RESPONSIVE_BREAKPOINTS.md }),
		lg: mediaPrefix({ max: RESPONSIVE_BREAKPOINTS.lg }),
		xl: mediaPrefix({ max: RESPONSIVE_BREAKPOINTS.xl }),
		xxl: mediaPrefix({ max: RESPONSIVE_BREAKPOINTS.xxl }),
	},
	only: {
		xs: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.xs,
			max: RESPONSIVE_BREAKPOINTS.sm,
		}),
		sm: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.sm,
			max: RESPONSIVE_BREAKPOINTS.md,
		}),
		md: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.md,
			max: RESPONSIVE_BREAKPOINTS.lg,
		}),
		lg: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.lg,
			max: RESPONSIVE_BREAKPOINTS.xl,
		}),
		xl: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.xl,
			max: RESPONSIVE_BREAKPOINTS.xxl,
		}),
		xxl: mediaPrefix({
			min: RESPONSIVE_BREAKPOINTS.xxl,
		}),
	},
	between: {
		xs: {
			md: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.xs,
				max: RESPONSIVE_BREAKPOINTS.md,
			}),
			lg: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.xs,
				max: RESPONSIVE_BREAKPOINTS.lg,
			}),
			xl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.xs,
				max: RESPONSIVE_BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.xs,
				max: RESPONSIVE_BREAKPOINTS.xxl,
			}),
		},
		sm: {
			lg: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.sm,
				max: RESPONSIVE_BREAKPOINTS.lg,
			}),
			xl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.sm,
				max: RESPONSIVE_BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.sm,
				max: RESPONSIVE_BREAKPOINTS.xxl,
			}),
		},
		md: {
			xl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.md,
				max: RESPONSIVE_BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.md,
				max: RESPONSIVE_BREAKPOINTS.xxl,
			}),
		},
		lg: {
			xxl: mediaPrefix({
				min: RESPONSIVE_BREAKPOINTS.lg,
				max: RESPONSIVE_BREAKPOINTS.xxl,
			}),
		},
	},
};

export default media;
