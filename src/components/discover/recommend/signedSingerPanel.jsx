/*
    入驻歌手
 */
import React from 'react';
import { Link } from 'react-router';


function SignedSingerPanel(props){
    let data = props.data;
    //console.log(data);
    return (
        <div className="res_singer">
            <h3 className="res_singer_title">
                <span>入驻歌手</span>
                <Link to="/discover/artist/signed/">查看全部 &gt;</Link>
            </h3>
            <ul className="res_singer_list">
                {
                    data.map((item,index)=>{
                        return(
                            <li key={item.id}>
                                <Link to={`/user/home?id=${item.id}`}>
                                    <div className="res_singer_avatar">
                                        <img src={item.picUrl} alt="avatar" />
                                    </div>
                                    <div className="res_singer_info">
                                        <h5>{item.name}</h5>
                                        <span className="overhide">{item.desc}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <a className="res_singer_btn" href="#">
                    <span>申请成为网易音乐人</span>
                </a>
            </div>
        </div>
    );
}

export default SignedSingerPanel;
