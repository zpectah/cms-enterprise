import React, { useState } from 'react';

import { Button, Dialog, Typography } from '../ui';

interface UploadsPickerProps {
	value: any;
	onChange: () => void;
	avatar?: boolean;
}

const UploadsPicker = ({
	value,
	onChange,
	avatar = false,
}: UploadsPickerProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<div>
				<Button
					variant="outlined"
					color="success"
					onClick={() => setDialogOpen(true)}
				>
					Open dialog
				</Button>
			</div>
			<div>what is selected - list</div>
			<Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
				<>
					<Typography.Paragraph p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						eget risus convallis turpis tincidunt maximus. Duis sed faucibus
						felis, sed facilisis tellus. Integer imperdiet sodales lectus, a
						molestie justo aliquam eget. Nunc semper nisi ligula, eget euismod
						quam sagittis eget. Integer et dui sed lorem tristique pulvinar.
						Cras lobortis velit erat, et efficitur odio vehicula eget. Mauris
						vehicula et lacus vel condimentum. Praesent dictum elit a tempus
						semper. Vivamus mi sapien, euismod in rutrum ac, posuere quis erat.
						Aenean et luctus mi. Etiam nec est rutrum, rutrum lacus eu, sagittis
						felis. Donec molestie justo mauris, ullamcorper faucibus metus
						maximus a. Fusce tristique felis a massa commodo, ac tristique purus
						lacinia. Mauris porta tellus id nulla elementum viverra ut id velit.
						Donec sit amet mauris volutpat, suscipit lectus sit amet, pretium
						purus. Aliquam finibus nisi nec purus semper, at imperdiet mi
						vehicula. Nulla dapibus, lacus eget posuere accumsan, leo elit
						sodales massa, quis eleifend libero velit maximus nibh. Curabitur
						pulvinar laoreet nulla, dapibus feugiat quam imperdiet eu. Duis in
						turpis eget orci fringilla tempus et sit amet purus. Nulla malesuada
						nec lectus vel elementum. Duis sit amet erat eu nisl congue aliquet.
						Aliquam pulvinar quis magna a lobortis. Aliquam eu ex eleifend,
						pharetra eros eu, ultrices turpis.
					</Typography.Paragraph>
				</>
			</Dialog>
		</>
	);
};

export default UploadsPicker;
