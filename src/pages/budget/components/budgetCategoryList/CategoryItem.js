import React from 'react';
import {CategoryItem as Root, CategoryAmount} from './BudgetCategoryList.css'; // as, bo jest konflikt nazw
import {formatCurrency} from 'utils'
import {useTranslation} from 'react-i18next';

function CategoryItem ({name, item, transactions}) {
    
    const {i18n} = useTranslation();

    // w domyślnie transakcje w zabudżetowanej categorii 
    const categoryTransaction = transactions.filter(transaction => transaction.categoryId === item.id)
    
    const spentOnCategory = categoryTransaction.reduce((acc, transaction) => acc + transaction.amount, 0); // akumulator do sumowania kwot
    const totalLeft = item.budget - spentOnCategory;

    return <Root>
    <span>{name}</span>
        <CategoryAmount negative = {totalLeft<0}>
            {formatCurrency(totalLeft, i18n.language)}
        </CategoryAmount>    
    </Root>
}

export default CategoryItem;