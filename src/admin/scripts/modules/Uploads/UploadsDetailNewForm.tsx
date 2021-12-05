import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { UploadsItemProps } from '../../types/model';
import {
	Form,
	Button,
	ButtonCreate,
	Section,
	Input,
} from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../../components/ModuleLanguageToggle';
import { getElTestAttr } from '../../utils/tests';
import getOptionsList from '../../utils/getOptionsList';
import Uploader from '../../components/Uploader';

interface UploadsDetailNewFormProps {
	detailData: UploadsItemProps;
	onSubmit: (data: UploadsItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
}

const UploadsDetailNewForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
}: UploadsDetailNewFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const [sources, setSources] = useState([]);

	const submitHandler = (data: UploadsItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const cancelHandler = () => onCancel(false);

	const renderTitle = () => {
		let title = t('new.Uploads');
		if (detailData.id !== 'new') title = detailData.name;

		return title;
	};

	/*
	const uploaderChangeHandler = (blob: any, file: any, type: string) => {
		setValue('fileBase64', blob);
		setValue('name', file.name.split('.').slice(0, -1).join('.'));
		setValue('type', type);
	};
	const uploaderResetHandler = () => {
		setValue('fileBase64', '');
		setValue('name', '');
		setValue('type', 'unknown');
	};
	*/

	const uploaderChangeHandler = (sources: any[]) => setSources(sources);
	const uploaderResetHandler = () => {
		setSources([]);
	};

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Uploads.type, t),
		[detailData],
	);

	// useEffect(() => reset(detailData), [detailData, reset]); // Important useEffect, must be for reloading form model !!!

	return (
		<>
			<ContentTitle
				title={renderTitle()}
				listPath={ROUTES.app.uploads.path}
				clickCallback={cancelHandler}
			/>
			<ModuleViewHeading
				tertiaryChildren={
					<ButtonCreate
						variant="outlined"
						onClick={onCreateCallback}
						dataTestId={`button.create.new.Uploads`}
					>
						{t(`new.Uploads`)}
					</ButtonCreate>
				}
			>
				<ModuleLanguageToggle
					language={lang}
					languageList={languageList}
					onChange={(lng) => setLang(lng)}
					style={{ marginRight: '.75rem' }}
				/>
			</ModuleViewHeading>
			<div>sources length: {sources.length}</div>
			<Uploader
				onChange={uploaderChangeHandler}
				onReset={uploaderResetHandler}
				language={lang}
				languageList={languageList}
				withForm
			/>
		</>
	);
};

export default UploadsDetailNewForm;
