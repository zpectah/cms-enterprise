import React from 'react';

export type sortType = 'asc' | 'desc';
export type tableCellAlignType = 'left' | 'center' | 'right';
export type cellTypeItemProps = [tableCellAlignType, string];
export interface cellsTypesProps {
	[k: string]: cellTypeItemProps;
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
	numeric?: boolean;
}
export interface customActionCellItemProps {
	key: 'post_create_from_template' | 'order_confirm' | 'order_cancel';
	label: string;
	callback: (id: number | string) => void;
	disabled: boolean;
}
export type selectedArrayProps = (number | string)[];
export type selectedItemsProps = readonly (number | string)[];
export type confirmDialogTypeProps = 'delete' | 'formDirty' | null;
