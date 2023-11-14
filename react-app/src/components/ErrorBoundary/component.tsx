import React, { ReactNode, ErrorInfo } from 'react';
import { Heading1 } from '../TextComponents/Heading1';
import { Body2 } from '../TextComponents/Body2';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error(error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return (
				<>
					<Heading1>Something went wrong.</Heading1>
					<Body2>Please refresh the page or try again later.</Body2>
				</>
			);
		}

		return this.props.children;
	}
}
