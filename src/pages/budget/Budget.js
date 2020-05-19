import React, { Fragment, useState } from 'react';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import { Switch, Route } from 'react-router-dom'; // elementy Router możemy wstawiać w każdym dziecku
import { Grid } from './Budget.css';

const BudgetTransactionList = React.lazy(()=> import('./components/budgetTransactionList')); //lazy daje code splitting 
const BudgetCategoryList = React.lazy(()=> import('./components/budgetCategoryList')); 
const AddTransactionView = React.lazy(()=> import('./components/addTransactionForm')); 

function Budget() { //dispatchujemy, więc musimy odebrać w propsach

  // const isLoaded = useMemo(
  //   () => (!!commonState && Object.keys(commonState).length === 0) &&
  //     (!!budgetState && Object.keys(budgetState).length === 0),
  //   [commonState, budgetState]
  // )

  // console.log(isLoaded);
  // sprawdza, czy jest załadowane, jeżeli testujemy null to trzeba użyć !!

  const [showTransactions, setShowTransactions] = useState();

  return (
    <Fragment>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to="/budget/transaction/new" variant='Inline'>Add new transaction</Button>
            <Button onClick={() => { setShowTransactions(!showTransactions) }} variant='Inline'>
              {showTransactions ? 'Hide transactions' : 'Show transactions'}
            </Button>
            {showTransactions && <BudgetTransactionList />}
          </SuspenseErrorBoundary>
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transaction/new">
          <SuspenseErrorBoundary>
            <Modal>
              <AddTransactionView />
            </Modal>
          </SuspenseErrorBoundary>
        </Route>
      </Switch>
    </Fragment>

  )
}

export default Budget
