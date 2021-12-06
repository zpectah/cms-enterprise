import React, {
	MouseEventHandler,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';

import config from '../../config';
import { file as fileUtils } from '../../../../../utils/utils';
import { UploadsItemProps, UploadsItemLangProps } from '../../types/model';
import { getFileType } from '../../utils/getFileType';
import { Button, Form, Input, Section } from '../ui';
import ImageCropper from './ImageCropper';
import UploadsItemForm from './UploadsItemForm';
import { getLanguagesFields } from '../../utils/detail';

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
	height: 100px;
	display: block;
	border: 5px dashed rgba(25, 25, 25, 0.5);
	border-radius: 0.5rem;
`;
const UploaderInputInner = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const UploaderInputLabel = styled.label`
	position: relative;

	& input {
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
	margin-bottom: ${(props) => props.theme.spacer};
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
	align: center;
	justify-content: center;
`;

interface UploaderProps {
	onChange: (sources: any[], valid: boolean) => void;
	onReset?: () => void;
	onSubmit?: () => void;
	accept?: string;
	aspect?: number;
	withForm?: boolean;
	language?: string;
	languageList?: string[];
	widthHeading?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
	children,
	onChange,
	onReset,
	onSubmit,
	accept,
	aspect,
	withForm,
	language = config.tmp.languageDefault,
	languageList = config.tmp.languageList,
	widthHeading = true,
}) => {
	const { t } = useTranslation(['common', 'component', 'message']);
	const [dragOver, setDragOver] = useState(false);

	const [rawFileList, setRawFileList] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [formsValid, setFormsValid] = useState<boolean>(false);

	const inputFileRef = useRef(null);
	const inputFileProps = {
		type: 'file',
		name: 'FileUploaderInput',
		id: 'FileUploaderInput',
		accept: accept,
		ref: inputFileRef,
		multiple: true,
		onChange: (e: any) => {
			let tmp,
				files = [...e.target?.files];
			if (files) {
				tmp = files.map((file) => getBlobSource(file));
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
				tmp = files.map((file) => getBlobSource(file));
				setRawFileList(tmp);
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
		let tmp_file;
		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				tmp_file = getFileObject(blob, file);
			} else {
				console.warn(t('message:error.fileNotAccepted'));
			}
		} else {
			tmp_file = getFileObject(blob, file);
		}

		return tmp_file;
	};
	const resetHandler = () => {
		setRawFileList([]);
		setFileList([]);
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
		};
		setFormsValid(valid);
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
		tmp.splice(index, 1);
		setFileList(tmp);
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
			{widthHeading && (
				<UploaderHeading>
					<Stack direction="row" alignItems="center">
						{t('form:form.UploadsDetail.label.files_in_queue')}:{' '}
						<b>{fileList.length}</b>
					</Stack>
					<Stack spacing={2} direction="row">
						<Button
							variant="contained"
							color="success"
							onClick={onSubmit}
							disabled={fileList.length == 0}
						>
							{t('button.submitQueue')}
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={resetHandler}
							disabled={fileList.length == 0}
						>
							{t('button.clearQueue')}
						</Button>
					</Stack>
				</UploaderHeading>
			)}
			<UploadItemsWrapper>
				{fileList.length == 0 ? (
					<>
						{children ? (
							<>children</>
						) : (
							<UploaderInputWrapper>
								<UploaderInputInner>
									<UploaderInputLabel htmlFor={inputFileProps.name}>
										<UploaderInputLabelText>
											{t(
												'form:form.UploadsDetail.label.select_files_to_upload',
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
									aspect={aspect}
								/>
							) : (
								<OtherFormatsBlock>
									<br />
									other file thumb without crop options ... {file.type}
									<br />
									<Button onClick={() => removeFromQueue(index)}>
										{t('button.removeFromQueue')}
									</Button>
								</OtherFormatsBlock>
							)}
							{withForm && renderForm(file, index)}
						</div>
					))
				)}
			</UploadItemsWrapper>
		</>
	);
};

export default Uploader;
