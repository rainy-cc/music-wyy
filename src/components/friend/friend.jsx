import React from 'react';

import '../../static/css/friend.css';
function FriendPart(){
    return(
        <div className="friend g_main">
            <div className="friend_wrap friend_bg">
                <div className="desc">你可以关注明星和好友品味他们的私房歌单<br />通过他们的动态发现更多精彩音乐</div>
                <a href="#" className="login_btn">立即登录</a>
            </div>
        </div>
    );
}


export default FriendPart;
