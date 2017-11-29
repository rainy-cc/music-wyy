/*
    歌手页面的单个信息盒
    */
import React from 'react';
import {Link} from 'react-router';

function SgImgBox(props){
    return(
        <div className="singer_cover">
            <div className="avatar">
                <Link to={`/artist?id=${props.id}`}>
                    <img src={props.img1v1Url+'?param=130y130'} />
                </Link>
            </div>
            <p className="name">
                <Link className="" to={`/artist?id=${props.id}`}>{props.name}</Link>
                {props.accountId?<Link to={`/user/home?id=${props.accountId}`}><i className="icon"></i></Link>:null}
            </p>
        </div>
    );
}

export default SgImgBox;
