import React from 'react';
import '@/pages/Error.css';
import errorLogo from '@/img/earth.jpg';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Ошибка в React-компоненте:', error);
    console.error('Подробности ошибки:', errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="notfound-page">
          <div className="notfound-card">
            <img src={errorLogo} alt="Логотип" className="notfound-logo" />

            <h1 className="notfound-title">Что-то пошло не так</h1>
            <p className="notfound-text">
              В приложении произошла ошибка. Попробуйте обновить страницу или вернуться на главную.
            </p>

            <div className="notfound-actions">
              <button type="button" className="notfound-btn primary" onClick={this.handleReload}>
                Обновить страницу
              </button>

              <button type="button" className="notfound-btn secondary" onClick={this.handleGoHome}>
                На главную
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
