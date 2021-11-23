import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section } from '../../components/ui';

interface ProfileFormProps {
	formData: any;
	onSubmit: (data: any, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
}

const ProfileForm = ({
	formData,
	onSubmit,
	onSubmitError,
}: ProfileFormProps) => {
	const { t } = useTranslation(['common', 'form']);

	const formOptions: formLayoutObjectProps = {
		model: 'Profile',
		id: 'ProfileForm',
	};
	const { control, handleSubmit, reset, register, formState } = useForm({
		mode: 'all',
		defaultValues: {
			...formData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: any, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (error: any, e: any) => onSubmitError(error, e);

	const renderFooter = () => {
		return (
			<>
				<Button type="submit" variant="contained" disabled={!isValid}>
					{t('button.update')}
				</Button>
			</>
		);
	};

	return (
		<>
			<Form.Layout
				formName={formOptions.id}
				dataTestId={formOptions.id}
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				footerChildren={renderFooter()}
			>
				<Section> form section </Section>
			</Form.Layout>
		</>
	);
};

export default ProfileForm;
