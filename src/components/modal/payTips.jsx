/**
 * 需要付费提示
 */
import React from 'react';

import '../static/css/loginBox.css';

class Modal extends React.Component {
    render(){
        return(
            <div className="modal_mask">
                <div className="modal">
                    <div className="modal_hd">
                        <div className="md_title">提示</div>
                        <span className="md_close_btn"></span>
                    </div>
                    <div className="modal_bd">
                        <div className="cnt">
                            <div className="info">
                                <i></i>
                                <p>版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享</p>
                            </div>
                        </div>
                        <div className="choose">
                            <a className="now" href="javascript:;"><span>立即订购</span></a>
                            <a className="later" href="javascript:;"><span>以后再说</span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
