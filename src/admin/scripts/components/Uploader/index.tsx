import React, { MouseEventHandler, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { file as fileUtils } from '../../../../../utils/utils';
import { getFileType } from '../../utils/getFileType';
import { Button } from '../ui';
import ImageCropper from './ImageCropper';

const HiddenDropWrapper = styled.div`
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
	onChange: (blob: any, file: any, type: string) => void;
	onReset?: () => void;
	accept?: string;
	aspect?: number;
	multiple?: boolean;
}

const Uploader = ({
	onChange,
	onReset,
	accept,
	aspect,
	multiple,
}: UploaderProps) => {
	const { t } = useTranslation(['common', 'component', 'message']);
	const [dragOver, setDragOver] = useState(false);
	const [file, setFile] = useState(null);
	const [src, setSrc] = useState(null);
	const [fileType, setFileType] = useState('unknown');

	const inputFileRef = useRef(null);
	const inputFileProps = {
		type: 'file',
		name: 'FileUploaderInput',
		accept: accept,
		ref: inputFileRef,
		onChange: (e: any) => {
			let file = e.target?.files[0];

			setFile(null);
			setFileType('unknown');
			setSrc(null);

			if (file) return setBlobSource(file);
		},
	};

	const dragEvents = {
		onDrop: (e: any) => {
			e.stopPropagation();
			e.preventDefault();

			let file;

			if (e.dataTransfer.items) {
				file = e.dataTransfer.items[0].getAsFile();
			} else {
				file = e.dataTransfer.files[0];
			}

			setDragOver(false);
			setFile(null);
			setFileType('unknown');
			setSrc(null);

			if (file) return setBlobSource(file);
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
		setFileType(type);

		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				setFile({
					blob: blob,
					name: file.name,
					extension: ext,
					mime: file.type,
					size: file.size,
					type: type,
				});
				if (type == 'image') {
					setSrc(blob);
				}
			} else {
				console.warn(t('message:error.fileNotAccepted'));
			}
		} else {
			setFile({
				blob: blob,
				name: file.name,
				extension: ext,
				mime: file.type,
				size: file.size,
				type: type,
			});
			if (type == 'image') {
				setSrc(blob);
			}
		}

		onChange(blob, file, type);
	};
	const resetHandler = () => {
		setFile(null);
		setFileType('unknown');
		setSrc(null);
		if (inputFileRef.current) inputFileRef.current.value = '';
		if (onReset) onReset();
	};
	const cropChangeHandler = (blob) => {
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);

		onChange(blob, file, type);
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

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	return (
		<>
			{dragOver && (
				<HiddenDropWrapper onDragLeave={dragEvents.onDragLeave}>
					...drop here...
				</HiddenDropWrapper>
			)}
			<div>
				<div>
					{file ? (
						<div>
							{fileType == 'image' ? (
								<ImageCropper
									src={src}
									onChange={cropChangeHandler}
									aspect={aspect}
								/>
							) : (
								<div>other file thumb</div>
							)}
						</div>
					) : (
						<div>
							<input {...inputFileProps} />
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
