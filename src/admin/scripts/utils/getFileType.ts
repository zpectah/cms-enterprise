import config from '../config';

export const getFileTypeByExtension = (filename) => {
	const regex = /(?:\.([^.]+))?$/;

	return getFileType(regex.exec(filename)[1]);
};

export const getFileType = (ext) => {
	let type = 'undefined';

	if (config.options.model.Uploads.image.extension.indexOf(ext) !== -1)
		type = 'image';
	if (config.options.model.Uploads.audio.extension.indexOf(ext) !== -1)
		type = 'audio';
	if (config.options.model.Uploads.video.extension.indexOf(ext) !== -1)
		type = 'video';
	if (config.options.model.Uploads.document.extension.indexOf(ext) !== -1)
		type = 'document';
	if (config.options.model.Uploads.archive.extension.indexOf(ext) !== -1)
		type = 'archive';

	return type;
};
