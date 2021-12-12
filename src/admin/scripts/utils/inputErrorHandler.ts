export default (
	attrs: {
		duplicate?: boolean;
		minLength?: boolean;
		maxLength?: boolean;
		minValue?: boolean;
		maxValue?: boolean;
		required?: boolean;
	},
	t,
) => {
	let list = [];
	if (attrs.duplicate) list.push(t('form:messages.error_duplicate'));
	if (attrs.minLength) list.push(t('form:messages.error_minLength'));
	if (attrs.maxLength) list.push(t('form:messages.error_maxLength'));
	if (attrs.minValue) list.push(t('form:messages.error_minValue'));
	if (attrs.maxValue) list.push(t('form:messages.error_maxValue'));
	if (attrs.required) list.push(t('form:messages.error_required'));

	return list;
};
