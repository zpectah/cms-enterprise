import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

import { Typography, IconButton } from '../../ui';

const Wrapper = styled.div<{ textAlign: ContentTitleProps['textAlign'] }>`
	min-height: 85px;
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
	backButtonDataTestId?: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({
	children,
	id,
	title,
	textAlign = 'inherit',
	listPath,
	clickCallback,
	backButtonDataTestId = 'page.title.button.back',
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
					dataTestId={backButtonDataTestId}
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
