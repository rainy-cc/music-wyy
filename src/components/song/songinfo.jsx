/**
 * 单曲页面单曲信息部分 SongInfo
 *      props  {
 *          lrc,
 *          infoDta
 *      }
 *
 */
import React from 'react';
import { Link } from 'react-router';


class SongInfo extends React.Component{

    constructor(){
        super();
        this.state = {
            moreLrc: false,
        };
    }

    changeState(){
        let moreLrc = this.state.moreLrc;
        this.setState({
            moreLrc: !moreLrc
        });
    }

    render(){
        let infoData = this.props.infoData[0];
        return(
            <div className="song_info clearfix">
                <div  className="img_avatar fl">
                    <img src={infoData.al.picUrl} alt="img" />
                    <span className="mask"></span>
                </div>
                <div className="detail fr">
                    <div className="hd">
                        <i className="icon_dq"></i>
                        <div className="title">
                            <h2>{infoData.name}</h2>
                            {
                                infoData.alia && infoData.alia.length?(<p className="subtitle">{infoData.alia[0]}</p>):null
                            }

                        </div>
                    </div>
                    <p className="author">歌手：<Link to={`/artist?id=${infoData.ar[0].id}`} title={infoData.ar[0].name}>{infoData.ar[0].name}</Link></p>
                    <p className="belong">所属专辑：<Link to={`/album?id=${infoData.al.id}`} >{infoData.al.name}</Link></p>
                    <div className="btns_group clearfix">
                        <a onClick={e=>{this.props.playSong(infoData)}} className="btn-play" href="javascript:;"><span><i className="play"></i>播放</span></a>
                        <a onClick={e=>{this.props.addSong(infoData)}} className="btn-2 plus" href="javascript:;"></a>
                        <a className="btn-public btn-add" href="javascript:;"><span>收藏</span></a>
                        <a className="btn-public btn-share" href="javascript:;"><span>分享</span></a>
                        <a className="btn-public btn-downLoad" href="javascript:;"><span>下载</span></a>
                        <a className="btn-public btn-comment" href="javascript:;"><span>评论</span></a>
                    </div>
                    <div className="lrc">
                        {/*
                            显示13行歌词，剩余的全部隐藏，点击展开显示剩余歌词
                        */}
                        {
                            this.props.lrc.length?this.props.lrc.map((item,index)=>{
                                return(
                                    <p key={index} className={index>12 && !this.state.moreLrc?'lrc_line lrc_linehide':'lrc_line'}>{item.txt}</p>
                                );
                            }):<div>暂时没有相关歌词</div>
                        }
                        {
                            this.props.lrc.length&&this.props.lrc.length>13?
                            <div className="open clearfix">
                                <a onClick={this.changeState.bind(this)}  href="javascript:;">{this.state.moreLrc?<span>收起</span>:<span>展开</span>}<i className={this.state.moreLrc?'arrow arrow_up':'arrow'}></i></a>
                            </div>:null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default SongInfo;
