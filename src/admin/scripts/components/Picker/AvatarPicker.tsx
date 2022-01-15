import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button, Dialog, IconButton } from '../ui';
import Stack from '@mui/material/Stack';
import ImageCropper from '../Uploader/ImageCropper';
import { file as fileUtils } from '../../../../../utils/utils';
import { getElTestAttr } from '../../utils/tests';
import { getFileType } from '../../utils/getFileType';
import { useToasts } from '../../hooks/common';
import { UPLOAD_IMAGE_LIMIT_B } from '../../constants';

const OuterWrapper = styled.div<{ size: string; isValue: boolean }>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: none;
	overflow: hidden;
	border-radius: 100%;
	background-color: ${(props) => props.theme.uploader.outerWrapper.bg};
	color: ${(props) => props.theme.uploader.outerWrapper.color};

	& .avatar-trigger {
		width: ${(props) => props.theme.uploader.avatar.size};
		height: 40px;
		position: absolute;
		top: calc(50% - (${(props) => props.theme.uploader.avatar.size} / 2));
		left: calc(50% - (${(props) => props.theme.uploader.avatar.size} / 2));
		opacity: ${(props) => (props.isValue ? '0' : '1')};
	}
	&:hover .avatar-trigger {
		opacity: 1;
	}
`;
const StyledImage = styled.img`
	max-width: 100%;
	height: auto;
`;
const HiddenDropWrapper = styled.label`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${(props) => props.theme.uploader.hiddenDropWrapper.zIndex};
	background-color: ${(props) => props.theme.uploader.hiddenDropWrapper.bg};
	color: ${(props) => props.theme.uploader.hiddenDropWrapper.color};
`;
const UploaderInputWrapper = styled.div`
	width: 100%;
	height: ${(props) => props.theme.uploader.uploader.height};
	margin-top: 1rem;
	display: block;
	border: ${(props) => props.theme.uploader.uploader.border};
	border-radius: ${(props) => props.theme.uploader.uploader.radius};
`;
const UploaderInputInner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const UploaderInputLabel = styled.label`
	position: relative;

	& input {
		width: 1px;
		height: 1px;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: -1;
	}
`;
const UploaderInputLabelText = styled.span`
	padding: ${(props) => props.theme.spacer};
	cursor: pointer;
