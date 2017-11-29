/**
 * 专辑介绍组件
 *      props {
 *          album
 *      }
 */
import React from 'react';
import {Link} from 'react-router';
import {format} from '../../utils/dateFormat.js';

function AlbumInfo(props){
    return(
        <div className="albd_info clearfix">
            <div className="avatar fl">
                <img src={props.album.picUrl+'?param=200y200'} />
                <span className="mask"></span>
            </div>
            <div className="text fr">
                <div className="about">
                    <div className="title">
                        <i className="fl icon icon_album"></i>
                        <h2>{props.album.name}</h2>
                    </div>
                    <p className="intro">歌手&nbsp;：&nbsp; <Link style={{color:'#0c73c2'}} to={`/artist?id=${props.album.artist.id }`}>{ props.album.artist.name }</Link></p>
                    <p className="intro">发行时间&nbsp;：&nbsp; { format(props.album.publishTime,'yyyy-MM-dd') }</p>
                    <p className="intro">发行公司&nbsp;：&nbsp; { props.album.company }</p>
                </div>
                <div className="btns_group clearfix">
                    <a onClick={ev=>{props.changeList()}} className="btn-play" href="javascript:;"><span><i className="play"></i>播放</span></a>
                    <a onClick={ev=>{props.addAllToList()}} className="btn-2 plus" href="javascript:;"></a>
                    <a className="btn-public btn-add" href="javascript:;"><span>收藏</span></a>
                    <a className="btn-public btn-share" href="javascript:;"><span>分享</span></a>
                    <a className="btn-public btn-downLoad" href="javascript:;"><span>下载</span></a>
                    <a className="btn-public btn-comment" href="javascript:;"><span>评论</span></a>
                </div>
            </div>
        </div>
    );
}

export default AlbumInfo;
