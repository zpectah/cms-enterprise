import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

import { Typography } from '../../ui';
import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.div<{ textAlign: ContentTitleProps['textAlign'] }>`
	min-height: 80px;
	padding-top: ${(props) => props.theme.spacer};
	padding-bottom: ${(props) => props.theme.spacer};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	text-align: ${(props) => props.textAlign};
`;

interface ContentTitleProps {
	id?: string;
	title?: string;
	textAlign?: 'inherit' | 'center';
	listPath?: string;
	clickCallback?: () => void;
	backButtondataTestId?: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({
	children,
	id,
	title,
	textAlign = 'inherit',
	listPath,
	clickCallback,
	backButtondataTestId = 'page.title.button.back',
}) => {
	const history = useHistory();
	const params: any = useParams();
	const [detail, setDetail] = useState(null);

	const backButtonHandler = () => {
		if (clickCallback) {
			clickCallback();
		} else {
			history.push(listPath);
		}
	};

	useEffect(() => {
		if (listPath) setDetail(params.id);
	}, [params.id]);

	return (
		<Wrapper textAlign={textAlign}>
			{detail && (
				<IconButton
					aria-label="delete"
					onClick={backButtonHandler}
					style={{ marginRight: '0.75rem' }}
					{...getElTestAttr(backButtondataTestId)}
				>
					<ArrowBackIcon />
				</IconButton>
			)}
			{children ? (
				<>{children}</>
			) : (
				<Typography.Title id={id} h1>
					{title}
				</Typography.Title>
			)}
		</Wrapper>
	);
};

export default ContentTitle;
