// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  // This method is called if an error occurs during rendering
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // This method is used for logging the error information
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="flex flex-col items-center justify-center h-96 bg-red-50 border border-red-300 rounded-lg p-8">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-800">Oops! Something went wrong.</h1>
          <p className="text-gray-600 mt-2">We encountered an error in this section of the app.</p>
          <details className="mt-4 text-sm text-gray-500 max-w-lg">
            <summary>Error Details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {this.state.error?.message}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
