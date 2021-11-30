import React, { ErrorInfo } from 'react';

import LogsService from '../../services/Logs.service';

interface ErrorBoundaryProps {}

interface ErrorBoundaryStateProps {
	isError: boolean;
	error: Error;
	errorInfo: ErrorInfo;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryStateProps
> {
	constructor(props) {
		super(props);
		this.state = { isError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { isError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ isError: true, error, errorInfo });
		console.error(error, errorInfo);
		LogsService.create({
			user: 'anonymous',
			method: '' + error,
			status: 'error',
		});
	}

	render() {
		if (this.state.isError) {
			// TODO: create error view with error message
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
