/**
 *
 */
import React from 'react';
import {Link} from 'react-router';
import {format} from '../../../utils/dateFormat.js';


function ToplistInfo(props){
    let data = props.detailDatas;
    return(
        <div className="tl_r_hd">
            <div className="tl_r_hd_info clearfix">
                <div className="img_avatar fl">
                    <img src={data.coverImgUrl +'?param=150y150'} />
                </div>
                <div className="hd_detail">
                    <div className="hd_detail_wrap">
                        <h3>{data.name}</h3>
                        <p className="latest clearfix">
                            <i></i>
                            <span>最近更新:{format(data.updateTime,'MM月dd日')}</span>
                            <span className="frequency">(每天更新)</span>
                        </p>

                        <div className="btns_group clearfix">
                            <a onClick={ev=>{props.changeList()}} className="btn-play" href="javascript:;"><span><i className="play"></i>播放</span></a>
                            <a onClick={ev=>{props.addAllToList()}} className="btn-2 plus" href="javascript:;"></a>
                            <a className="btn-public btn-add" href="javascript:;"><span>({data.subscribedCount})</span></a>
                            <a className="btn-public btn-share" href="javascript:;"><span>({data.shareCount})</span></a>
                            <a className="btn-public btn-downLoad" href="javascript:;"><span>下载</span></a>
                            <a className="btn-public btn-comment" href="javascript:;"><span>({data.commentCount})</span></a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToplistInfo;
