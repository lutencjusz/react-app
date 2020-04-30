import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetedCategories} from 'components/data/actions/budget.actions';
import {fetchAllCategories} from 'components/data/actions/common.actions';
import {LoadingIndicator} from 'components';
import BudgetCategoryList from './components/budgetCategoryList'

import {Grid} from './Budget.css';

function Budget({
  commonState, budgetState,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories
}) { //dispatchujemy, więc musimy odebrać w propsach
    useEffect(() => {
        fetchBudget(1); // odpalenie akcji pobierania budżetu
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const isLoaded = useMemo(
      () => (!!commonState && Object.keys(commonState).length === 0) && 
      (!!budgetState && Object.keys(budgetState).length === 0), 
      [commonState, budgetState]
    )

    console.log(isLoaded);
    // sprawdza, czy jest załadowane, jeżeli testujemy null to trzeba użyć !!

    return (
        <Grid>
          <section>
            {isLoaded ? <BudgetCategoryList/> : <LoadingIndicator/>}
          </section>
          <section>
            {isLoaded ? <h2>Nagłówki</h2>: <LoadingIndicator/>}
          </section>
        </Grid>
    )
}

export default connect(state =>{
    return { // podaje propsy dla Budget
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState
    }
  }, { // podaje w propsach akcje
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
})(Budget)
