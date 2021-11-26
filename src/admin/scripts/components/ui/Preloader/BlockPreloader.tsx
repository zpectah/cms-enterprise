import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface BlockPreloaderProps {}

const BlockPreloader = ({}: BlockPreloaderProps) => {
	return (
		<Wrapper>
			<CircularProgress color="inherit" />
		</Wrapper>
	);
};

export default BlockPreloader;
