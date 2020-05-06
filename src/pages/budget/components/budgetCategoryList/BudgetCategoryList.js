import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {groupBy} from 'lodash';
import {ToggleableList} from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import {useTranslation} from 'react-i18next';
import 'styled-components/macro'; // żeby używać CSS styled components

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

    //console.log({listItems});

    const totalSpent = budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    //console.log({totalSpent});

    const restToSpent = budget.totalAmount - totalSpent; // ile zostało do wydania całkowicie
    
    //console.log({restToSpent});

    let amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.categoryId === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        
        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0);

    //console.log({amountTaken});

    const notBudgetedTransaction = budget.transactions
        .filter(transaction => !budgetedCategories.find(budgetedCategories => budgetedCategories.id === transaction.categoryId)) 
        // te które nie zostały odnalezione
    
    const notBudgetedExpenses = notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0)

    //console.log({notBudgetedExpenses});

    const availableAmountForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

    // console.log({availableAmountForRestCategories});

    // props css formatuje bez dodawania kolejnej klasy
    return (
        <Fragment>
            <div css={`
                border-bottom: 5px solid ${({ theme }) => theme.colors.grey.light}
            `}>
                <ParentCategory
                    name={budget.name}
                    amount={restToSpent}
                />
            </div>
            <ToggleableList
                items={listItems}
            />
            <div css={`
                border-top: 5px solid ${({ theme }) => theme.colors.grey.light}
            `}>
                <ParentCategory
                    name={t('Other categories')}
                    amount={availableAmountForRestCategories}
                />
            </div>
        </Fragment>
    )

}

export default connect( state => ({ // dane do brania ze Store
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget
}))(BudgetCategoryList);