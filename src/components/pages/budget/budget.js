import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetedCategories} from 'components/data/actions/budget.actions';
import {fetchAllCategories} from 'components/data/actions/common.actions';

function Budget({fetchBudget, fetchBudgetedCategories, fetchAllCategories}) { //dispatchujemy, więc musimy odebrać w propsach
    useEffect(() => {
        fetchBudget(1); // odpalenie akcji pobierania budżetu
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    return (
        <h3>Budget</h3>
    )
}

export default connect(state =>{
    return {
      budget: state.budget.budget,
      common: state.common.common
    }
  }, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
})(Budget)
