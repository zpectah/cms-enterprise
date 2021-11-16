import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { PostsItemProps } from '../../types/app';
import { Form, Button, Section } from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import { getElTestAttr } from '../../utils/tests';

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onSubmit: (data: any, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
}

const PostsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
}: PostsDetailFormProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const { control, handleSubmit, reset, register, formState } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;
	const formOptions = {
		model: 'Posts',
		route: ROUTES.app.posts,
		...detailOptions,
	};

	const submitHandler = (data: PostsItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const buttonCreateCallback = () =>
		history.push(`${formOptions.route.path}${ROUTE_SUFFIX.detail}/new`);

	useEffect(() => reset(detailData), [detailData, reset]); // Important useEffect, must be for reloading form model !!!

	return (
		<>
			<ContentTitle
				title={'Posts ....detail'}
				listPath={formOptions.route.path}
				clickCallback={cancelHandler}
			/>
			<ModuleViewHeading alignOverride="flex-end">
				<Button
					variant="outlined"
					color="success"
					onClick={buttonCreateCallback}
					startIcon={<AddIcon />}
					dataAppId={`button.create.new.Posts`}
				>
					{t(`buttonNew.Posts`)}
				</Button>
			</ModuleViewHeading>
			<Form.DetailLayout
				formName="PostsDetailForm"
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
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
											label={t('form:input.active')}
										/>
									</Form.Row>
								)}
							/>
						</Section>
					</>
				}
				footerChildren={
					<>
						{/*  ============ Form actions button ============ */}
						<Button type="submit" variant="contained" disabled={!isValid}>
							{detailData.id == 'new' ? t('button.create') : t('button.update')}
						</Button>
						{detailData.id !== 'new' && (
							<Button variant="outlined" color="error" onClick={deleteHandler}>
								{t('button.delete')}
							</Button>
						)}
						<Button
							variant="outlined"
							color="secondary"
							onClick={cancelHandler}
						>
							{t('button.return')}
						</Button>
					</>
				}
				dataAppId={'PostsDetailForm'}
			>
				{/*  ============ Main form body ============ */}
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
									label={t('form:input.name')}
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
