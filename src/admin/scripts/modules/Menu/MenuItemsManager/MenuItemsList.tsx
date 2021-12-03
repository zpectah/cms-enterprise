import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { MenuItemItemProps } from '../../../types/model';
import { Button, Typography } from '../../../components/ui';

const Wrapper = styled.div`
	padding-top: ${(props) => props.theme.spacer};
`;
const StyledLabel = styled(Typography.Title)<{ disabled: boolean }>`
	padding-left: calc(${(props) => props.theme.spacer} / 2);
	padding-right: calc(${(props) => props.theme.spacer} / 2);
	opacity: ${(props) => (props.disabled ? '0.5' : '1')};
	cursor: pointer;
`;
const StyledCardInnerBlock = styled.div`
	padding: calc(${(props) => props.theme.spacer} / 2);
`;
const StyledCardInnerActionBlock = styled(StyledCardInnerBlock)`
	opacity: 0;
`;
const StyledCardInner = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover ${StyledCardInnerActionBlock} {
		opacity: 1;
	}
`;
const ItemChildrenWrapper = styled.div`
	width: 100%;
	padding: calc(${(props) => props.theme.spacer} / 2) 0
		calc(${(props) => props.theme.spacer} / 2) ${(props) => props.theme.spacer};
`;

interface MenuItemsListProps {
	menuId: string | number;
	items: MenuItemItemProps[];
	onEdit: (id: number | string) => void;
	onToggle: (id: number | string) => void;
	onDelete: (id: number | string) => void;
}

const MenuItemsList = ({
	menuId,
	items,
	onEdit,
	onToggle,
	onDelete,
}: MenuItemsListProps) => {
	const { t } = useTranslation(['common']);
	const [listItems, setListItems] = useState([]);

	const getItemsList = (items: MenuItemItemProps[]) => {
		let a = [];

		items.map((menuItem) => {
			if (
				menuItem.menu == menuId &&
				(!menuItem.parent || menuItem.parent == '')
			)
				a.push(menuItem);
		});

		return a;
	};

	const getItemChildren = (id: number | string) => {
		let a = [];

		items.map((item) => {
			if (item.parent == id) a.push(item);
		});

		return a;
	};

	const renderItem = (item: MenuItemItemProps, sub: MenuItemItemProps[]) => {
		return (
			<div key={item.id}>
				<Card>
					<StyledCardInner>
						<StyledCardInnerBlock>
							<StyledLabel
								h5
								disabled={!item.active}
								onClick={() => onEdit(item.id)}
							>
								{item.name}
							</StyledLabel>
						</StyledCardInnerBlock>
						<StyledCardInnerActionBlock>
							<Button onClick={() => onEdit(item.id)}>
								{t('button.edit')}
							</Button>
							<Button onClick={() => onToggle(item.id)}>
								{t('button.toggle')}
							</Button>
							<Button color="error" onClick={() => onDelete(item.id)}>
								{t('button.delete')}
							</Button>
						</StyledCardInnerActionBlock>
					</StyledCardInner>
				</Card>
				{sub && <ItemChildrenWrapper>{sub}</ItemChildrenWrapper>}
			</div>
		);
	};

	const renderList = (items: MenuItemItemProps[]) => {
		items.sort(function (a, b) {
			let valA = a.item_order;
			let valB = b.item_order;

			if (valA < valB) return -1;
			if (valA > valB) return 1;
			return 0;
		});

		return (
			<>
				{items.map((item) =>
					renderItem(item, renderList(getItemChildren(item.id))),
				)}
			</>
		);
	};

	return <Wrapper>{renderList(getItemsList(items))}</Wrapper>;
};

export default MenuItemsList;
