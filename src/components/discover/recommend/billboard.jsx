/*
    榜单  billboard  组件
*/


import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {getToplistDetail} from '../../../axios/toplist.js';

import RecommendContentHeader from './recCtxHeader';
import Loading from '../../../components/loading';

//飙升榜    原创榜单  新歌榜单的id

const needId = [19723756,3779629,2884035];

function RecBillboard(props){
    let {bsData,xgData,ycData,addToList,changeList, addAndPlay}= props;
    return(
        <div className="rec_billboard">
            <RecommendContentHeader title="榜单" isShowNav={false} linkUrl='/discover/toplist' />
            {
                !bsData || !xgData|| !ycData ?
                    <div className="bill_ctx clearfix">
                        <div style={{paddingTop: '200px'}}><Loading size="small" /></div>
                    </div>:
                    <div className="bill_ctx clearfix">
                        <BbList addToList={addToList} addAndPlay={addAndPlay} changeList={changeList} src={bsData.coverImgUrl} name={bsData.name} songList={bsData.tracks} id={needId[0]} />
                        <BbList addToList={addToList} addAndPlay={addAndPlay} changeList={changeList} src={xgData.coverImgUrl} name={xgData.name} songList={xgData.tracks} id={needId[1]} />
                        <BbList addToList={addToList} addAndPlay={addAndPlay} changeList={changeList} cName='bill_item_len' src={ycData.coverImgUrl} name={ycData.name} songList={ycData.tracks} id={needId[2]} />
                    </div>
            }

        </div>
    );
}

//榜单中的每一个单独块
function BbList(props){
    let songList = props.songList.slice(0,10);
    let songsEle = songList.map((item,index) =>{
        return(
            <li key={item.id} className="clearfix">
                <span className={index<3?'order_num order_num_top':'order_num'}>{index+1}</span>
                <Link className="song_name" to={`/song?id=${item.id}`} title={item.name}>{item.name}</Link>
                <div className="song_btn">
                    <a onClick={ev=>{props.addAndPlay(item)}}className="btn_play" title="播放" href="javascript:;">播放</a>
                    <a onClick={ev=>{props.addToList(item)}} className="btn_add" title="添加到播放列表" href="javascript:;">添加</a>
                    <a className="btn_value" title="收藏" href="javascript:;">收藏</a>
                </div>
            </li>
        );
    });
    return(
        <dl className={"bill_item "+ props.cName}>
            <dt>
                <div className="bill_img">
                    <Link to={`/discover/toplist?id=${props.id}`}><img src={props.src+'?param=80y80'} alt="img" /></Link>
                </div>
                <div className="bill_title">
                    <h4><Link to={"/discover/toplist?id="+props.id}>{props.name}</Link></h4>
                    <div className="btn clearfix">
                        <a onClick={ev=>{props.changeList(props.songList)}} className="btn1" title="播放" href="javascript:;">播放</a>
                        <a className="btn2" title="添加" href="javascript:;">添加</a>
                    </div>
                </div>
            </dt>
            <dd>
                <ol>
                    {songsEle}
                </ol>
                <div className="more">
                    <Link to={"/discover/toplist?id="+props.id}>查看全部&gt;</Link>
                </div>
            </dd>
        </dl>
    );
}

export default RecBillboard;
