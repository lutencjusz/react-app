import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {groupBy} from 'lodash';
import {ToggleableList} from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import {useTranslation} from 'react-i18next';

function BudgetCategoryList({budgetedCategories, allCategories, budget}) { // pobiera dane bezpośrednio ze store poprze connect

    const {t} = useTranslation();
    const budgetedCategoriesByParents = groupBy(
        budgetedCategories, 
        item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    )

    const listItems = Object.entries(budgetedCategoriesByParents)
        .map(([parentName, categories]) => ({
                id: parentName,
                Trigger: ({onClick}) => (
                    <ParentCategory
                        name={parentName}
                        onClick={() => onClick(parentName)}
                        categories = {categories}
                        transactions = {budget.transactions}
                    />
                ),
                children: categories.map(budgetedCategory =>{
                    const {name} = allCategories.find(category => category.id === budgetedCategory.categoryId)
                    return (
                    <CategoryItem
                        key={budgetedCategory.id}
                        name={name}
                        item={budgetedCategory}
                        transactions={budget.transactions}
                    />

                    )
                })
        })
    );

    const totalSpent = budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const restSpent = budget.totalAmount - totalSpent; // ile zostało do wydania całkowicie
    
    let amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.categoryId === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        
        return acc + Math.max(categoryExpenses, budgetedCategories.budget);
    }, 0);

    /*if (isNaN(amountTaken)) {
        console.log('jest NaN')
        amountTaken = 0;
    }
    console.log({amountTaken});*/

    const notBudgetedTransaction = budget.transactions
        .filter(transaction => !budgetedCategories.find(budgetedCategories => budgetedCategories.id === transaction.categoryId)) 
        // te które nie zostały odnalezione
    
    const notBudgetedExpenses = notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0)

    const availableAmountForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

    console.log({availableAmountForRestCategories});

    return (
        <Fragment>
            <ParentCategory
                name={budget.name}
                amount={restSpent}
            />
            <div>
                <ToggleableList
                    items={listItems}
                />
            </div>
            <ParentCategory
                name={t('Other categories')}
                amount={availableAmountForRestCategories}
            />
        </Fragment>

    )

}

export default connect( state => ({ // dane do brania ze Store
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget

}))(BudgetCategoryList);