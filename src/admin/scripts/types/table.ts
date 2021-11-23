import React from 'react';

export type sortType = 'asc' | 'desc';

export type tableCellAlignType = 'left' | 'center' | 'right';

export type cellTypeItemProps = [tableCellAlignType, string];

export interface cellsTypesProps {
	name?: cellTypeItemProps;
	email?: cellTypeItemProps;
	active?: cellTypeItemProps;
	type?: cellTypeItemProps;
}

export interface tableHeaderCellItemProps {
	id: string;
	label: string;
	align: tableCellAlignType;
	width: string;
}

export interface tableBodyCellItemProps {
	key: string;
	align: tableCellAlignType;
	children: React.ReactElement;
	scope?: 'row';
	padding?: 'checkbox' | 'none' | 'normal';
	element?: 'th' | 'td';
	width: string;
}
