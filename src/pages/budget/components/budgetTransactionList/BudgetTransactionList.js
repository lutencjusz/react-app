import React from 'react';
import {List, ListItem} from './BudgetTransactionList.css'
import {groupBy} from 'lodash';
import {connect} from 'react-redux';
import {formatCurrency, formatDate} from 'utils';
import {useTranslation} from 'react-i18next';

function BudgetTransactionList({transactions, allCategories, selectedParentCategoryId, budgetedCategories}) {
    const {i18n} = useTranslation();

    const filteredTransactionsBySelectedParentCategory = (()=>{
        console.log({selectedParentCategoryId})
        if (typeof selectedParentCategoryId === 'undefined') { // jeżeli jest undefined, to musi być typeof, bo null jest false
            return transactions
        } else if (selectedParentCategoryId === null) {
            return transactions.filter(transaction => {
                const hasBudgetCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.id === transaction.categoryId)
                //.some zwraca true, jeżeli chociaż jedna iterecja zwraca true
                return !hasBudgetCategory // zwróć te, które nie mają zabudżetowenej kategorii
            })
        } else {
            return transactions.filter(transaction =>{
                // filtruje wszystkie transakcje w ramach budżetu, których kategotria należy do kategorii wyższego rzędu
                // wybranej przeżytkownika
                try {
                    const category = allCategories.find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name;
                    return parentCategoryName === selectedParentCategoryId;           
                } catch (error) {
                    return false;
                }
            })
        }

    })() // funkcja się samowywołuje


    //console.log({filteredTransactionsBySelectedParentCategory})

    const groupedTransactions = groupBy(
        filteredTransactionsBySelectedParentCategory,
        transaction => new Date(transaction.date).getUTCDate() // pobiera dzień miesiąca z daty
    )

    //console.log(groupedTransactions);

    return <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) =>(
                <li key={key}>
                    <ul>
                        {transactions.map(transaction =>(
                            <ListItem key={transaction.id}>
                                    <div>{transaction.description}</div>
                                    <div>{formatCurrency(transaction.amount, i18n.language)}</div>
                                    <div>{formatDate(transaction.date, i18n.language)}</div>
                                    <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                            </ListItem>
                        ))}
                    </ul>
                </li>

            ))}
    </List>
}

export default connect ( state => ({
    transactions: state.budget.budget.transactions,
    allCategories: state.common.allCategories,
    budgetedCategories: state.budget.budgetCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId

}))(BudgetTransactionList);