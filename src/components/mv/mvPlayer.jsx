/**
 *
 */


 import React from 'react';
 import {Link} from 'react-router';

 class MvPlayer extends React.Component{

     componentDidMount(){
         this.oVideo.setAttribute("controlsList","nodownload");//解决react不支持controlsList属性的报错
     }
     render(){
         let data = this.props.mvData.data;
         return(
             <div className="mv_box">
                 <div className="title">
                     <h2 title={data.name}>{data.name}</h2>
                     <Link title={data.artistName} to={`/artist?id=${data.artistId}`} className="singer">{data.artistName}</Link>
                 </div>
                 <div className="mv_video">
                     {/*react中的autoplay属性必须要大写*/}
                     <video preload="preload" autoPlay="true" controls="controls" ref={v=>this.oVideo = v} src={`http://www.rainycc.com:4000/mv/url?url=${data.brs['480']}`}></video>
                 </div>
                 <div className="btns_group clearfix">
                     <a className="btn-public btn-add" href="javascript:;"><span>收藏</span></a>
                     <a className="btn-public btn-share" href="javascript:;"><span>分享</span></a>
                 </div>
             </div>
         );
     }

 }

export default MvPlayer;
