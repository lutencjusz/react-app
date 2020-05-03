import React from 'react';
import {ParentCategory as Root} from './BudgetCategoryList.css'; // as, bo jest konflikt nazw


function ParentCategory ({name, onClick}) {
    return <Root onClick={onClick}>
        {name}
    </Root>
}

export default ParentCategory;