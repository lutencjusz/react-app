import React, {useEffect, useMemo, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetedCategories, addTransaction} from 'data/actions/budget.actions';
import {fetchAllCategories} from 'data/actions/common.actions';
import {LoadingIndicator, Modal, Button} from 'components';
import BudgetCategoryList from './components/budgetCategoryList'
import BudgetTransactionList from './components/budgetTransactionList'
import AddTransactionForm from './components/addTransactionForm'
import {Switch, Route} from 'react-router-dom'; // elementy Router możemy wstawiać w każdym dziecku

import {Grid} from './Budget.css';

function Budget({
  commonState, budgetState, allCategories, budget,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction
}) { //dispatchujemy, więc musimy odebrać w propsach
    useEffect(() => {
        fetchBudget(1); // odpalenie akcji pobierania budżetu
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const handleSubmitAddTransaction = (values) => {
      addTransaction ({
        budgetId: budget.id, 
        data: values,
      })
    }
    
    const isLoaded = useMemo(
      () => (!!commonState && Object.keys(commonState).length === 0) && 
      (!!budgetState && Object.keys(budgetState).length === 0), 
      [commonState, budgetState]
    )

    // console.log(isLoaded);
    // sprawdza, czy jest załadowane, jeżeli testujemy null to trzeba użyć !!

    return (
      <Fragment>
        <Grid>
          <section>
            {isLoaded ? <BudgetCategoryList/> : <LoadingIndicator/>}
          </section>
          <section>
            {isLoaded ? 
              <Fragment>
                <Button to="/budget/transaction/new" variant='Inline'>Add new transaction</Button>
                <BudgetTransactionList/>
              </Fragment>: 
              <LoadingIndicator/>}
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

export default connect(state =>{
    return { // podaje propsy dla Budget
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
    }
  }, { // podaje w propsach akcje
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
})(Budget)
