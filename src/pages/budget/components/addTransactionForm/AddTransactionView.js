import React from 'react';
import API from 'data/fetch';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import AddTransactionForm from './AddTransactionForm'
import { addTransaction } from 'data/actions/budget.actions';
import { connect } from 'react-redux';

function AddTransactionView({ addTransaction }) {

    const history = useHistory();
    const handleSubmitAddTransaction = (values) => {
        addTransaction({
            budgetId: budget.id,
            data: values,
        }).then(() => history.goBack())
    };
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);

    return <AddTransactionForm
        categories={allCategories}
        groupCategoriesBy={'parentCategory.name'}
        onSubmit={handleSubmitAddTransaction}
    />
}


export default connect(null, {
    addTransaction
})(AddTransactionView);

