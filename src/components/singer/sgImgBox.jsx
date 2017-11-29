/*
    歌手页面的单个信息盒
    */
import React from 'react';
import {Link} from 'react-router';

function SgImgBox(props){
    return(
        <div>
            <div className="avatar">
                <Link to={`/artist?id=${props.id}`}>
                    <img src={props.img1v1Url} />
                </Link>
            </div>
            <p className="name">
                <Link className="" to={`/artist?id=${props.id}`}>{props.name}</Link>
                {props.accountId?<a href="#" ><i className="icon"></i></a>:null}
            </p>
        </div>
    );
}

export default SgImgBox;
