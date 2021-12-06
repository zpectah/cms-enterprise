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
import { getLanguagesFields } from '../../utils/detail';

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
	const { t } = useTranslation(['common', 'form']);
	const formOptions: formLayoutObjectProps = {
		model: 'Uploads',
		id: `UploadsItemDetailForm_${index}`,
	};
	const { control, formState, watch, handleSubmit } = useForm({
		mode: 'all',
		defaultValues: {
			...file,
		},
	});
	const { isDirty, isValid } = formState;
	const watchAllFields = watch();
	const changeModelHandler = useCallback(
		() => onModelChange(watchAllFields, index, isDirty, isValid),
		[watchAllFields],
	);

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
				<Button
					variant="outlined"
					color="error"
					onClick={() => onRemove(index)}
				>
					{t('button.removeFromQueue')}
				</Button>
			</Section>
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
			<Section noSpacing>
				<Controller
					name="name"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__name`}
								label={t('form:input.name')}
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
