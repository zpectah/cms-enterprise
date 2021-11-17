import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface TileBaseProps {}

const TileBase: React.FC<TileBaseProps> = ({ children }) => {
	return (
		<Wrapper>
			<div>...TileBase...</div>
			<div>{children}</div>
		</Wrapper>
	);
};

export default TileBase;
