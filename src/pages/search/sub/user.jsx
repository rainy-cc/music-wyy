/*
    用户搜索结果 type=1002
 */

import React from 'react';
import { Link} from 'react-router';


function SchUser(props){
    return (
        <div>
            {
                props.data.userprofiles.length?
                <ul className="user_list">
                    {
                        props.data.userprofiles.map(item=>{
                            return(
                                <li key={item.userId} >
                                    <div className="column col1">
                                        <Link className="avatar" to={`/user/home?id=${item.userId}`}>
                                            <img src={item.avatarUrl+'?param=50y50'} />
                                        </Link>
                                    </div>
                                    <div className="column col2">
                                        <p className="username">
                                            <Link to={`/user/home?id=${item.userId}`} title={item.nickname}>{item.nickname}<i className={item.gender ==1?"icon_gender":'icon_gender icon_gender_girl'}></i></Link>
                                        </p>
                                        <p className="desc overhide">{item.signature}</p>
                                    </div>
                                    <div className="column col3">
                                        <a className="btn_watch" href="#">关注</a>
                                    </div>
                                    <div className="column col4">
                                        <span>歌单： {item.playlistCount}</span>
                                    </div>
                                    <div className="column col5">
                                        <span>粉丝： {item.followeds}</span>
                                    </div>
                                </li>
                            );
                        })
                    }
                    <li >
                        <div className="column col1">
                            <Link href="#">
                                <img src="http://p1.music.126.net/zuGhHW_w5cexh_gvFNbvwg==/19084223323586407.jpg?param=50y50" />
                            </Link>
                        </div>
                        <div className="column col2">
                            <p className="username">
                                <a href="#">木头人123<i className="icon_gender"></i></a>

                            </p>
                            <p className="desc">技巧旋律型乐手 非洲鼓 西洋打击乐爱好者 河池独立音乐人</p>
                        </div>
                        <div className="column col3">
                            <a className="btn_watch" href="#">关注</a>
                        </div>
                        <div className="column col4">
                            <span>歌单： 1</span>
                        </div>
                        <div className="column col5">
                            <span>粉丝： 1</span>
                        </div>
                    </li>
                </ul>:
                <div>未搜索到相关用户，请重新搜索。</div>
            }
        </div>

    );
}

export default SchUser;
