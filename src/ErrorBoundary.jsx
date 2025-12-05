import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // also log to console
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div className="min-h-screen bg-black text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">An error occurred</h1>
            <pre className="mt-4 p-4 bg-white/5 rounded text-sm overflow-auto" style={{whiteSpace: 'pre-wrap'}}>
              {String(error && error.toString())}
              {info && info.componentStack ? '\n\n' + info.componentStack : ''}
            </pre>
            <p className="mt-4 text-gray-400">Check the browser console for more details.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
