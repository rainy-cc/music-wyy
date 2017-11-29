/*
    歌单详情页
        /playlist?id=?
*/

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import { getPlaylistInfo, getHotPlaylist } from '../../axios/playlist.js';
import { getPlaylistComment } from '../../axios/comment.js';
import { arrRemoveSame } from '../../utils/util';

import Loading from '../../components/loading';
import SideAd from '../../components/sideAd';
import MutilDownload from '../../components/download/mutilDownload';
import Pagination from '../../components/pagination';
import Comment from '../../components/comment/comment';

import PlaylistInfo from '../../components/playlist/playlistInfo.jsx';
import PlaylistTable from '../../components/playlist/playlistTable';
import SidePlaylist from '../../components/sidePlaylist.jsx';

import '../../static/css/playlistDetail.css';

class PlayListPage extends React.Component {
    constructor(){
        super();
        this.state={
            infoData:null,  //歌单详情数据；
            hotRecData:null, //热门歌单数据  取五条
            total:0,
            commentData: null
        };
        this.pageChange = this.pageChange.bind(this);
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.changePlaylist = this.changePlaylist.bind(this);
        this.addAllTolist = this.addAllTolist.bind(this);
    }
    componentDidMount(){
        //拿到路由id
        let id=this.props.location.query.id;
        console.log(this.props.history);
        //console.log(id);
        this.getInfoData(id);
        this.getHotRecData(5);
        this.getCommentData(id,1);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return;
        }
        this.setState({
            infoData:null,  //歌单详情数据；
            hotRecData:null //热门歌单数据  取五条
        });
        let id=nextProps.location.query.id;
        this.getInfoData(id);
        this.getHotRecData(5);
        this.getCommentData(id,1);
    }
    //添加全部到列表并且播放第一首
    changePlaylist(){
        let list = this.state.infoData.playlist.tracks.concat();
        this.props.actions.changePlaylist(list);
        this.props.actions.changeMusicAsync(list[0].id,0);//播放该歌单的第一首歌
    }
    //添加该歌单到播放列表
    addAllTolist(){
        //拿到当前的播放列表
        let nowPlaylist = this.props.playlist;
        let list = this.state.infoData.playlist.tracks.concat();
        let result = arrRemoveSame(nowPlaylist,list);
        //console.log(result);
        this.props.actions.addList(result);
    }
    //添加到列表并且播放
    addAndPlay(song){
        //看看当前播放列表是否存在
        let curPlaylist = this.props.playlist;
        if(song.st < 0){
            alert('所在地区没有版权');
        }else{
            this.props.actions.playItem(song);
        }
    }
    //添加到列表不播放
    addToPlaylist(song){
        let curPlaylist = this.props.playlist;
        let isExist = curPlaylist.map(item =>item.id).indexOf(song.id) == -1;
        if(isExist){//不存在
            this.props.actions.addSong(song);
        }else {
            console.log("播放列表已存在");
            return;
        }
    }
    //页码改变
    pageChange(currentPage,pageSize){
        let id=this.props.location.query.id;
        this.getCommentData(id,currentPage);
    }

    getInfoData(id){
        getPlaylistInfo(id)
            .then(res=>{
                //console.log(res.data);
                if(res.data.code ==200){
                    this.setState({
                        infoData: res.data
                    });
                }
            })
            .catch(error=>{
                console.log('获取歌单信息失败',error);
            });
    }
    //获取推荐热门歌单 取5条
    getHotRecData(limit){
        getHotPlaylist(limit)
            .then(res=>{
                //console.log(res.data);
                if(res.data.code ==200){
                    this.setState({
                        hotRecData: res.data
                    });
                }
            })
            .catch(error=>{
                console.log('获取推荐歌单数据失败',error);
            });
    }

    //获取歌单评论，每次取20条
    getCommentData(id,page,offset=20){
        getPlaylistComment(id,page,offset)
            .then(res=>{
                console.log(res.data);
                if(res.data.code == 200){
                    this.setState({
                        commentData: res.data,
                        total:res.data.total
                    });
                }

            })
            .catch(error=>{
                console.log('获取专辑评论失败',error);
            });
    }

    render(){
        let {infoData,hotRecData,commentData,total} = this.state;
        if(!infoData || !hotRecData){
            return (
                <div className="pl_detail g_main clearfix">
                    <div style={{paddingTop:'150px'}}>
                        <Loading />
                    </div>
                </div>
            );
        }
        return(
            <div id="pl_detail" className="pl_detail g_main g_mainbg clearfix">
                <div className="pld_ctx fl">
                    <div className="pld_ctx_wrap">

                        <PlaylistInfo changePlaylist={this.changePlaylist} addAllTolist={this.addAllTolist} datas={infoData.playlist} />
                        <PlaylistTable addAndPlay={this.addAndPlay} addToPlaylist={this.addToPlaylist}
                            curMusic={this.props.currentMusic} playCount={this.state.infoData.playlist.playCount} tracks={this.state.infoData.playlist.tracks} />
                        {
                            !commentData
                            ?<div style={{paddingTop:'150px'}}><Loading size="small" /></div>
                            :(
                                <div>
                                    <Comment commentData= {commentData}/>
                                    {
                                        /*数据不超过一页不显示分页条*/
                                        total>20?<Pagination total = {total} onChange={this.pageChange} pageSize={20}  />:null
                                    }

                                </div>
                            )
                        }
                    </div>
                </div>
                {/*右侧side*/}
                <div className="pld_side fr">
                    <div className="pld_sd_wrap">
                        <SideAd />
                        <SidePlaylist title="热门歌单" playlists={hotRecData.playlists} />
                        <MutilDownload />
                    </div>
                </div>
            </div>
        );
    }
}

//映射
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

export default connect(matchStateToProps,mapDispatchToProps)(PlayListPage);
