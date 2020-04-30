import React from 'react';
import {connect} from 'react-redux';
import {groupBy} from 'lodash';

function BudgetCategoryList({budgetedCategories, allCategories}) { // pobiera dane bezpośrednio ze store
    const budgetedCategoriesByParents = groupBy(
        budgetedCategories, 
        item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    )

    console.log(budgetedCategoriesByParents);

    return (
        <div>BudgetCategoryList</div>
    )

}

export default connect( state => ({
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories
}))(BudgetCategoryList);