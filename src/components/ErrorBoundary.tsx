import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Iris Biotech App:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#141715] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border border-[#E4DFD5] bg-[#F3EFE6] flex items-center justify-center mb-6 shadow-sm">
            <AlertTriangle className="w-8 h-8 text-[#1E3926]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#88928A] block mb-2">
            System Notification
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif mb-3 text-[#141715]">Something went wrong.</h1>
          <p className="text-[#58615A] max-w-md text-sm mb-8 leading-relaxed font-light">
            An unexpected error occurred while loading this section. Please refresh or return to the main catalog.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] bg-[#1E3926] hover:bg-[#141715] text-[#FAF8F5] transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] bg-[#EAE5D9] hover:bg-[#D9D2C1] text-[#141715] transition-colors"
            >
              <Home className="w-4 h-4" /> Return Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
