import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    if (typeof window !== "undefined" && window.reportError) {
      window.reportError(error);
    }
  }

  handleReload = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });

    window.location.reload();
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-20 top-20 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute right-20 top-40 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute left-40 bottom-20 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-orange-50/20 to-pink-50/30 -z-10"></div>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6 relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full opacity-10 animate-ping"></div>
                  <svg
                    className="h-8 w-8 text-red-600 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Oops! Something went wrong
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  We encountered an unexpected error while loading the
                  application. Don't worry, this is usually temporary and can be
                  fixed easily.
                </p>

                {this.state.error && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Error Details:
                    </h3>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      {this.state.error.toString()}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Try Again
                  </button>

                  <button
                    onClick={this.handleReload}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Reload Page
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    If the problem persists, please try refreshing your browser
                    or contact support.
                  </p>
                  <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <span>Error ID: {Date.now()}</span>
                    <span>•</span>
                    <span>JobPsych AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
