import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Form, Button, Section } from '../../components/ui';
import { getElTestAttr } from '../../utils/tests';

interface PostsDetailFormProps {
	detailData: any; // TODO
	onSubmit: (data: any, e: any) => void;
	onSubmitError?: (error: any, e: any) => void;
}

const PostsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
}: PostsDetailFormProps) => {
	const { control, handleSubmit, reset, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	const submitHandler = (data, e) => onSubmit(data, e);
	const errorSubmitHandler = (errors, e) => {
		if (onSubmitError) onSubmitError(errors, e);
	};

	useEffect(() => reset(detailData), [detailData, reset]); // Important, must be for reloading form model ...

	return (
		<Form.DetailLayout
			formName="PostsDetailForm"
			onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
			sidebarChildren={
				<>
					<div>
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
					</div>
				</>
			}
			footerChildren={
				<>
					<Button type="submit" variant="contained">
						Submit
					</Button>
					<Button variant="contained" color="error">
						Delete
					</Button>
					<Button variant="outlined" color="secondary">
						Cancel
					</Button>
				</>
			}
			dataAppId={'PostsDetailForm'}
		>
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
	);
};

export default PostsDetailForm;
