import React from 'react';

function HeaderLoginButton(props){

        return(
            <div className="header_login">
                <a onClick={ev=>{props.login('login')}} className="login_txt" href="javascript:;">登录</a>
                {/*下拉菜单*/}
                <div className="hd_dropdown">
                    <span className="arrow"></span>
                    <ul className="hd_login_list clearfix">
                        <li>
                            <a onClick={ev=>{props.login('phoneLogin')}} className="" href="javascipt:;">
                                <i className="hd_icon icon_mobile"></i>
                                <span>手机号登录</span>
                            </a>
                        </li>
                        <li>
                            <a className="" href="javascipt:;">
                                <i className="hd_icon icon_wechat"></i>
                                <span>微信登录</span>
                            </a>
                        </li>
                        <li>
                            <a className="" href="javascipt:;">
                                <i className="hd_icon icon_qq"></i>
                                <span>QQ登录</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascipt:;">
                                <i className="hd_icon icon_sina"></i>
                                <span>新浪微博登录</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascipt:;">
                                <i className="hd_icon icon_wyyx"></i>
                                <span>网易邮箱帐号登录</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        );
};

export default HeaderLoginButton;
