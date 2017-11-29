import React from 'react';

function SideBarLogin(props){
    return (
        <div className="m_sb_login">
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <a className="m_sb_login_btn" onClick={ev=>{props.login()}} href="javascript:;">用户登录</a>
        </div>
    );
}


export default SideBarLogin;
