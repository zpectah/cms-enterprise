import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface ImageCropperProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
	aspect?: number;
}

const ImageCropper = ({ onChange, src, aspect = 1 / 1 }: ImageCropperProps) => {
	return (
		<>
			<div>
				...ImageCropper...aspect:{aspect}...{JSON.stringify(src)}...
			</div>
		</>
	);
};

export default ImageCropper;
