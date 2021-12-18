import React, { ErrorInfo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import WarningIcon from '@mui/icons-material/Warning';

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
		console.error(error);
		console.info(errorInfo);
		LogsService.create({
			method: 'ErrorBoundary',
			status: 'error',
			content: String(error),
		});
	}

	render() {
		if (this.state.isError) {
			return (
				<Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
					<div>
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								paddingBottom: '1.5rem',
							}}
						>
							<WarningIcon fontSize="large" />
						</div>
						<div>
							<p>Something went wrong, see details in console</p>
							{this.state.error && <pre>{String(this.state.error)}</pre>}
						</div>
					</div>
				</Backdrop>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
