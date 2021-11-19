import React from 'react';

export type sortType = 'asc' | 'desc';

export type tableCellAlignType = 'left' | 'center' | 'right';

export interface cellsTypesProps {
	name?: [tableCellAlignType, string];
	active?: [tableCellAlignType, string];
}

export interface tableHeaderCellItemProps {
	id: string;
	numeric: boolean;
	disablePadding: boolean;
	label: string;
	align: tableCellAlignType;
	width: string;
}

export interface tableBodyCellItemProps {
	key: string;
	align: tableCellAlignType;
	content: React.ReactElement;
	scope?: 'row';
	padding?: 'checkbox' | 'none' | 'normal';
	element?: 'th' | 'td';
	width: string;
}
