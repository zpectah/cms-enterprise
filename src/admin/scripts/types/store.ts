export interface toastItemProps {
	id?: string;
	title: string;
	context: 'default' | 'success' | 'error';
	timeout?: number;
}

export interface storeProps {
	language: string;
	theme: string;
	sideBarOpen: boolean;
	toasts: toastItemProps[];
}
