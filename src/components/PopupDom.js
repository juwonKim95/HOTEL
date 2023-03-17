import ReactDOM from 'react-dom';

const PopupDom = ({children}) => {
    const el = document.querySelector('#popupDom');
    return ReactDOM.createPortal(children,el);
};
    
export default PopupDom;