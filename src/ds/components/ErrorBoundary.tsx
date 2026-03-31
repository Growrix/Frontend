"use client";

import * as React from "react";

export type FallbackProps = {
  error: Error;
  resetError: () => void;
};

export type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  fallbackRender?: (props: FallbackProps) => React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error,
          resetError: this.resetError,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="ui-error-page" role="alert">
          <div className="ui-error-page__heading text-label">Something went wrong</div>
          <p className="ui-error-page__description text-body-small">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            className="ui-btn ui-btn--secondary ui-btn--sm"
            onClick={this.resetError}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
