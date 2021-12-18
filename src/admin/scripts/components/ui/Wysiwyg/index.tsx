import React, { useCallback, useEffect, useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; // https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
import { convertToHTML } from 'draft-convert';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Button from '../Button';
import toolbar from './toolbar';
import { wysiwygBaseTheme } from '../../../styles/mixins';
import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.div<{ height?: WysiwygProps['height'] }>`
	${wysiwygBaseTheme}

	width: 100%;
	height: ${(props) => props.height};
	position: relative;
	background-color: white;
	border: ${(props) => props.theme.wysiwyg.border};
	border-radius: 0.25rem;

	// Fixes
	.rdw-editor-main {
		margin: 0 1rem;
	}
`;
const StyledTextArea = styled.textarea`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 1rem;
	display: flex;
	border: 0;
	font-family: ${(props) => props.theme.ui.fontFamilyBase};
	font-size: ${(props) => props.theme.wysiwyg.raw.fontSize};
	color: ${(props) => props.theme.wysiwyg.raw.color};
	background-color: ${(props) => props.theme.wysiwyg.raw.bg};
	border-radius: ${(props) => props.theme.wysiwyg.raw.radius};
`;

export interface WysiwygProps {
	id?: string;
	value: string | any;
	onChange: (value: string | any) => void;
	placeholder?: string;
	height?: string;
	showSourceCode?: boolean;
	dataTestId?: string;
}

const Wysiwyg: React.FC<WysiwygProps> = ({
	id,
	value,
	onChange,
	placeholder,
	height = '300px',
	showSourceCode,
	dataTestId = 'Wysiwyg.default',
}) => {
	const { t } = useTranslation(['common']);
	const [editorState, setEditorState] = useState(
		value
			? EditorState.createWithContent(
					ContentState.createFromBlockArray(convertFromHTML(value)),
			  )
			: EditorState.createEmpty(),
	);
	const [viewCode, setViewCode] = useState(showSourceCode);

	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		onChange(currentContentAsHTML);
	};

	return (
		<>
			<Wrapper height={height}>
				{viewCode ? (
					<StyledTextArea
						id={`${id}_raw`}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						{...getElTestAttr(`${dataTestId}.input.raw`)}
					/>
				) : (
					<Editor
						id={`${id}_editor`}
						editorState={editorState}
						defaultEditorState={editorState}
						onEditorStateChange={handleEditorChange}
						placeholder={placeholder}
						toolbar={toolbar}
						{...getElTestAttr(`${dataTestId}.input.editor`)}
					/>
				)}
			</Wrapper>
			<Button
				onClick={() => setViewCode(!viewCode)}
				size="small"
				color="secondary"
				dataTestId={`${dataTestId}.view.toggle`}
			>
				{viewCode ? t('button.viewEditor') : t('button.viewSource')}
			</Button>
		</>
	);
};

export default Wysiwyg;
