import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';

import config from '../../config';
import { file as fileUtils } from '../../../../../utils/utils';
import { UploadsItemProps, UploadsItemLangProps } from '../../types/model';
import { getFileType } from '../../utils/getFileType';
import { Button } from '../ui';
import ImageCropper from './ImageCropper';
import UploadsItemForm from './UploadsItemForm';
import { getLanguagesFields } from '../../utils/detail';
import { useToasts } from '../../hooks/common';
import { UPLOAD_IMAGE_LIMIT_B, UPLOAD_FILE_LIMIT_B } from '../../constants';

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
const UploaderHeading = styled.div`
	width: 100%;
	margin-top: calc(${(props) => props.theme.spacer} * 1.5);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const UploadItemsWrapper = styled.div``;
const UploadItemFormWrapper = styled.div`
	margin-top: ${(props) => props.theme.spacer};
`;
const OtherFormatsBlock = styled.div`
	padding: ${(props) => props.theme.spacer};
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	background-color: ${(props) => props.theme.uploader.othersBlock.bg};
	color: ${(props) => props.theme.uploader.othersBlock.color};
	border: ${(props) => props.theme.uploader.othersBlock.border};
	border-radius: ${(props) => props.theme.uploader.othersBlock.radius};
`;

interface UploaderProps {
	onChange: (sources: any[], valid: boolean) => void;
	onReset?: () => void;
	onSubmit?: () => void;
	aspect?: number;
	withForm?: boolean;
	language?: string;
	languageList?: string[];
	widthHeading?: boolean;
	multiple?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
	children,
	onChange,
	onReset,
	onSubmit,
	aspect,
	withForm,
	language = config.tmp.languageDefault,
	languageList = config.tmp.languageList,
	widthHeading = true,
	multiple = true,
}) => {
	const { t } = useTranslation(['common', 'component', 'messages']);
	const dispatch = useDispatch();
	const { createErrorToast } = useToasts(dispatch);
	const [dragOver, setDragOver] = useState(false);
	const [rawFileList, setRawFileList] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [formsValid, setFormsValid] = useState<boolean>(false);
	const inputFileRef = useRef(null);
	const inputFileProps = {
		type: 'file',
		name: 'FileUploaderInput',
		id: 'FileUploaderInput',
		ref: inputFileRef,
		multiple: multiple,
		onChange: (e: any) => {
			let tmp,
				files = [...e.target?.files];
			if (files) {
				tmp = [];
				files.map((file) => {
					const ext = file.name.split('.').pop().toLowerCase();
					const type = getFileType(ext);
					if (type !== 'undefined') {
						if (type == 'image') {
							if (file.size <= UPLOAD_IMAGE_LIMIT_B) {
								tmp.push(getBlobSource(file));
							} else {
								createErrorToast(t('messages:error.fileOverSizeLimit'));
							}
						} else if (file.size <= UPLOAD_FILE_LIMIT_B) {
							tmp.push(getBlobSource(file));
						} else {
							createErrorToast(t('messages:error.fileOverSizeLimit'));
						}
					} else {
						createErrorToast(t('messages:error.fileNotAccepted'));
					}
				});
				setRawFileList(tmp);
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
				tmp = [];
				files.map((file) => {
					const ext = file.name.split('.').pop().toLowerCase();
					const type = getFileType(ext);
					if (type !== 'undefined') {
						if (type == 'image') {
							if (file.size <= UPLOAD_IMAGE_LIMIT_B) {
								tmp.push(getBlobSource(file));
							} else {
								createErrorToast(t('messages:error.fileOverSizeLimit'));
							}
						} else if (file.size <= UPLOAD_FILE_LIMIT_B) {
							tmp.push(getBlobSource(file));
						} else {
							createErrorToast(t('messages:error.fileOverSizeLimit'));
						}
					} else {
						createErrorToast(t('messages:error.fileNotAccepted'));
					}
				});
				if (!multiple) {
					let n_tmp = [tmp[0]];
					setRawFileList(n_tmp);
					if (files.length > 1) {
						console.warn('Only one file is allowed to drop');
					}
				} else {
					setRawFileList(tmp);
				}
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
	const getFileObject = (blob, file) => {
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);
		const model = {
			fileBase64: blob,
			fileBase64_cropped: null,
			file_name: file.name,
			file_extension: ext,
			file_mime: file.type,
			file_size: file.size,
			type: type,
		} as UploadsItemProps;
		if (withForm) {
			model['id'] = 'new';
			model['name'] = file.name.split('.').slice(0, -1).join('.');
			model['active'] = true;
			model['lang'] = getLanguagesFields(languageList, {
				label: '',
			} as UploadsItemLangProps);
		}

		return model;
	};
	const getBlobSource = async (file) => {
		const blob = await fileUtils.toBase64(file);
		return getFileObject(blob, file);
	};
	const resetHandler = () => {
		setRawFileList([]);
		setFileList([]);
		setFormsValid(false);
		if (inputFileRef.current) inputFileRef.current.value = '';
		if (onReset) onReset();
	};
	const cropChangeHandler = (blob: any, index: number) => {
		let tmp = [...fileList];
		tmp[index].fileBase64_cropped = blob;
		onChange(tmp, formsValid);
	};
	const formChangeHandler = (
		model: any,
		index: number,
		dirty: boolean,
		valid: boolean,
	) => {
		let tmp = [...fileList];
		tmp[index] = {
			...model,
			valid: valid,
		};
		setFormsValid(!tmp.find((item) => item.valid == false));
		setFileList(tmp);
		onChange(tmp, valid);
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
	const handleSources = () => {
		Promise.all(rawFileList).then((result) => {
			setFileList(result);
			onChange(result, formsValid);
		});
	};
	const removeFromQueue = (index: number) => {
		let tmp = [...fileList];
		let tmp_raw = [...rawFileList];
		tmp.splice(index, 1);
		tmp_raw.splice(index, 1);
		setFileList(tmp);
		setRawFileList(tmp_raw);
		onChange(tmp, formsValid);
	};
	const renderForm = (file: any, index: number) => (
		<UploadItemFormWrapper>
			<UploadsItemForm
				file={file}
				index={index}
				onModelChange={formChangeHandler}
				language={language}
				languageList={languageList}
				onRemove={removeFromQueue}
			/>
		</UploadItemFormWrapper>
	);

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	useEffect(handleSources, [rawFileList]);

	return (
		<>
			{dragOver && (
				<HiddenDropWrapper
					onDragLeave={dragEvents.onDragLeave}
					htmlFor={inputFileProps.name}
				>
					<Stack spacing={2} direction="column" alignItems="center">
						<div>
							<CloudUploadIcon fontSize="large" />
						</div>
						{t('form:form.UploadsDetail.label.drop_files_here')}
					</Stack>
				</HiddenDropWrapper>
			)}
			<UploadItemsWrapper>
				{fileList.length == 0 ? (
					<>
						{children ? (
							<>
								<UploaderInputLabel htmlFor={inputFileProps.name}>
									{children}
									<input {...inputFileProps} />
								</UploaderInputLabel>
							</>
						) : (
							<UploaderInputWrapper>
								<UploaderInputInner>
									<UploaderInputLabel htmlFor={inputFileProps.name}>
										<UploaderInputLabelText>
											{multiple
												? t(
														'form:form.UploadsDetail.label.select_files_to_upload',
												  )
												: t(
														'form:form.UploadsDetail.label.select_file_to_upload',
												  )}
										</UploaderInputLabelText>
										<input {...inputFileProps} />
									</UploaderInputLabel>
								</UploaderInputInner>
							</UploaderInputWrapper>
						)}
					</>
				) : (
					fileList.map((file, index) => (
						<div key={file.file_name} style={{ marginBottom: '1rem' }}>
							{file.type == 'image' ? (
								<ImageCropper
									src={file.fileBase64}
									onChange={(fileBase64) =>
										cropChangeHandler(fileBase64, index)
									}
									onConfirm={() => {}}
									onCancel={() => removeFromQueue(index)}
								/>
							) : (
								<OtherFormatsBlock>
									<Stack spacing={2} direction="row" alignItems="center">
										<div style={{ paddingRight: '2rem' }}>
											{file.file_extension}-{file.type}
										</div>
										<Button
											onClick={() => removeFromQueue(index)}
											dataTestId={`Uploader.queue.item.${file.file_name}.remove`}
										>
											{t('button.removeFromQueue')}
										</Button>
									</Stack>
								</OtherFormatsBlock>
							)}
							{withForm && renderForm(file, index)}
						</div>
					))
				)}
			</UploadItemsWrapper>
			{widthHeading && (
				<UploaderHeading>
					<Stack direction="row" alignItems="center">
						{t('form:form.UploadsDetail.label.files_in_queue')}:&nbsp;
						<b>{fileList.length}</b>
					</Stack>
					<Stack spacing={2} direction="row">
						<Button
							variant="contained"
							color="success"
							onClick={onSubmit}
							disabled={fileList.length == 0 || !formsValid}
							dataTestId={`Uploader.queue.heading.submit`}
						>
							{t('button.submitQueue')}
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={resetHandler}
							disabled={fileList.length == 0}
							dataTestId={`Uploader.queue.heading.clear`}
						>
							{t('button.clearQueue')}
						</Button>
					</Stack>
				</UploaderHeading>
			)}
		</>
	);
};

export default Uploader;
