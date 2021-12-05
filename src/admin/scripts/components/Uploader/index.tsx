import React, { MouseEventHandler, useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { file as fileUtils } from '../../../../../utils/utils';
import { getFileType } from '../../utils/getFileType';
import { Button, Form, Input, Section } from '../ui';
import ImageCropper from './ImageCropper';
import { formLayoutObjectProps } from '../../types/app';
import { getLanguagesFields } from '../../utils/detail';
import config from '../../config';

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
	background-color: rgba(25, 25, 25, 0.5);
	color: rgb(250, 250, 250);
`;

interface UploaderProps {
	onChange: (sources: any[]) => void;
	onReset?: () => void;
	accept?: string;
	aspect?: number;
	withForm?: boolean;
	language?: string;
	languageList?: string[];
}

interface UploadItemFormProps {
	file: any;
	index: number;
	onModelChange: (
		model: any,
		index: number,
		dirty: boolean,
		valid: boolean,
	) => void;
	language: string;
	languageList: string[];
}

const UploadItemForm = ({
	file,
	index,
	onModelChange,
	language,
	languageList,
}: UploadItemFormProps) => {
	const { t } = useTranslation(['common', 'form']);

	const getUpdatedModel = () => {
		const model = { ...file };
		model['name'] = file.file_name.split('.').slice(0, -1).join('.');
		model['lang'] = getLanguagesFields(languageList, {
			label: '',
		} as any);

		return model;
	};

	const formOptions: formLayoutObjectProps = {
		model: 'Uploads',
		id: `UploadsItemDetailForm_${index}`,
	};
	const { control, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...getUpdatedModel(),
		},
	});
	const { isDirty, isValid } = formState;
	const watchAllFields = watch();

	useEffect(
		() => onModelChange(watchAllFields, index, isDirty, isValid),
		[watchAllFields],
	);

	return (
		<Form.Base name={formOptions.id} dataTestId={formOptions.id}>
			{/*  ============ Main form body ============ */}
			<Section noSpacing>
				<Controller
					name="name"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__name`}
								label={t('form:input.name')}
								// responsiveWidth={'75%'}
								dataTestId={`${formOptions.id}.input.name`}
								required
							/>
						</Form.Row>
					)}
				/>
				<Controller
					name="active"
					control={control}
					rules={{}}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.SwitchControl
								onChange={onChange}
								onBlur={onBlur}
								checked={value}
								name={name}
								id={`${formOptions.id}__active`}
								dataTestId={`${formOptions.id}.switch.active`}
								label={t('form:input.active')}
							/>
						</Form.Row>
					)}
				/>
			</Section>
			<Section noSpacing>
				{/*  ============ Language part section ============ */}
				{languageList.map((lng) => {
					return (
						<Section key={lng} visible={language == lng}>
							<Controller
								name={`lang.${lng}.label`}
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Text
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											id={`${formOptions.id}__${lng}__label`}
											label={`${t('form:input.label')} (${lng})`}
											// responsiveWidth={'75%'}
											dataTestId={`${formOptions.id}.input.${lng}.label`}
										/>
									</Form.Row>
								)}
							/>
						</Section>
					);
				})}
				{/*  ============ \\ Language part section ============ */}
			</Section>
			{/*  ============ \\ Main form body ============ */}
		</Form.Base>
	);
};

const Uploader = ({
	onChange,
	onReset,
	accept,
	aspect,
	withForm,
	language = config.tmp.languageDefault,
	languageList = config.tmp.languageList,
}: UploaderProps) => {
	const { t } = useTranslation(['common', 'component', 'message']);
	const [dragOver, setDragOver] = useState(false);

	const [rawFileList, setRawFileList] = useState([]);
	const [fileList, setFileList] = useState([]);

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

		return {
			blob: blob,
			file_name: file.name,
			file_extension: ext,
			file_mime: file.type,
			file_size: file.size,
			file_type: type,
			//
			name: '',
			active: true,
			lang: {},
		};
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
		// tmp[index].blob = blob;
		onChange(tmp);
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
		onChange(fileList);
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
			onChange(result);
		});
	};

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	useEffect(handleSources, [rawFileList]);

	const renderForm = (file: any, index: number) => (
		<UploadItemForm
			file={file}
			index={index}
			onModelChange={formChangeHandler}
			language={language}
			languageList={languageList}
		/>
	);

	return (
		<>
			{dragOver && (
				<HiddenDropWrapper
					onDragLeave={dragEvents.onDragLeave}
					htmlFor="FileUploaderInput"
				>
					...drop files here...
				</HiddenDropWrapper>
			)}
			<div>
				<div>
					{fileList.length == 0 ? (
						<div>
							<input {...inputFileProps} />
						</div>
					) : (
						<div>
							{fileList.map((file, index) => (
								<div key={file.file_name}>
									<span>{file.file_type}</span>
									{file.file_type == 'image' ? (
										<ImageCropper
											src={file.blob}
											onChange={(blob) => cropChangeHandler(blob, index)}
											aspect={aspect}
										/>
									) : (
										<div>other file thumb without crop options</div>
									)}
									{withForm && renderForm(file, index)}
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					<Button onClick={resetHandler}>{t('button.clear')}</Button>
				</div>
			</div>
		</>
	);
};

export default Uploader;
