import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import { toastItemProps } from '../../types/store';
import { getElTestAttr } from '../../utils/tests';

interface ToastItemProps {
	data: toastItemProps;
	onRemove: (id: string) => void;
}
interface ToastListProps {
	items: toastItemProps[];
	onRemove: (id: string) => void;
}

const ItemWrapper = styled.article<{ context: toastItemProps['context'] }>`
	height: auto;
	padding: 1rem;
	margin: 0 0 0.35rem;
	display: flex;
	position: relative;
	border-radius: 0.25rem;

	${(props) =>
		props.context == 'default' &&
		`
		color: ${props.theme.toasts.default.color};
		background-color: ${props.theme.toasts.default.bg};
	`}
	${(props) =>
		props.context == 'success' &&
		`
		color: ${props.theme.toasts.success.color};
		background-color: ${props.theme.toasts.success.bg};
	`}
	${(props) =>
		props.context == 'error' &&
		`
		color: ${props.theme.toasts.error.color};
		background-color: ${props.theme.toasts.error.bg};
	`}
`;
const ListWrapper = styled.div`
	width: 300px;
	height: 0;
	position: fixed;
	overflow: visible;
	top: calc(${(props) => props.theme.header.height} + 0.35rem);
	right: 0.35rem;
	z-index: ${(props) => props.theme.toasts.zIndex};
`;
const ListInner = styled.div``;

const ToastItem = ({ data, onRemove }: ToastItemProps) => {
	useEffect(() => {
		if (data.timeout) setTimeout(() => onRemove(data.id), data.timeout);
	}, [data.timeout]);

	return (
		<ItemWrapper
			className="toast-item"
			context={data.context}
			id={data.id}
			{...getElTestAttr(`toast.item`)}
		>
			{data.title}
			<IconButton
				aria-label="close"
				onClick={() => onRemove(data.id)}
				sx={{
					position: 'absolute',
					right: 2,
					top: 2,
					color: 'inherit',
				}}
				{...getElTestAttr(`toast.item.button.close`)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</ItemWrapper>
	);
};

const ToastList = ({ items, onRemove }: ToastListProps) => {
	return (
		<ListWrapper>
			<ListInner>
				{items.map((item) => (
					<ToastItem onRemove={onRemove} data={item} key={item.id} />
				))}
			</ListInner>
		</ListWrapper>
	);
};

export default ToastList;
