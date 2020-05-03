import React, {useMemo} from 'react';
import {ParentCategory as Root, CategoryAmount} from './BudgetCategoryList.css'; // as, bo jest konflikt nazw

function ParentCategory ({name, onClick, categories, transactions}) {

    const categoryLeftValue = useMemo(() => {
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
    }, [categories, transactions])

    console.log(categoryLeftValue);

    // span, żeby w jednej linijce
    return <Root onClick={onClick}>
        <span>{name}</span>
        <CategoryAmount negative = {categoryLeftValue<0}>
            {categoryLeftValue}
        </CategoryAmount>

    </Root>
}

export default ParentCategory;