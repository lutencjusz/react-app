import React, { Fragment } from 'react';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetCategoryList from './components/budgetCategoryList'
import BudgetTransactionList from './components/budgetTransactionList'
import AddTransactionView from './components/addTransactionForm'
import { Switch, Route } from 'react-router-dom'; // elementy Router możemy wstawiać w każdym dziecku
import { Grid } from './Budget.css';

function Budget() { //dispatchujemy, więc musimy odebrać w propsach

  // const isLoaded = useMemo(
  //   () => (!!commonState && Object.keys(commonState).length === 0) &&
  //     (!!budgetState && Object.keys(budgetState).length === 0),
  //   [commonState, budgetState]
  // )

  // console.log(isLoaded);
  // sprawdza, czy jest załadowane, jeżeli testujemy null to trzeba użyć !!

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
            <BudgetTransactionList />
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
