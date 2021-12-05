import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import config from '../../config';
import { IMAGE_CROP_OPTIONS } from '../../constants';
import { getCroppedImg } from '../../utils/image';
import media from '../../styles/responsive';

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

const ImageCropper = ({ onChange, src, aspect = 1 / 1 }: ImageCropperProps) => {
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState(0);
	const [croppedImage, setCroppedImage] = useState(null);
	const [area, setArea] = useState({ width: 0, height: 0 });
	const [tmpSrc, setTmpSrc] = useState(null);
	const [tmpAspect, setTmpAspect] = useState(4 / 3);
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

	/*
	const angleHandleChange = (event: any, newValue: number) => {
		setZoom(newValue);
	};
	*/

	useEffect(() => setTmpSrc(src), [src]);

	// useEffect(() => onChange(croppedImage), [croppedImage]);

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
			<CropperOutput>
				...ImageCropper...output...
				{croppedImage && <img src={croppedImage} alt={'cropped image'} />}
			</CropperOutput>
			<CropperOptions>...CropperOptions...</CropperOptions>
		</Wrapper>
	);
};

export default ImageCropper;
