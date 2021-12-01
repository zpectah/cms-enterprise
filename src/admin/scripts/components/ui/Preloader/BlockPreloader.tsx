import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	min-height: 100px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: transparent;
	color: inherit;
`;

interface BlockPreloaderProps {}

const BlockPreloader = ({}: BlockPreloaderProps) => {
	return (
		<Wrapper>
			<CircularProgress color="inherit" />
		</Wrapper>
	);
};

export default BlockPreloader;
