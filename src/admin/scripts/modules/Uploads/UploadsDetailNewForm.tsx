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
import Uploader from '../../components/Uploader';
import { getElTestAttr } from '../../utils/tests';
import inputErrorHandler from '../../utils/inputErrorHandler';
import checkInputDuplicates from '../../utils/checkInputDuplicates';

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
	const [uploadsValid, setUploadsValid] = useState(false);
	const cancelHandler = () => onCancel(false);
	const renderTitle = () => {
		let title = t('new.Uploads');
		if (detailData.id !== 'new') title = detailData.name;

		return title;
	};
	const submitQueue = () => {
		let length = sources.length;
		sources.map((source, index) => {
			onSubmit(source, null);
			if (index == length - 1) {
				setSources([]);
				cancelHandler();
			}
		});
	};
	const uploaderChangeHandler = (sources: any[], valid: boolean) => {
		setUploadsValid(valid);
		setSources(sources);
	};
	const uploaderResetHandler = () => {
		setUploadsValid(false);
		setSources([]);
	};

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
						disabled
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
			<Uploader
				onChange={uploaderChangeHandler}
				onReset={uploaderResetHandler}
				onSubmit={submitQueue}
				language={lang}
				languageList={languageList}
				withForm
			/>
		</>
	);
};

export default UploadsDetailNewForm;
