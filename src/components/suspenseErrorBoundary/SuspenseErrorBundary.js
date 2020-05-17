import React, { Fragment } from 'react';
import { LoadingIndicator, Button } from 'components';
// import { queryCache } from 'react-query';

class SuspenseErrorBundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Zaktualizuj stan, aby następny render pokazał zastępcze UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
    // logErrorToMyService(error, errorInfo);
    console.log(error);
  }

  tryAgain = () => {
    // await queryCache.refetchQueries ('budget');
    this.setState({ hasError: false }) //wystarczy zmienić flagę i sprawdzanie będzie ponowione
  }

  render() {
    return <React.Suspense fallback={<LoadingIndicator />}>
      {this.state.hasError ? (
        <div>
          <h4>Coś poszło nie tak...</h4>
          <Button variant='Inline' onClick={() => this.tryAgain()}>Spróbuj jeszcze raz</Button>
        </div>
      ) : (
          <Fragment>
            {this.props.children}
          </Fragment>
        )
      }
    </React.Suspense>
  }
}

export default SuspenseErrorBundary;