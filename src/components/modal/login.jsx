import React from 'react';

import ModalHeader from './modalHeader';

function LoginModal(props){
    return(
        <div className="modal login_box">
            <ModalHeader title="登录" changeModalStatus={props.changeModalStatus} />
            <div className="login_content">
                <div className="login_content_wrap">
                    <div className="login_content_l">
                        <div className="login_l_img"></div>
                        <a onClick={ev=>{props.changeModalStatus('phoneLogin')}} className="mobile_log_btn login_btn" href="javascript:;">手机号登录</a>
                        <a onClick={ev=>{props.changeModalStatus('register')}} className="reg_btn login_btn" href="javascript:;">注 册</a>
                    </div>
                    <div className="login_content_r">
                        <ul className="login_method">
                            <li>
                                <a href="#">
                                    <i className="login_method_icon icon_wx"></i>微信登录</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="login_method_icon icon_qq"></i>QQ登录</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="login_method_icon icon_sina"></i>微博登录</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="login_method_icon icon_wyyx"></i>网易邮箱帐号登录</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
