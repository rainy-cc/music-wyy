/*
    歌单页面的图片容器
*/
import React from 'react';
import {Link} from 'react-router';


function ImgBox(props){
    return (
        <div className="image_box">
            <Link to={`/playlist?id=${props.id}`}><img src={props.src} /></Link>
            <div className="info">
                <i className="icon_earphone"></i>
                <span className="num">{props.playCount}</span>
                <a onClick={ev=>{props.changeList(props.id)}} className="play_icon" href="javascript:;"></a>
            </div>
        </div>
    );
}

export default ImgBox;
