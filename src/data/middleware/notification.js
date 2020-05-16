import {toast} from 'react-toastify';

const notificationsMiddleware = () => next => action => {
    if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)){ //szuka wyrażenia SUCCESS
        toast(action.successMessage
            , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
            );
        
    }
    next(action); //coś niegra z tym next
}

export default notificationsMiddleware;
