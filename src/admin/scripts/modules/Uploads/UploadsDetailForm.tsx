import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DescriptionIcon from '@mui/icons-material/Description';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import styled from 'styled-components';

import config from '../../config';
import { file as fileUtils } from '../../../../../utils/utils';
import { ROUTES, ROUTE_SUFFIX, USER_LEVEL_NUMS } from '../../constants';
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
import DetailFormActions from '../../components/DetailFormActions';

const UploadSourceWrapper = styled.div<{ isImage: boolean }>`
	width: 100%;
	height: ${(props) => (props.isImage ? '500px' : '100px')};
	padding: ${(props) => props.theme.spacer};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.palette.light};
	background-color: ${(props) => props.theme.palette.black};
	border-radius: 0.5rem;
	font-size: 1.1rem;

	& img {
		max-width: 100%;
		height: auto;
		max-height: 100%;
		display: block;
	}
`;

const InfoTable = styled.dl`
	width: 100%;
	display: flex;

	& dt {
		width: 50%;
		font-weight: 500;
	}
	& dd {
		width: 50%;
		margin-left: 0;
	}
`;

interface UploadsDetailFormProps {
	detailData: UploadsItemProps;
	onSubmit: (data: UploadsItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	isProcessing?: boolean;
	profileLevel: number;
}

const UploadsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
	isProcessing,
	profileLevel,
}: UploadsDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const formOptions: formLayoutObjectProps = {
		model: 'Uploads',
		id: 'UploadsDetailForm',
		route: ROUTES.app.uploads,
		...detailOptions,
	};
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const submitHandler = (data: UploadsItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Uploads');
		if (detailData.id !== 'new') title = detailData.file_name;

		return title;
	};
	const renderFooter = () => (
		<DetailFormActions
			id={detailData.id}
			formId={formOptions.id}
			isValid={isValid}
			shouldDelete={profileLevel > USER_LEVEL_NUMS.redactor}
			onDelete={deleteHandler}
			onCancel={cancelHandler}
			isProcessing={isProcessing}
		/>
	);

	useEffect(() => reset(detailData), [detailData, reset]); // Important useEffect, must be for reloading form model !!!

	return (
		<>
			<ContentTitle
				title={renderTitle()}
				listPath={formOptions.route.path}
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
			<Form.Layout
				formName={formOptions.id}
				dataTestId={formOptions.id}
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				footerChildren={renderFooter()}
				sidebarChildren={
					<>
						{/*  ============ Form sidebar ============ */}
						<Section>
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
						<Section>
							<InfoTable>
								<dt>{t('form:form.UploadsDetail.label.file_name')}</dt>
								<dd>{detailData.file_name}</dd>
							</InfoTable>
							<InfoTable>
								<dt>{t('form:form.UploadsDetail.label.file_mime')}</dt>
								<dd>{detailData.file_mime}</dd>
							</InfoTable>
							<InfoTable>
								<dt>{t('form:form.UploadsDetail.label.file_size')}</dt>
								<dd>{fileUtils.formatBytes(detailData.file_size)}</dd>
							</InfoTable>
						</Section>
						{/*  ============ \\ Form sidebar ============ */}
					</>
				}
			>
				{/*  ============ Main form body ============ */}
				<div>
					<input type="hidden" {...register('id', { required: true })} />
					<input type="hidden" {...register('name', { required: true })} />
					<input type="hidden" {...register('type', { required: true })} />
				</div>
				<Section noSpacing>
					{/*  ============ Language part section ============ */}
					{languageList.map((lng) => {
						return (
							<Section key={lng} visible={lang == lng}>
								<Controller
									name={`lang.${lng}.label`}
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row errors={[]}>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__${lng}__label`}
												label={`${lng.toUpperCase()} ${t('form:input.label')}`}
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
				<Section>
					<UploadSourceWrapper isImage={detailData.type == 'image'}>
						{detailData.type == 'image' ? (
							<img
								src={`/${config.project.path.uploads}image/${detailData.file_name}`}
								alt={detailData.name}
							/>
						) : (
							<>
								{
									{
										document: <DescriptionIcon fontSize="large" />,
										archive: <FilePresentIcon fontSize="large" />,
										audio: <MusicNoteIcon fontSize="large" />,
										video: <MovieIcon fontSize="large" />,
									}[detailData.type]
								}
								<small style={{ marginLeft: '.5rem' }}>
									{detailData.file_name}
								</small>
							</>
						)}
					</UploadSourceWrapper>
					<div style={{ paddingTop: '1rem' }}>
						<small
							style={{ display: 'block' }}
						>{`${config.environmental.root}${config.project.path.uploads}${detailData.type}/${detailData.file_name}`}</small>
						{detailData.type == 'image' && (
							<>
								<small
									style={{ display: 'block', marginTop: '.5rem' }}
								>{`${config.environmental.root}${config.project.path.uploads}image/${config.options.model.Uploads.image.cropped.key}/${detailData.file_name}`}</small>
								{config.options.model.Uploads.image.format.map((format) => (
									<small
										key={format.key}
										style={{ display: 'block', marginTop: '.5rem' }}
									>{`${config.environmental.root}${config.project.path.uploads}image/${format.key}/${detailData.file_name}`}</small>
								))}
							</>
						)}
					</div>
				</Section>
				{/*  ============ \\ Main form body ============ */}
			</Form.Layout>
		</>
	);
};

export default UploadsDetailForm;
