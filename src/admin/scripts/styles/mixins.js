import { css } from 'styled-components';

export const layoutOuterWrapper = css`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	color: ${(props) => props.theme.view.color};
	background-color: ${(props) => props.theme.view.bg};
`;

export const layoutInnerWrapper = css`
	display: flex;
	flex: 1;
`;

export const layoutContent = css`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const layoutContentInner = css`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
