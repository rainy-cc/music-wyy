import React from 'react';
import ModalHeader from './modalHeader';

function PhoneLoginModal(props){
    return(
        <div className="modal phone_login">
            <ModalHeader title="手机号登录" changeModalStatus={props.changeModalStatus} />
            <div className="modal_bd">
                <div className="phone_login_cnt">
                    <div className="phone_number">
                        <a className="area" href="javascript:;">
                            <span>+86</span>
                            <span className="down"></span>
                        </a>
                        <div className="text_wrap">
                            <input type="text" placeholder="请输入手机号" />
                        </div>
                    </div>
                    <div className="pwd">
                        <input type="password" placeholder="请输入密码" />
                    </div>
                    <div className="remember">
                        <label>
                            <input type="checkbox" /> 自动登录
                        </label>
                        <a className="fr" href="javascript:;">忘记密码?</a>
                    </div>
                    <div className="login_btn_wrap">
                        <a className="login_btn" href="javascript:;"><span>登录</span></a>
                    </div>
                </div>
                <div className="otherway">
                    <a  onClick={ev=>{props.changeModalStatus('login')}} className="fl color2c3" href="javascript:;">&lt;&nbsp;&nbsp;其他登录方式</a>
                    <a  onClick={ev=>{props.changeModalStatus('register')}} className="fr color9" href="javascript:;">没有帐号？免费注册&nbsp;&nbsp;&gt;</a>
                </div>
            </div>
        </div>
    );
}

export default PhoneLoginModal;
