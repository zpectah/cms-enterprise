import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CommentsItemProps } from '../../types/model';
import { Button, Form, Input, Section } from '../ui';

interface ReplyFormProps {
	formData: CommentsItemProps;
	onSubmit: (data: CommentsItemProps) => void;
}

const ReplyForm = ({ formData, onSubmit }: ReplyFormProps) => {
	const { t } = useTranslation(['common', 'form', 'messages']);
	const formId = 'ReplyForm';
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			...formData,
		},
	});

	const submitHandler = (data: CommentsItemProps, e: any) => {
		onSubmit(data);
		reset();
	};

	return (
		<Form.Base
			name={formId}
			dataTestId={formId}
			onSubmit={handleSubmit(submitHandler)}
		>
			<div>
				<input type="hidden" {...register('parent', { required: true })} />
				<input type="hidden" {...register('email', {})} />
				<input type="hidden" {...register('assigned', {})} />
				<input type="hidden" {...register('assigned_id', {})} />
			</div>
			<Section>
				<Controller
					name="title"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formId}__title`}
								label={t('form:input.title')}
								dataTestId={`${formId}.input.title`}
								required
							/>
						</Form.Row>
					)}
				/>
				<Controller
					name="content"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formId}__content`}
								label={t('form:input.content')}
								dataTestId={`${formId}.input.content`}
								required
								multiline
								rows={10}
							/>
						</Form.Row>
					)}
				/>
			</Section>
			<Section>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					disabled={!isValid}
				>
					{formData.mode == 'edit' ? t('button.update') : t('button.reply')}
				</Button>
			</Section>
		</Form.Base>
	);
};

export default ReplyForm;
