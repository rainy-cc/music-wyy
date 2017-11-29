/**
 * djradio详情页面的信息部分组件
 *
 *      props {
 *          data: 详情信息
 *      }
 *
 */

import React from 'react';
import {Link} from 'react-router';

function DjradioInfo(props){
    return(
        <div className="dr_info clearfix">
            <div className="img_avatar fl">
                <img src={props.data.picUrl}/>
            </div>
            <div className="ctx">
                <div className="title">
                    <i className="fl icon icon_djradio"></i>
                    <h2>{props.data.name}</h2>
                </div>
                <div className="author clearfix">
                    <Link className="avatar fl" to={`/user/home?id=${props.data.dj.userId}`}>
                        <img src={props.data.dj.avatarUrl+'?param=200y200'} alt="img" />
                    </Link>
                    <Link className="name fl" to={`/user/home?id=${props.data.dj.userId}`}>{props.data.dj.nickname}</Link>
                </div>
                <div className="btns_group clearfix">
                    <a className="btn-public btn-sub" href="javascript:;"><span>订阅({props.data.subCount})</span></a>
                    <a onClick={ev=>{props.playAll()}} className="btn-public btn-playall" href="javascript:;"><span>播放全部</span></a>
                    <a className="btn-public btn-share" href="javascript:;"><span>分享({props.data.shareCount})</span></a>

                </div>
                <p className="intro"><Link to={`/discover/djradio/category?id=${props.data.categoryId}`} className="type">{props.data.category}</Link><span dangerouslySetInnerHTML={{__html:props.data.desc.replace(/\n/g,'<br />')}}></span>
                </p>
            </div>
        </div>
    );
}

export default DjradioInfo;