`;

interface NewAvatarPickerProps {
	value: Blob;
	onChange: (Blob: string) => void;
	size?: string;
}

const AvatarPicker = ({
	value,
	onChange,
	size = '100px',
}: NewAvatarPickerProps) => {
	const { t } = useTranslation(['common', 'components', 'messages']);
	const dispatch = useDispatch();
	const { createErrorToast } = useToasts(dispatch);
	const [valueInit, setValueInit] = useState<unknown>(value);
	const [newValue, setNewValue] = useState<unknown>(null);
	const [tmpValue, setTmpValue] = useState<unknown>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const [rawFile, setRawFile] = useState(null);
	const inputFileRef = useRef(null);
	const inputFileProps = {
		type: 'file',
		name: 'AvatarPickerInput',
		id: 'AvatarPickerInput',
		accept: 'image/*',
		ref: inputFileRef,
		onChange: (e: any) => {
			let tmp = [],
				files = [...e.target?.files];
			if (files) {
				files.map((file) => {
					const ext = file.name.split('.').pop().toLowerCase();
					const type = getFileType(ext);
					if (type == 'image') {
						if (file.size <= UPLOAD_IMAGE_LIMIT_B) {
							tmp.push(getBlobSource(file));
						} else {
							createErrorToast(t('messages:error.fileOverSizeLimit'));
						}
					} else {
						createErrorToast(t('messages:error.fileNotAccepted'));
					}
				});
				if (tmp.length > 0) setRawFile(tmp);
			}
		},
	};
	const dragEvents = {
		onDrop: (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			let tmp = [],
				files = [...e.dataTransfer.files];
			setDragOver(false);
			if (files) {
				files.map((file) => {
					const ext = file.name.split('.').pop().toLowerCase();
					const type = getFileType(ext);
					if (type == 'image') {
						if (file.size <= UPLOAD_IMAGE_LIMIT_B) {
							tmp.push(getBlobSource(file));
						} else {
							createErrorToast(t('messages:error.fileOverSizeLimit'));
						}
					} else {
						createErrorToast(t('messages:error.fileNotAccepted'));
					}
				});
				if (tmp.length > 0) setRawFile(tmp);
			}
		},
		onDragOver: (e: any) => {
			e.stopPropagation();
			e.preventDefault();

			return false;
		},
		onDragEnter: (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			setDragOver(true);

			return false;
		},
		onDragLeave: (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			setDragOver(false);

			return false;
		},
	};

	const getBlobSource = async (file) => {
		return await fileUtils.toBase64(file);
	};

	const openDialogHandler = () => {
		setDialogOpen(true);
	};
	const cancelHandler = () => {
		setNewValue(null);
		setTmpValue(null);
		setDialogOpen(false);
	};

	const onInit = () => {
		window.addEventListener('mouseup', dragEvents.onDragLeave);
		window.addEventListener('dragover', dragEvents.onDragOver);
		window.addEventListener('dragenter', dragEvents.onDragEnter);
		window.addEventListener('drop', dragEvents.onDrop);
	};
	const onDestroy = () => {
		window.removeEventListener('mouseup', dragEvents.onDragLeave);
		window.removeEventListener('dragover', dragEvents.onDragOver);
		window.removeEventListener('dragenter', dragEvents.onDragEnter);
		window.removeEventListener('drop', dragEvents.onDrop);
	};

	const handleSource = () => {
		if (rawFile) Promise.all(rawFile).then((result) => setNewValue(result));
	};

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	useEffect(handleSource, [rawFile]);

	return (
		<>
			<OuterWrapper size={size} isValue={!!valueInit}>
				{valueInit && (
					<StyledImage
						src={valueInit ? (valueInit as string) : ''}
						alt={'avatar'}
					/>
				)}
				<IconButton
					onClick={openDialogHandler}
					color="inherit"
					className="avatar-trigger"
					dataTestId={`AvatarPicker.thumb.openDialog.trigger`}
				>
					{valueInit ? (
						<EditIcon fontSize="medium" />
					) : (
						<AddCircleIcon fontSize="large" />
					)}
				</IconButton>
			</OuterWrapper>
			<Dialog
				isOpen={dialogOpen}
				onClose={cancelHandler}
				titleChildren={<>{t('components:AvatarPicker.title')}</>}
				footerChildren={
					<>
						<Button
							onClick={cancelHandler}
							color="secondary"
							dataTestId={`AvatarPicker.dialog.cancel`}
						>
							{t('button.cancel')}
						</Button>
						<Button
							onClick={() => {
								fileUtils
									.resizeBase64AndReduceQualityImage(tmpValue, 0)
									.then((result) => {
										setValueInit(result);
										onChange(result);
									});
								cancelHandler();
							}}
							color="primary"
							disabled={!tmpValue}
							dataTestId={`AvatarPicker.dialog.confirm`}
						>
							{t('button.confirm')}
						</Button>
					</>
				}
			>
				<>
					{rawFile && newValue ? (
						<div style={{ paddingTop: '1.25rem' }}>
							<ImageCropper
								src={newValue as Blob}
								onChange={(blob) => setTmpValue(blob)}
								avatarOnly
							/>
						</div>
					) : (
						<UploaderInputWrapper>
							<UploaderInputInner>
								<UploaderInputLabel htmlFor={inputFileProps.name}>
									<UploaderInputLabelText>
										{t('form:form.UploadsDetail.label.select_file_to_upload')}
									</UploaderInputLabelText>
									<input
										{...inputFileProps}
										{...getElTestAttr(`AvatarPicker.dialog.input.file`)}
									/>
								</UploaderInputLabel>
							</UploaderInputInner>
						</UploaderInputWrapper>
					)}
					{dragOver && (
						<HiddenDropWrapper
							onDragLeave={dragEvents.onDragLeave}
							htmlFor={''}
						>
							<Stack spacing={2} direction="column" alignItems="center">
								<div>
									<CloudUploadIcon fontSize="large" />
								</div>
								{t('form:form.UploadsDetail.label.drop_files_here')}
							</Stack>
						</HiddenDropWrapper>
					)}
				</>
			</Dialog>
		</>
	);
};

export default AvatarPicker;
