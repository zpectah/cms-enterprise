import React, {
	MouseEventHandler,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button, Form, Input, Section } from '../ui';
import { formLayoutObjectProps } from '../../types/app';
import { useUploads } from '../../hooks/model';
import { getLanguagesFields } from '../../utils/detail';
import inputErrorHandler from '../../utils/inputErrorHandler';
import checkInputDuplicates from '../../utils/checkInputDuplicates';

interface UploadsItemFormProps {
	file: any;
	index: number;
	onModelChange: (
		model: any,
		index: number,
		dirty: boolean,
		valid: boolean,
	) => void;
	language: string;
	languageList: string[];
	onRemove: (index: number) => void;
}

const UploadsItemForm = ({
	file,
	index,
	onModelChange,
	language,
	languageList,
	onRemove,
}: UploadsItemFormProps) => {
	const { Uploads } = useUploads();
	const { t } = useTranslation(['common', 'form']);
	const formOptions: formLayoutObjectProps = {
		model: 'Uploads',
		id: `UploadsItemDetailForm_${index}`,
	};
	const {
		control,
		formState: { isDirty, isValid, errors },
		watch,
		handleSubmit,
		register,
		setValue,
	} = useForm({
		mode: 'all',
		defaultValues: {
			...file,
		},
	});
	const name_duplicates = checkInputDuplicates(
		Uploads,
		0,
		'name',
		watch('name'),
	);
	const watchAllFields = watch();
	const changeModelHandler = useCallback(() => {
		onModelChange(watchAllFields, index, isDirty, isValid && !name_duplicates);
	}, [watchAllFields, isDirty, isValid, name_duplicates]);

	useEffect(changeModelHandler, [isDirty, isValid]);

	return (
		<Form.Base
			name={formOptions.id}
			dataTestId={formOptions.id}
			onChange={handleSubmit(changeModelHandler)}
			onBlur={handleSubmit(changeModelHandler)}
		>
			{/*  ============ Main form body ============ */}
			<Section>
				<div>
					<input
						type="hidden"
						{...register('valid', { value: !name_duplicates })}
					/>
				</div>
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
			<Section noSpacing>
				<Controller
					name="name"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row
							errors={inputErrorHandler(
								{
									duplicate: name_duplicates,
									required: errors?.name?.type == 'required',
								},
								t,
							)}
							responsiveMessages={'50%'}
						>
							<Input.Text
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__name`}
								label={t('form:input.name')}
								responsiveWidth={'50%'}
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
								defaultValue={''}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Text
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											id={`${formOptions.id}__${lng}__label`}
											label={`${lng.toUpperCase()}: ${t('form:input.label')}`}
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
			{/*  ============ \\ Main form body ============ */}
		</Form.Base>
	);
};

export default UploadsItemForm;
