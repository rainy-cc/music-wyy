import React from 'react';
import ModalHeader from './modalHeader';
function PayModal(props){
    return(
        <div className="modal">
            <ModalHeader title="提示" changeModalStatus={props.changeModalStatus} />
            <div className="modal_bd">
                <div className="cnt">
                    <div className="info">
                        <i></i>
                        <p>版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享</p>
                    </div>
                </div>
                <div className="choose">
                    <a className="now" href="javascript:;"><span>立即订购</span></a>
                    <a  onClick={ev=>{props.changeModalStatus('none')}} className="later" href="javascript:;"><span>以后再说</span></a>
                </div>
            </div>
        </div>
    );
}

export default PayModal;
