import React from 'react';
import {createPortal} from 'react-dom'
import {Wrapper, Content, CloseIcon} from'./Modal.css'
import {useHistory} from 'react-router-dom';

function Modal({children}) {

    const history = useHistory();
    const handleClose = e => {
        e.stopPropagation(); // zatrzymuje popagację zdarzenia niżej
        history.goBack()
    }

    return createPortal(
        <Wrapper onClick={handleClose}>
            <Content onClick={e => e.stopPropagation()}>
                <CloseIcon onClick={handleClose}>&times;</CloseIcon>
                {children}
            </Content>
        </Wrapper>,
        document.querySelector('#modal') // querySelector jest bardziej uniwersalny
    )
}

export default Modal;