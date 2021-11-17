import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storeProps, toastItemProps } from '../../types/store';
import { removeToast } from '../../store/actions';
import ToastList from './ToastList';

interface ToastsModuleProps {}

const ToastsModule = ({}: ToastsModuleProps) => {
	const { toasts } = useSelector((store: storeProps) => store);
	const dispatch = useDispatch();
	const [itemsList, setItemsList] = useState<toastItemProps[]>(toasts);

	useEffect(() => setItemsList(toasts), [toasts]);

	const removeHandler = (data) => {
		dispatch(removeToast(data));
	};

	return <ToastList items={itemsList} onRemove={removeHandler} />;
};

export default ToastsModule;
