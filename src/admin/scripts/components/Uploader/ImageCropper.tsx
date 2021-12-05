import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import config from '../../config';
import { IMAGE_CROP_OPTIONS } from '../../constants';
import { getCroppedImg } from '../../utils/image';
import media from '../../styles/responsive';
import { Input } from '../ui';

const Wrapper = styled.div``;
const CropperSource = styled.div`
	width: 100%;
	min-height: 250px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: rgba(25, 25, 25, 0.9);

	${media.min.md} {
		width: 50%;
		min-height: 50vh;
	}
`;
const CropperOutput = styled.div``;
const CropperOptions = styled.div``;

interface ImageCropperProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
	aspect?: number;
}

const ImageCropper = ({ onChange, src, aspect = 4 / 3 }: ImageCropperProps) => {
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState(0);
	const [croppedImage, setCroppedImage] = useState(null);
	const [area, setArea] = useState({ width: 0, height: 0 });
	const [tmpSrc, setTmpSrc] = useState(null);
	const [tmpAspect, setTmpAspect] = useState(aspect);
	const [process, setProcess] = useState(false);
	const [mediaDimensions, setMediaDimensions] = useState({ w: 0, h: 0 });

	const onCropFinish = useCallback((croppedArea, croppedAreaPixels) => {
		setProcess(true);
		setArea({
			width: croppedAreaPixels.width,
			height: croppedAreaPixels.height,
		});

		return getCroppedImg(src, croppedAreaPixels, rotation).then((response) => {
			setCroppedImage(response);
			onChange(response);
			setProcess(false);
		});
	}, []);

	const onImageLoad = useCallback((mediaSize) => {
		setMediaDimensions({
			w: mediaSize.width,
			h: mediaSize.height,
		});
		if (aspect) {
			setTmpAspect(aspect);
		} else {
			setTmpAspect(mediaSize.width / mediaSize.height);
		}
	}, []);

	const getRatioOptions = () => {
		let original = mediaDimensions.w / mediaDimensions.h;

		let options = [...IMAGE_CROP_OPTIONS];

		if (original)
			options.push({
				label: 'Original',
				value: original,
			});

		return options;
	};

	function valuetext(value: number) {
		return `${value}`;
	}

	const zoomHandleChange = (event: any, newValue: number) => setZoom(newValue);

	// const angleHandleChange = (event: any, newValue: number) => setRotation(newValue);

	useEffect(() => setTmpSrc(src), [src]);

	return (
		<Wrapper>
			<CropperSource>
				<Cropper
					image={tmpSrc}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					aspect={tmpAspect}
					onCropChange={setCrop}
					onCropComplete={onCropFinish}
					onZoomChange={setZoom}
					zoomWithScroll={false}
					onMediaLoaded={onImageLoad}
				/>
			</CropperSource>
			<CropperOptions>
				...CropperOptions...
				<small>
					{area.width} x {area.height}
				</small>
				<div>
					<Input.Slider
						getAriaValueText={valuetext}
						aria-labelledby="zoom-slider"
						valueLabelDisplay="auto"
						marks
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={zoomHandleChange}
						style={{ width: '50%' }}
					/>
				</div>
				{/*
				<div>
					<Input.Slider
						getAriaValueText={valuetext}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="auto"
						marks
						min={0}
						max={360}
						step={1}
						value={rotation}
						onChange={angleHandleChange}
						style={{ width: '50%' }}
					/>
				</div>
				*/}
				<div>
					<Input.Select
						// id={`${formOptions.id}__type.label`}
						// labelId={`${formOptions.id}__type.label`}
						// label={t('form:input.type')}
						onChange={(e: any) => {
							setTmpAspect(e.target.value);
						}}
						// onBlur={onBlur}
						value={tmpAspect}
						// name={name}
						options={getRatioOptions()}
						// dataTestId={`${formOptions.id}.select.type`}
					/>
				</div>
			</CropperOptions>
			<CropperOutput>
				...ImageCropper...output...
				{croppedImage && <img src={croppedImage} alt={'cropped image'} />}
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCropper;
