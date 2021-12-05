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
import { CategoriesItemLangProps } from '../../types/model';

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
	// onValueChange: (name: string, value: any, index: number) => void;
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

	// const model = _.cloneDeep(file);
	const model = { ...file };
	model['name'] = file.file_name.split('.').slice(0, -1).join('.');
	model['lang'] = getLanguagesFields(languageList, {
		label: '',
		description: '',
	} as any);

	const formOptions: formLayoutObjectProps = {
		model: 'Uploads',
		id: `UploadsItemDetailForm_${index}`,
	};
	const { control, handleSubmit, reset, register, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...model,
		},
	});
	const { isDirty, isValid } = formState;
	const watchAllFields = watch();

	useEffect(() => {
		console.log('watchAllFields', watchAllFields);
		onModelChange(watchAllFields, index, isDirty, isValid);
	}, [watchAllFields]);

	return (
		<Form.Base name={formOptions.id} dataTestId={formOptions.id}>
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
								responsiveWidth={'75%'}
								dataTestId={`${formOptions.id}.input.name`}
								required
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
							<Controller
								name={`lang.${lng}.description`}
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Text
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											id={`${formOptions.id}__${lng}__description`}
											label={`${t('form:input.description')} (${lng})`}
											// responsiveWidth={'75%'}
											dataTestId={`${formOptions.id}.input.${lng}.description`}
											required
											multiline
											rows={4}
										/>
									</Form.Row>
								)}
							/>
						</Section>
					);
				})}
				{/*  ============ \\ Language part section ============ */}
			</Section>
		</Form.Base>
	);
};

const Uploader = ({
	onChange,
	onReset,
	accept,
	aspect,
	withForm,
	language = 'en', // TODO
	languageList = ['en'],
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
				tmp = files.map((file) => setBlobSource(file));

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
				tmp = files.map((file) => setBlobSource(file));

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

	const setBlobSource = async (file) => {
		const blob = await fileUtils.toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);

		let tmp_file;

		const getFileObject = () => {
			return {
				blob: blob,
				file_name: file.name,
				file_extension: ext,
				file_mime: file.type,
				file_size: file.size,
				file_type: type,
				//
				name: '',
				lang: {},
			};
		};

		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				tmp_file = getFileObject();
			} else {
				console.warn(t('message:error.fileNotAccepted'));
			}
		} else {
			tmp_file = getFileObject();
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
		tmp[index].blob = blob;
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

	const renderForm = (file: any, index: number) => (
		<UploadItemForm
			file={file}
			index={index}
			onModelChange={formChangeHandler}
			language={language}
			languageList={languageList}
		/>
	);

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

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	const handleSources = () => {
		Promise.all(rawFileList).then((result) => {
			setFileList(result);
			onChange(result);
		});
	};

	useEffect(handleSources, [rawFileList]);

	return (
		<>
			{dragOver && (
				<HiddenDropWrapper
					onDragLeave={dragEvents.onDragLeave}
					htmlFor="FileUploaderInput"
				>
					...drop here...
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
					<Button onClick={resetHandler}>Reset</Button>
				</div>
			</div>
		</>
	);
};

export default Uploader;
