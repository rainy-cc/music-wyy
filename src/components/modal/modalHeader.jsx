import React from 'react';

function ModalHeader(props){
    return(
        <div className="modal_hd">
            <div className="md_title">{props.title}</div>
            <span onClick={ev=>{props.changeModalStatus('none')}} className="md_close_btn"></span>
        </div>
    );
}

export default ModalHeader;
