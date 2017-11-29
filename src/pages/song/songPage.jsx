/**
 * 歌曲单曲页面
 *
 *  @router ： /song?id=?
 */

import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import { getLrc, getSimilarSong, getSimilarPlaylists, getSongInfo } from '../../axios/songs.js';
import { getMusicComment } from '../../axios/comment.js';
import { parseLrc } from '../../utils/parseLyric.js';
import localStorageFn from '../../utils/localStore.js';
import  Comment from '../../components/comment/comment';
import Pagination from '../../components/pagination';
import MutilDownload from '../../components/download/mutilDownload';
import Loading from '../../components/loading';
import SideAd from '../../components/sideAd';
import SidePlaylist from '../../components/sidePlaylist.jsx';
import SimliarSongs from '../../components/song/simisongs';
import SongInfo from '../../components/song/songinfo';



import '../../static/css/songpage.css';

class SongPage extends React.Component {

    constructor(){
        super();
        this.state = {
            infoData: null,//歌曲简要信息
            lrc:[],  //歌曲歌词
            commentData:null,//该歌曲评论
            total: 0,
            sililarSongsData: [],//与该歌曲相似的歌曲，
            sililarPlaylistData:[]//与该歌曲相似的歌dan，
        };

        this.pageChange = this.pageChange.bind(this);
        this.playSong = this.playSong.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getLrcData(id);
        this.getCommentData(id);
        this.getSimilarData(id);
        this.getInfoData(id);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return false;
        }
        //将所有的数据先清空，否则会出现覆盖的效果，而不像刷新
        this.setState({
            infoData: null,
            lrc:[],  //歌曲歌词
            commentData:null,//该歌曲评论
            total: 0,
            sililarSongsData: [],//与该歌曲相似的歌曲，
            sililarPlaylistData:[]//与该歌曲相似的歌dan，
        });
        let id = nextProps.location.query.id;
        this.getLrcData(id);
        this.getCommentData(id);
        this.getSimilarData(id);
        this.getInfoData(id);
    }

    playSong(song){
        this.props.actions.playItem(song); //内部处理了存在的情况
    }
    //添加歌曲到列表
    addSong(song){
        let playlist = this.props.playlist;
        let isExist = playlist.map(item =>item.id).indexOf(song.id) == -1;
        if(isExist){//不存在
            this.props.actions.addSong(song);
        }else {
            console.log("播放列表已存在");
            return;
        }
    }
    //评论分页数据更新
    pageChange(currentPage,pageSize){
        let id = this.props.location.query.id;
        this.getCommentData(id,currentPage);
    }
    //获取单曲信息
    getInfoData(id){
        getSongInfo(id)
            .then(res=>{
                //console.log(res.data.songs[0]);
                if(res.data.code == 200){
                    this.setState({
                        infoData: res.data.songs
                    });
                }

            })
            .catch(error=>{
                console.log('获取单曲信息失败',error);
            });
    }
    //获取歌曲的id值
    getCommentData(id,offset=1){
        getMusicComment(id,offset)
            .then(res=>{
                if(res.data.code == 200){
                    this.setState({
                        commentData:res.data,
                        total: res.data.total
                    });
                }
            })
            .catch(error=>{
                console.log('获取歌曲评论失败',error);
            });
    }
    //获取单曲lrc
    getLrcData(id){
        getLrc(id)
            .then(res=>{
                //歌词要存在
                if(res.data.code==200 && res.data.lrc){
                    this.setState({
                        lrc: parseLrc(res.data.lrc.lyric)
                    });
                }
            })
            .catch(error=>{
                console.log('获取歌词失败',error);
            });
    }
    //获取与该歌曲相似的歌曲和专辑
    getSimilarData(id){

        axios.all([
            getSimilarSong(id),
            getSimilarPlaylists(id)
        ])
            .then(
                axios.spread((res1, res2) => {
                    this.setState({
                        sililarSongsData: res1.data.songs,
                        sililarPlaylistData:res2.data.playlists
                    });
                })
            );

    }

    render(){
        const {lrc, infoData,commentData,total,sililarPlaylistData, sililarSongsData} = this.state;
        if(!infoData){
            return(
                <div id="song" className="g_main clearfix">
                    <div style={{padding: '150px 0'}}><Loading /></div>
                </div>
            );
        }
        return(
            <div id="song" className="g_main g_mainbg clearfix">
                <div className="song_ctx fl">
                    <div className="wrap">
                        <SongInfo playSong={this.playSong} addSong={this.addSong} lrc={lrc} infoData = {infoData} />
                        {
                            commentData?(
                                <div>
                                    <Comment commentData= { commentData }/>
                                    {
                                        total>20?
                                        <Pagination total={total} onChange={this.pageChange} pageSize={20}  />:
                                        null
                                    }
                                </div>
                            ):null
                        }
                    </div>
                </div>
                <div className="song_side g_side fr">
                    <div className="song_sidewrap g_sidewrap">
                        {
                            sililarPlaylistData.length?
                            <SidePlaylist title="包含这首歌的歌单" playlists={sililarPlaylistData} />:<SideAd />
                        }
                        {
                            sililarSongsData.length?<SimliarSongs  playSong={this.playSong} addSong={this.addSong} data={sililarSongsData}/>:null
                        }
                        <MutilDownload />
                    </div>
                </div>
            </div>
        );
    }
}


function matchStateToProps(state){
    return {
        playlist:state.playlist,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(SongPage);
