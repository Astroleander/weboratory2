import React from 'react';
import Alert from '../components/fallbacks/Alert';

// TODO: https://github.com/JoschuaSchneider/use-error-boundary provides didCatch control which is not implemented here

type ErrorObject = { error: any, errorInfo: any } 
type onDidCatchCallback = (error: any, errorInfo: any) => void

interface ErrorBoundaryProps {
  onDidCatch?: onDidCatchCallback,
  children?: React.ReactNode | JSX.Element
  fallback?: (error: ErrorObject) => React.ReactNode | JSX.Element
}

interface ErrorBoundaryState {
  hasError: boolean
  error: any
}

class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }
  
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    let callback = this.props.onDidCatch || (() => {})
    return callback(error, errorInfo)
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    console.log(hasError, error, children, fallback)

    // catch error => fallback
    // else        => children

    if (hasError) {
      if (fallback) return fallback(error);
      return /* default fallback error*/<Alert type="error">{error.message}</Alert>
    }
    return children;
  }
}

const createErrorBoundary: (onDidCatch?: onDidCatchCallback) => (props: ErrorBoundaryProps) => React.ReactElement = ( onDidCatch? ) => {
  // Return function component that wraps ErrorBoundary and passes props to it
  return (props: ErrorBoundaryProps) => {
    // Return ErrorBoundary with original onDidCatch and the current props
    return React.createElement(ErrorBoundary, {
      onDidCatch: props.onDidCatch,
      children: props.children,
      fallback: props.fallback,
    })
  }
}

export const useErrorBoundary: (onDidCatch?: onDidCatchCallback) => (props: ErrorBoundaryProps) => React.ReactElement = ( onDidCatch ) => {
  const errorBoundary = onDidCatch ? createErrorBoundary(onDidCatch) : createErrorBoundary()
  return errorBoundary;
}