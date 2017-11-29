/**
 * 歌手页面歌曲面板 SongsPanel
 *      热门单曲50
 *      @router： artist?id=10559 默认路由
 *
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';
import { Link } from 'react-router';
import { changeDuration } from '../../../utils/dateFormat';
import { getSingerSongs } from '../../../axios/singer';
import Loading from '../../../components/loading';


class SongsPanel extends React.Component {

    constructor(){
        super();
        this.state = {
            hotSongs: [] //存放热门单曲50
        };
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.changeList = this.changeList.bind(this);
    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getSongData(id);
    }
    //播放全部
    changeList(){
        let list = this.state.hotSongs;
        this.props.actions.changePlaylist(list);
        this.props.actions.changeMusicAsync(list[0].id,0);//播放该歌单的第一首歌
    }
    //添加到列表并且播放
    addAndPlay(song){
        if(song.st < 0){
            //alert('所在地区没有版权')
            this.props.actions.changeModalStatus('copyRight');
        }else{
            this.props.actions.playItem(song);
        }
    }
    //添加到列表不播放
    addToPlaylist(song){
        //判断是否存在与李彪的逻辑可以封装在action创建函数中
        let curPlaylist = this.props.playlist;
        let isExist = curPlaylist.map(item =>item.id).indexOf(song.id) == -1;
        if(isExist){//不存在
            if(song.st < 0){
                this.props.actions.changeModalStatus('copyRight');
            }else{
                this.props.actions.addSong(song);
            }
        }else {
            console.log("播放列表已存在");
            return;
        }
    }
    //获取歌手热门歌曲50首，传入歌手id
    getSongData(id){
        getSingerSongs(id)
            .then(res=>{
                //console.log(res.data.hotSongs);
                this.setState({
                    hotSongs: res.data.hotSongs
                });
                window.scrollTo(0,0);
            })
            .catch(error=>{
                console.log('获取歌手歌曲失败');
            });
    }
    render(){
        if(!this.state.hotSongs.length){
            return(
                <div style={{padding:'100px 0'}}>
                    <Loading size="small" />
                </div>
            );
        }
        let curMusic = this.props.currentMusic;
        return(
            <div className="song_tb ">
                <div className="btns_group clearfix" style={{marginBottom: '10px'}}>
                    <a onClick={ev=>{this.changeList();}} className="btn-play" href="javascript:;"><span><i className="play"></i>播放</span></a>
                    <a className="btn-2 plus" href="javascript:;"></a>
                    <a className="btn-public btn-add" href="javascript:;"><span>收藏热门50</span></a>
                </div>
                <div className="stb_wrap">
                    <table className="sl_table artd_table" style={{border:'none'}}>
                        <tbody>
                            {
                                this.state.hotSongs.map((item,index)=>{
                                    return(
                                        <tr key={item.id} className={index%2==0?'even':''}>
                                                         <td className="column1">
                                                            <div className="hd">
                                                                <span className="num">{index+1}</span>
                                                                 <i onClick={ev=>{this.addAndPlay(item)}} className={curMusic.info&&curMusic.info.id==item.id?'icon_play active':'icon_play'}></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="name clearfix ">
                                                                <Link className="fl overhide text" title={item.name} to={`/song?id=${item.id}`}>{item.name}</Link>
                                                                {item.mv?<Link to={`/mv?id=${item.mv}`} className="mv_btn fl" title="播放mv"></Link>:null}

                                                            </div>
                                                         </td>
                                                        <td className="column3">
                                                         <div>
                                                                <span className="time">{changeDuration(item.dt)}</span>
                                                                <div className="t_btns clearfix">
                                                                    <a className="t_btn add" href="javascript:;" onClick={ev=>{this.addToPlaylist(item)}}></a>
                                                                     <a className="t_btn value" href="javascript:;"></a>
                                                                    <a className="t_btn share" href="javascript:;"></a>
                                                                     <a className="t_btn download" href="javascript:;"></a>
                                                                 </div>
                                                             </div>
                                                         </td>
                                                         <td className="column4">
                                                             <div className="overhide">
                                                                 <Link title={item.al.name} to={`/album?id=${item.al.id}`}>{item.al.name}</Link>
                                                             </div>
                                                         </td>
                                                         <td className="column5">
                                                             <div className="progress">
                                                                 <span style={{width: 100*item.pop/100 + '%'}}></span>
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
        );
    }
}

function matchStateToProps(state){
    return {
        playlist:state.playlist,
        currentMusic:state.currentMusic
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(SongsPanel);
