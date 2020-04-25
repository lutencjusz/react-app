import React from 'react';
import {InlineButton, RegularButton} from './Button.css';

function Button({type, children, ...props}) {
    const Component = (() => { // musi być funkcja strzałowa, żeby switch działał
        switch (type) {
            case 'inline':
                return InlineButton
            default:
                return RegularButton
        }
    })(); // od razu ją wywołać
    return (
            <Component {...props}>
                {children}
            </Component>
    )
}

export default Button;