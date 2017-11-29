/**
 * 歌单详情页面信息部分
 *      props {
 *          data
 *      }
 */
import React from 'react';
import { Link } from 'react-router';

 class PlaylistInfo extends React.Component{
     constructor(){
         super();
         this.state={
             moreDesc:false//是否展示更多的描述信息，初始不展开
         };
     }
     //改变展开还是收起的状态
     change(){
         let moreDesc = this.state.moreDesc;
         this.setState({
             moreDesc: !moreDesc
         });
     }
     render(){
         let datas = this.props.datas;
         return(
             <div className="pld_info clearfix">
                 <div className="img_avatar fl">
                     <img src={datas.coverImgUrl+'?param=200y200'} alt={datas.id} />
                 </div>
                 <div className="ctx">
                     <div className="title">
                         <i className="fl icon icon_gedan"></i>
                         <h2>{datas.name}</h2>
                     </div>
                     <div className="author clearfix">
                         <a className="avatar fl" href="#">
                             <img src={datas.creator.avatarUrl} />
                         </a>
                         <Link className="name fl" to={`/user/home?id=${datas.userId}`}>{datas.creator.nickname}</Link>
                         <i className="icon fl"></i>
                         <span className="time">2017-10-05 创建</span>
                     </div>
                     <div className="btns_group clearfix">
                         <a onClick={ev=>{this.props.changePlaylist()}} className="btn-play" href="javascript:;"><span><i className="play"></i>播放</span></a>
                         <a onClick={ev=>{this.props.addAllTolist()}} className="btn-2 plus" href="javascript:;"></a>
                         <a className="btn-public btn-add" href="javascript:;"><span>({datas.subscribedCount})</span></a>
                         <a className="btn-public btn-share" href="javascript:;"><span>({datas.shareCount})</span></a>
                         <a className="btn-public btn-downLoad" href="javascript:;"><span>下载</span></a>
                         <a className="btn-public btn-comment" href="javascript:;"><span>({datas.commentCount})</span></a>
                     </div>
                     <div className="tags">
                         <span>标签&nbsp;:</span>
                         {
                             datas.tags.map((item,index)=>{
                                 return(
                                     <a key={index} className="tag" href="#">{item}</a>
                                 );
                             })
                         }
                     </div>
                     {
                         datas.description?(
                             <div className="intro">
                                 <p style={{display:this.state.moreDesc?'none':'block'}}>
                                     <span>介绍</span>&nbsp;&nbsp;
                                     <span dangerouslySetInnerHTML={{__html:(datas.description.substr(0,100)+'...').replace(/\n/g,'<br />')}}></span>
                                 </p>
                                 <p style={{display:this.state.moreDesc?'block':'none'}}>
                                     <span>介绍</span>&nbsp;&nbsp;
                                     <span dangerouslySetInnerHTML={{__html:(datas.description).replace(/\n/g,'<br />')}}></span>
                                 </p>
                                 {/*
                                     描述字符长度一定才显示展开
                                 */}
                                 {
                                     datas.description.length>100?
                                     <div className="open clearfix">
                                         <a onClick={this.change.bind(this)} href="javascript:;">{this.state.moreDesc?<span>收起</span>:<span>展开</span>}<i className={this.state.moreDesc?'arrow arrow_up':'arrow'}></i></a>
                                     </div>:null
                                 }
                             </div>
                         ):null
                     }
                 </div>
             </div>
         );
     }
 }


 export default PlaylistInfo;
