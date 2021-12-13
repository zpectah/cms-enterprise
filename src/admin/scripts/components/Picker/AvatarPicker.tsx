import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button, Dialog, Typography } from '../ui';
import Stack from '@mui/material/Stack';
import ImageCropper from '../Uploader/ImageCropper';
import { file as fileUtils } from '../../../../../utils/utils';

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
	background-color: rgba(25, 25, 25, 0.25);
	color: white;

	& .avatar-trigger {
		width: 40px;
		height: 40px;
		position: absolute;
		top: calc(50% - 20px);
		left: calc(50% - 20px);
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
	z-index: 1250;
	background-color: rgba(25, 25, 25, 0.75);
	color: rgb(250, 250, 250);
`;
const UploaderInputWrapper = styled.div`
	width: 100%;
	height: 200px;
	margin-top: 1rem;
	display: block;
	border: 5px dashed rgba(25, 25, 25, 0.5);
	border-radius: 0.5rem;
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
	const { t } = useTranslation(['common', 'component', 'message']);
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
			let tmp,
				files = [...e.target?.files];
			if (files) {
				tmp = files.map((file) => getBlobSource(file));
				setRawFile(tmp);
			}
		},
	};
	const dragEvents = {
		onDrop: (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			let tmp,
				files = [...e.dataTransfer.files];
			setDragOver(false);
			if (files) {
				tmp = files.map((file) => getBlobSource(file));
				setRawFile(tmp);
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
		const blob = await fileUtils.toBase64(file);
		let tmp_file;
		if (!file.type.includes('image')) {
			console.warn(t('message:error.fileNotAccepted'));

			return;
		} else {
			tmp_file = blob;
		}

		return tmp_file;
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
				footerChildren={
					<>
						<Button onClick={cancelHandler} color="secondary">
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
									<input {...inputFileProps} />
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
