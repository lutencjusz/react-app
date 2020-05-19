import React, {Fragment, useState, useEffect} from 'react'; // useEffect, gdy tylko w konkretnym moemencie ma być zmiana 

const Item = React.memo(({item, onClickHandler, isActive}) => (
    <div>
        <item.Trigger onClick={onClickHandler}/>
        {isActive && item.children}
    </div>
))

function ToggleableList ({items, clickRef}) {
    const [selectedItem, setSelectedItem] = useState();

    useEffect(()=>{
        clickRef.current = setSelectedItem //do bierzącej wartości z hooka useRef z BudgetCategoryList przypisujemy funkcję ustawiającą useState 
    }, [clickRef, selectedItem])
    
    return (<Fragment>
        {items.map(item => (
            <Item 
                key={item.id}
                item={item}
                onClickHandler = {setSelectedItem}
                isActive = {selectedItem === item.id}
            />
        ))}
    
    </Fragment>)
    
}

export default React.memo(ToggleableList); // blokuje renderowanie, jeżeli proposy się nie zmieniły
