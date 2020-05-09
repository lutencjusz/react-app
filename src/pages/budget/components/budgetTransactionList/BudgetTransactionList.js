import React from 'react';
import {List, ListItem} from './BudgetTransactionList.css'
import {groupBy} from 'lodash';
import {connect} from 'react-redux';
import {formatCurrency, formatDate} from 'utils';
import {useTranslation} from 'react-i18next';

function BudgetTransactionList({transactions, allCategories}) {

    const {i18n} = useTranslation();
    const groupedTransactions = groupBy(
        transactions,
        transaction => new Date(transaction.date).getUTCDate() // pobiera dzień miesiąca z daty
    )

    console.log(groupedTransactions);

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
    allCategories: state.common.allCategories
}))(BudgetTransactionList);