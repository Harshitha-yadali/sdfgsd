import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1e1e] via-[#0d1a1a] to-[#070b14] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>

            <p className="text-slate-300 text-center mb-6">
              We encountered an unexpected error. Don't worry, your data is safe. Please try reloading the page.
            </p>

            {this.state.error && (
              <details className="mb-6 bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <summary className="cursor-pointer text-slate-400 hover:text-slate-300 font-medium mb-2">
                  Technical Details
                </summary>
                <div className="mt-3 space-y-2">
                  <div className="text-sm">
                    <span className="text-red-400 font-semibold">Error:</span>
                    <pre className="mt-1 text-slate-300 whitespace-pre-wrap break-words font-mono text-xs">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div className="text-sm">
                      <span className="text-orange-400 font-semibold">Stack Trace:</span>
                      <pre className="mt-1 text-slate-400 whitespace-pre-wrap break-words font-mono text-xs max-h-48 overflow-y-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-sm text-slate-400">
                If this problem persists, please contact our support team at{' '}
                <a
                  href="mailto:primoboostai@gmail.com"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  primoboostai@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
