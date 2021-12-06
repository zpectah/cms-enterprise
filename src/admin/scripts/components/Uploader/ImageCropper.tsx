import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import config from '../../config';
import { IMAGE_CROP_OPTIONS } from '../../constants';
import { getCroppedImg } from '../../utils/image';
import media from '../../styles/responsive';
import { Input, Preloader } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: 750px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const CropperSource = styled.div`
	width: 100%;
	height: 100%;
	padding: calc(${(props) => props.theme.spacer} * 1.5);
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(25, 25, 25, 0.9);

	${media.min.md} {
	}
`;
const CropperOutput = styled.div`
	width: 35vw;
	height: 35vw;
	padding: ${(props) => props.theme.spacer};
	position: absolute;
	bottom: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(25, 25, 25, 0.5);

	& img {
		max-width: 100%;
		height: auto;
		max-height: 100%;
		display: block;
	}

	${media.min.md} {
		width: 15vw;
		height: 15vw;
	}
`;
const CropperOptions = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(225, 225, 225, 0.75);
`;
const CropperOptionsBlock = styled.div`
	padding: calc(${(props) => props.theme.spacer} / 2)
		${(props) => props.theme.spacer};
	display: flex;
	flex: auto;
	align-items: center;
	justify-content: center;
`;

interface ImageCropperProps {
	onChange: (fileBase64: Blob) => void;
	src: Blob;
	aspect?: number;
}

const ImageCropper = ({ onChange, src, aspect = 4 / 3 }: ImageCropperProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
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

		return getCroppedImg(src, croppedAreaPixels, 0).then((response: any) => {
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

	useEffect(() => setTmpSrc(src), [src]);

	return (
		<Wrapper>
			<CropperSource>
				<Cropper
					image={tmpSrc}
					crop={crop}
					zoom={zoom}
					aspect={tmpAspect}
					onCropChange={setCrop}
					onCropComplete={onCropFinish}
					onZoomChange={setZoom}
					zoomWithScroll={false}
					onMediaLoaded={onImageLoad}
				/>
			</CropperSource>
			<CropperOptions>
				<CropperOptionsBlock>
					<small>
						{area.width} x {area.height}
					</small>
				</CropperOptionsBlock>
				<CropperOptionsBlock>
					<Input.Slider
						id={`ImageCropper_options_zoom`}
						getAriaValueText={valuetext}
						aria-labelledby="ImageCropper_options_zoom_slider"
						valueLabelDisplay="auto"
						marks
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={zoomHandleChange}
						dataTestId={`ImageCropper.options.zoom`}
					/>
				</CropperOptionsBlock>
				<CropperOptionsBlock>
					<Input.Select
						id={`ImageCropper_options_aspect`}
						labelId={`ImageCropper_options_aspect`}
						onChange={(e: any) => {
							setTmpAspect(e.target.value);
						}}
						value={tmpAspect}
						options={getRatioOptions()}
						dataTestId={`ImageCropper.options.aspect`}
					/>
				</CropperOptionsBlock>
			</CropperOptions>
			<CropperOutput>
				{process && <Preloader.Block />}
				{croppedImage && <img src={croppedImage} alt={'cropped image'} />}
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCropper;
