import React from 'react';
import {CategoryItem as Root} from './BudgetCategoryList.css'; // as, bo jest konflikt nazw


function CategoryItem ({name}) {
    return <Root>
        {name}
    </Root>
    
}

export default CategoryItem;