/**
 * 版权保护
 */
import React from 'react';

import ModalHeader from './modalHeader';
function CopyRightModal(props){
    return(
        <div className="modal cpr_modal">
            <ModalHeader title="提示" changeModalStatus={props.changeModalStatus} />
            <div className="modal_bd">
                <div className="cnt">
                    <div className="info">
                        由于版权保护，您所在的地区暂时无法使用。
                    </div>
                    <div className="know">
                        <a onClick={ev=>{props.changeModalStatus('none')}} className="know_btn" href="javascript:;"><span>知道了</span></a>
                    </div>
                </div>

            </div>
        </div>
    );
}
 export default CopyRightModal;
