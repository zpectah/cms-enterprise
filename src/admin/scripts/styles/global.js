import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: ${(props) => props.theme.fontSizeBase};
	}
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: 'Roboto', Verdana, Arial, Helvetica, sans-serif;
		font-size: 1rem;
		color: ${(props) => props.theme.view.color};
	}
	
	/* Fixes and alignment */
	
	.MuiFormControlLabel-label{
	    padding-left: calc(${(props) => props.theme.spacer} / 2);
	}
	
`;
