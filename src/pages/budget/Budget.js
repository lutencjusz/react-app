import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addTransaction } from 'data/actions/budget.actions';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetCategoryList from './components/budgetCategoryList'
import BudgetTransactionList from './components/budgetTransactionList'
import AddTransactionForm from './components/addTransactionForm'
import { Switch, Route, useHistory } from 'react-router-dom'; // elementy Router możemy wstawiać w każdym dziecku
import { Grid } from './Budget.css';

function Budget({
  commonState, budgetState, allCategories, budget,
  addTransaction
}) { //dispatchujemy, więc musimy odebrać w propsach
  const history = useHistory();
  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      data: values,
    }).then(() => history.goBack())
  }

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
          <Modal><AddTransactionForm
            categories={allCategories}
            groupCategoriesBy={'parentCategory.name'}
            onSubmit={handleSubmitAddTransaction}
          /></Modal>
        </Route>
      </Switch>
    </Fragment>

  )
}

export default connect(state => {
  return { // podaje propsy dla Budget
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState,
  }
}, { // podaje w propsach akcje
  addTransaction,
})(Budget)
