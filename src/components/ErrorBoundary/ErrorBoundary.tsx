import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center py-5">
          <h1 className="h3 text-danger mb-3">Algo deu errado</h1>
          <p className="text-muted mb-4">Ocorreu um erro inesperado na aplicação.</p>
          <button className="btn btn-dark" onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
