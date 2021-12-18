import React, { useCallback, useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { isDesktop } from 'react-device-detect';
import styled from 'styled-components';

import config from '../../config';
import { useUploads } from '../../hooks/model';
import { Button, Dialog, IconButton } from '../ui';
import { getElTestAttr } from '../../utils/tests';
import getPickerInitialValue from '../../utils/getPickerInitialValue';

const SelectedListWrapper = styled.div`
	width: 100%;
	height: auto;
	margin-top: calc(${(props) => props.theme.spacer} / 2);
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;
const SelectedListItem = styled.div<{ isImage: boolean }>`
	width: ${(props) =>
		props.isImage
			? props.theme.picker.selected.size
			: `calc(${props.theme.picker.selected.size} * 2)`};
	height: ${(props) => props.theme.picker.selected.size};
	margin: 0 calc(${(props) => props.theme.spacer} / 2)
		calc(${(props) => props.theme.spacer} / 2) 0;
	position: relative;
	overflow: hidden;
	background-color: ${(props) => props.theme.picker.selected.bg};
	border-radius: ${(props) => props.theme.picker.selected.radius};
`;
const SelectedItemImage = styled.img`
	max-width: 100%;
	height: auto;
	max-height: 100%;
	display: block;
`;
const SelectedItemFile = styled.article`
	width: ${(props) => `calc(${props.theme.picker.selected.size} * 2)`};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;
	overflow: hidden;
`;
const StyledImageListItemBar = styled(ImageListItemBar)`
	background: transparent;
`;
const StyledImageListItemBarBottom = styled(ImageListItemBar)`
	background: ${(props) => props.theme.picker.selected.titleGradient};
`;
const StyledImage = styled.img`
	max-width: 100%;
	height: auto;
	max-height: 100%;
`;
const StyledFile = styled.span`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.picker.selected.bg};
`;

interface UploadsPickerProps {
	value: (number | string)[] | string;
	onChange: (value: (number | string)[] | string) => void;
	onlyImages?: boolean;
	multiple?: boolean;
	filenameAsValue?: boolean;
	dataTestId?: string;
	required?: boolean;
	label?: string;
}

const UploadsPicker = ({
	value,
	onChange,
	onlyImages,
	multiple,
	filenameAsValue,
	dataTestId = 'UploadsPicker.default',
	required,
	label,
}: UploadsPickerProps) => {
	const { t } = useTranslation(['common', 'form', 'components']);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState(
		getPickerInitialValue(value),
	);
	const [selectedObjects, setSelectedObjects] = useState([]);

	const { Uploads } = useUploads();

	const clickHandler = (id: string | number, filename: string) => {
		let key = filenameAsValue ? filename : id;
		let tmp = [...selectedItems];
		let index = tmp.indexOf(key);
		if (index > -1) {
			tmp.splice(index, 1);
		} else {
			if (!multiple) tmp = [];
			tmp.push(key);
		}
		setSelectedItems(tmp);
	};

	const isSelected = (id: string | number, filename: string) => {
		let key = filenameAsValue ? filename : id;
		let index = selectedItems.indexOf(key);

		return index > -1;
	};

	const getItem = (id: string | number) =>
		Uploads.find((item) =>
			filenameAsValue ? item?.file_name == id : item?.id == id,
		);

	const updateSelectedObjects = () => {
		let tmp = [];
		let tmp_selected = [...selectedItems];
		tmp_selected.map((item) => {
			if (item) tmp.push(getItem(item));
		});
		setSelectedObjects(tmp);
		if (multiple) {
			onChange(tmp_selected);
		} else {
			if (tmp_selected[0]) onChange(tmp_selected[0] as string);
		}
	};

	const clearHandler = () => {
		setSelectedItems([]);
		setSelectedObjects([]);
		if (multiple) {
			onChange([]);
		} else {
			onChange('');
		}
	};

	useEffect(() => {
		if (Uploads) updateSelectedObjects();
	}, [Uploads, selectedItems]);

	return (
		<div {...getElTestAttr(dataTestId)}>
			<Stack spacing={1} direction="row">
				<Button
					variant="contained"
					color="secondary"
					onClick={() => setDialogOpen(true)}
					dataTestId={`${dataTestId}.trigger.open`}
					size="small"
				>
					{label ? label : t('button.open')}
					{required && `  *`}
				</Button>
				<Button
					variant="outlined"
					color="error"
					onClick={clearHandler}
					dataTestId={`${dataTestId}.trigger.clearAll`}
					disabled={!(selectedItems && selectedItems.length > 0)}
					size="small"
				>
					{t('button.clear')}
				</Button>
			</Stack>
			<SelectedListWrapper>
				{selectedObjects &&
					selectedObjects.map((item) => {
						return (
							<SelectedListItem key={item.id} isImage={item.type == 'image'}>
								{item.type == 'image' ? (
									<SelectedItemImage
										src={`/${config.project.path.uploads}image/thumbnail/${item.file_name}`}
										alt={item.name}
										loading="lazy"
									/>
								) : (
									<SelectedItemFile>
										<small>{item.type}</small>
										<span>{item.file_name}</span>
									</SelectedItemFile>
								)}
							</SelectedListItem>
						);
					})}
			</SelectedListWrapper>
			<Dialog
				isOpen={dialogOpen}
				onClose={() => setDialogOpen(false)}
				titleChildren={
					<>{label ? label : t('components:UploadsPicker.title')}</>
				}
			>
				<div style={{}}>
					{Uploads && (
						<ImageList
							cols={isDesktop ? 5 : 3}
							rowHeight={isDesktop ? 100 : 75}
						>
							{Uploads.map((item) => {
								const is_selected = isSelected(item.id, item.file_name);
								const should_put = onlyImages ? item.type == 'image' : true;

								if (should_put)
									return (
										<ImageListItem key={item.id} aria-selected={is_selected}>
											{item.type == 'image' ? (
												<StyledImage
													src={`/${config.project.path.uploads}image/medium/${item.file_name}`}
													alt={item.name}
													loading="lazy"
												/>
											) : (
												<StyledFile>{item.type}</StyledFile>
											)}
											<StyledImageListItemBar
												position="top"
												actionIcon={
													<IconButton
														sx={{ color: 'white' }}
														aria-label={`select ${item.file_name}`}
														onClick={() =>
															clickHandler(item.id, item.file_name)
														}
														dataTestId={`${dataTestId}.ImageList.item.${item.name}`}
													>
														{is_selected ? (
															<CancelIcon color="error" />
														) : (
															<AddIcon color="success" />
														)}
													</IconButton>
												}
												actionPosition="left"
											/>
											<StyledImageListItemBarBottom
												title={item.file_name}
												position="bottom"
											/>
										</ImageListItem>
									);
							})}
						</ImageList>
					)}
				</div>
			</Dialog>
		</div>
	);
};

export default UploadsPicker;
