import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import { postsItemProps } from './types';
import { Form, Button, ButtonCreate, Section } from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import { getElTestAttr } from '../../utils/tests';

interface PostsDetailFormProps {
	detailData: postsItemProps;
	onSubmit: (data: any, e: any) => void;
	onSubmitError?: (error: any, e: any) => void;
	detailOptions: {};
}

const PostsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
}: PostsDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const { control, handleSubmit, reset, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	const formOptions = {
		model: 'Posts',
		route: ROUTES.app.posts,
		...detailOptions,
	};

	const submitHandler = (data, e) => onSubmit(data, e);
	const errorSubmitHandler = (errors, e) => {
		if (onSubmitError) onSubmitError(errors, e);
	};

	useEffect(() => reset(detailData), [detailData, reset]); // Important, must be for reloading form model ...

	return (
		<>
			<ContentTitle
				title={'Posts ....detail'}
				listPath={formOptions.route.path}
			/>
			<ModuleViewHeading alignOverride="flex-end">
				<ButtonCreate pathPrefix={formOptions.route.path}>
					{t(`buttonNew.Posts`)}
				</ButtonCreate>
			</ModuleViewHeading>
			<Form.DetailLayout
				formName="PostsDetailForm"
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				sidebarChildren={
					<>
						{/*  ============ Form sidebar  ============ */}
						<Section>
							<Controller
								name="active"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<FormControlLabel
											control={
												<Switch
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id="PostsDetailForm__active"
													size="small"
													{...getElTestAttr('PostsDetailForm.checkbox.active')}
												/>
											}
											label="Checkbox Label"
										/>
									</Form.Row>
								)}
							/>
						</Section>
					</>
				}
				footerChildren={
					<>
						{/*  ============ Form actions button  ============ */}
						<Button type="submit" variant="contained">
							Submit
						</Button>
						<Button variant="outlined" color="error">
							Delete
						</Button>
						<Button variant="outlined" color="secondary">
							Cancel
						</Button>
					</>
				}
				dataAppId={'PostsDetailForm'}
			>
				{/*  ============ Main form body  ============ */}
				<div>
					<input
						type="hidden"
						// name="id"
						{...register('id', { required: true })}
					/>
				</div>
				<Section>
					<Controller
						name="name"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<TextField
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id="PostsDetailForm__name"
									label="Name"
									variant="outlined"
									size="small"
									style={{ width: '100%' }}
									{...getElTestAttr('PostsDetailForm.input.name')}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>...form...{JSON.stringify(detailData)}...</Section>
			</Form.DetailLayout>
		</>
	);
};

export default PostsDetailForm;
