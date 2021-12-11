import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import config from '../../config';
import { Input, Button, Preloader } from '../../components/ui';
import { useSystem } from '../../hooks/common';

const StyledList = styled.ul`
	width: 200px;
	margin: 0;
	padding: 0;
	list-style: none;
`;
const StyledListItem = styled.li`
	width: 100%;
	margin: 0 0 0.5rem 0;
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(69, 90, 100, 0.125);
	border-radius: 0.25rem;
`;
const NoItemsLabel = styled.span`
	width: 200px;
	margin: 0 0 0.5rem 0;
	padding: 0.6125rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: transparent;
`;

interface LanguageInstallerProps {
	installedLanguages: string[];
	afterInstall: () => void;
}

interface langItemProps {
	lang: string;
	status: 'pending' | 'done';
}

const LanguageInstaller = ({
	installedLanguages,
	afterInstall,
}: LanguageInstallerProps) => {
	const { installLanguage } = useSystem();
	const { t } = useTranslation(['common', 'form', 'components']);
	const [queue, setQueue] = useState<langItemProps[]>([]);
	const [selected, setSelected] = useState<langItemProps[]>([]);
	const [selectedProcessed, setSelectedProcessed] = useState<langItemProps[]>(
		[],
	);
	const [processing, setProcessing] = useState(false);

	const getLanguageOptions = useCallback(() => {
		const languagesObjects = config.locales;
		const languagesKeys = Object.keys(languagesObjects);
		let options = [];
		languagesKeys.map((lang) => {
			options.push({
				label: languagesObjects[lang].label,
				value: lang,
				disabled: !!installedLanguages.find((lng) => lng == lang),
			});
		});

		return options;
	}, []);
	const languageOptions = getLanguageOptions();

	const onFinishHandler = (items: langItemProps[]) => {
		setSelectedProcessed(items);
		setSelected([]);
		setQueue([]);
		setProcessing(false);
		afterInstall();
	};

	const installQueueHandler = () => {
		setProcessing(true);
		let tmp = [];
		queue.map((lang) => {
			installLanguage({ lang: lang.lang }).then((response) => {
				tmp.push(response);
				if (tmp.length == queue.length) onFinishHandler(tmp);
			});
		});
	};

	useEffect(() => {
		if (selected) {
			let tmp = [];
			selected.map((lng) => tmp.push({ lang: lng, status: 'pending' }));
			setQueue(tmp);
		}
	}, [selected]);

	return (
		<>
			<Stack spacing={2} direction="row">
				<div>
					{languageOptions ? (
						<Input.Select
							value={selected}
							onChange={(e) => setSelected(e.target.value as any)}
							options={languageOptions}
							style={{ width: '200px' }}
							label={t('components:LanguageInstaller.input_label')}
							labelId={'LanguageInstaller_select_lang'}
							multiple
						/>
					) : (
						<Skeleton animation="wave" width={'200px'} />
					)}
				</div>
				<div>
					{queue.length > 0 ? (
						<StyledList>
							{queue.map((lng) => (
								<StyledListItem key={lng.lang}>
									<span>{config.locales[lng.lang].label}</span>
								</StyledListItem>
							))}
						</StyledList>
					) : (
						<NoItemsLabel>
							{t('components:LanguageInstaller.noItemsSelected')}
						</NoItemsLabel>
					)}
				</div>
				<div>
					<Button
						variant="contained"
						color="success"
						onClick={installQueueHandler}
						disabled={processing || selected.length == 0}
						loading={processing}
					>
						{t('components:LanguageInstaller.button_install')}
					</Button>
				</div>
			</Stack>
			<Stack spacing={1} direction="row" style={{ paddingTop: '1rem' }}>
				{processing && <Preloader.Block />}
				{selectedProcessed.map((lng) => (
					<Chip
						key={lng.lang}
						label={config.locales[lng.lang].label}
						color="success"
						variant="outlined"
					/>
				))}
			</Stack>
		</>
	);
};

export default LanguageInstaller;
