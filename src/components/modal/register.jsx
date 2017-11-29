import React from 'react';
import ModalHeader from './modalHeader';
function RegisterModal(props){
    return(
        <div className="modal phone_login">
            <ModalHeader title="手机号注册" changeModalStatus={props.changeModalStatus} />
            <div className="modal_bd">
                <div className="phone_login_cnt register_cnt">
                    <div className="color6 ">
                        <label>手机号</label>
                    </div>
                    <div className="phone_number mt10">
                        <a className="area" href="javascript:;">
                            <span>+86</span>
                            <span className="down"></span>
                        </a>
                        <div className="text_wrap">
                            <input type="text" placeholder="请输入手机号" />
                        </div>
                    </div>
                    <div className="mt10 color6 ">
                        <label>密码</label>
                    </div>
                    <div className="pwd">
                        <input type="password" placeholder="设置登录密码，不少于6位" />
                    </div>
                    <div className="login_btn_wrap">
                        <a className="login_btn" href="javascript:;"><span>下一步</span></a>
                    </div>
                </div>
                <div className="otherway">
                    <a  onClick={ev=>{props.changeModalStatus('login')}} className="color2c3" href="javascript:;">&lt;&nbsp;&nbsp;返回登陆</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;
