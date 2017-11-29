import React from 'react';
import {Link} from 'react-router';

import {changeDuration,format,formatDuration2} from '../../utils/dateFormat.js';


class ProgramInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            isOpen:true
        };
    }

    changeState(){
        const bool = this.state.isOpen;
        this.setState({
            isOpen: !bool
        });
    }
    render(){
        const isOpen = this.state.isOpen;
        const program = this.props.program;
        return(
            <div>
                <div className="info clearfix">
                    <div className="avatar fl">
                        <img src={program.coverUrl}/>
                    </div>
                    <div className="text">
                        <div className="title">
                            <i className="fl icon2 icon_program"></i>
                            <h2>{program.name}</h2>
                        </div>

                        <div className="radioname">
                            <i></i>
                            <Link className="name" title={program.radio.name} to={`/djradio?id=${program.radio.id}`}>{program.radio.name}</Link>
                            <a className="btn_sub">
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="btns_group clearfix">
                    <a onClick={ev=>{this.props.addAndPlayProgram()}} className=" btn-public btn-play2" href="javascript:;"><span>播放&nbsp;{formatDuration2(program.duration)}</span></a>
                    <a className="btn-public btn-zan" href="javascript:;"><span><i className="icon_zan"></i>{program.likedCount>0?`(${program.likedCount})`:'赞'}</span></a>

                    <a className="btn-public btn-comment" href="javascript:;"><span>{program.commentCount>0?`(${program.commentCount})`:'评论'}</span></a>
                    <a className="btn-public btn-share" href="javascript:;"><span>{program.shareCount>0?`(${program.shareCount})`:'分享'}</span></a>
                    <a className="btn-public btn-downLoad" href="javascript:;"><span>下载</span></a>
                </div>
                <div className="more">
                    <div className="more_info">
                        <a className="tag" href="#">{program.radio.category}</a>
                        <strong>{program.radio.name}&nbsp;<span> 第{program.serialNum}期</span></strong>
                        <span className="time">{format(program.createTime,'yyyy-MM-dd')}&nbsp;创建</span>
                        <span className="num">播放：<em>{program.listenerCount}</em>次</span>
                    </div>
                    <p className="desc">介绍： <span dangerouslySetInnerHTML={{__html:program.description.replace(/\n/g,'<br />')}}></span></p>
                </div>
                {
                    program.songs.length?
                    <div className="list song_tb">
                        <div className="tb_head">
                            <a onClick={this.changeState.bind(this)} className="fr" href="javascript:;">{isOpen?<span>收起</span>:<span>展开</span>}</a>
                            <div>
                                <strong>节目包含歌曲列表</strong>
                                <span>({program.songs.length}首歌)</span>
                            </div>
                        </div>
                        <div className="stb_wrap" style={{display:isOpen?'block':'none'}}>
                            <table className="sl_table">
                                <tbody>
                                    {
                                        program.songs.map((item,index)=>{
                                            console.log(item);
                                            return(
                                                <tr key={item.id} className={index%2===0?'even':''}>
                                                    <td className="col1">
                                                        <div className="hd">
                                                            <span className="num">{index+1}</span>
                                                            <i onClick={ev=>{this.props.addAndPlaySong(item)}} className={this.props.curMusic.info && this.props.curMusic.info.id==item.id?'icon_play active':'icon_play'}></i>
                                                        </div>
                                                    </td>
                                                    <td className="col2">
                                                        <div className="overhide">
                                                            <Link title={item.name} to={`/song?id=${item.id}`}>{item.name}</Link>

                                                        </div>
                                                    </td>
                                                    <td className="col3">
                                                        <div className="">
                                                            <span className="time">{changeDuration(item.duration)}</span>
                                                            <div className="t_btns clearfix">
                                                                <a onClick={ev=>{this.props.addToList(item)}} className="t_btn add" href="javascript:;"></a>
                                                                <a className="t_btn value" href="javascript:;"></a>
                                                                <a className="t_btn share" href="javascript:;"></a>
                                                                <a className="t_btn download" href="javascript:;"></a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="col4">
                                                        <div className="overhide">
                                                            <Link to={`/artists?id=${item.artists[0].id}`}>{item.artists[0].name}</Link>
                                                        </div>
                                                    </td>
                                                    <td className="col5">
                                                        <div className="overhide">
                                                            <Link to={`/album?id=${item.album.id}`}>{item.album.name}</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                    :null
                }

            </div>
        );
    }
}


export default ProgramInfo;
