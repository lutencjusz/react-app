import React, {useMemo} from 'react';
import {ParentCategory as Root, CategoryAmount} from './BudgetCategoryList.css'; // as, bo jest konflikt nazw
import {formatCurrency} from 'utils'
import {useTranslation} from 'react-i18next';

function ParentCategory ({name, onClick, categories, transactions, amount}) {

    const {i18n} = useTranslation();

    const categoryLeftValue = useMemo(() => {

        if(!!amount) return null;

        const budgeted = (()=>{ // funkcja samo wywołująca się
            try { // bo czasmi nie zdąży zwrócić categories
                return categories.reduce((acc, category) => acc + category.budget, 0) //sumuje acc z category.budget
            } catch (error) {
                return null;
            }
        })()
        //console.log(budgeted)

        const parentCategoryTransactions = transactions // znajdujemy transakcje podpięte pod parent category
            .filter(transaction => {
                return categories.find(category => category.categoryId === transaction.categoryId)
            });
        //console.log(parentCategoryTransactions)
        
        const spendOnParentCategory = parentCategoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        // ile wydane w danej kategorii
        //console.log(spendOnParentCategory)

        const totalLeft = budgeted // skrawdzamy, czy nie został w trycatch zwrócony null
            ?  budgeted - spendOnParentCategory : 
            null
        
        return totalLeft; // zwracamy, żeby trafiło do categoryLeftValue
    }, [categories, transactions, amount])
    
    const amountValue = useMemo( // wylicza kwotę ParentCategory albo podaje sumę całkowitą
        () => amount || categoryLeftValue, [categoryLeftValue, amount]
    )

    // span, żeby w jednej linijce
    return <Root onClick={onClick}>
        <span>{name}</span>
        <CategoryAmount negative = {amountValue < 0}>
            {formatCurrency(amountValue, i18n.language)}
        </CategoryAmount>

    </Root>
}

export default ParentCategory;