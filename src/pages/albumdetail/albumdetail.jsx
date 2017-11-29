/*
    新碟详情页面 albumDetail
        @router: /album?id=
*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import {getAlbumInfo} from '../../axios/album.js';
import {getSingerAlbum} from '../../axios/singer.js';
import {getAlbumComment} from '../../axios/comment.js';
import { arrRemoveSame } from '../../utils/util';
import SideAd from '../../components/sideAd';
import MutilDownload from '../../components/download/mutilDownload';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';
import Comment from '../../components/comment/comment';
import AlbumDesc from '../../components/album/albumDesc';
import AlbumInfo from '../../components/album/albumInfo';
import AlbumDetailTable from '../../components/album/albumTable';
import OtherAlbumPanel from '../../components/album/otherAlbum';

import '../../static/css/albumDetail.css';

class AlbumDetailPage extends React.Component {

    constructor(){
        super();
        this.state={
            albumData: null, //专辑详情的数据
            otherAlbumData:[], //他的热门专辑 取5条
            commentData:null,
            total: 0
        };
        this.isFetch = true;
        this.pageChange = this.pageChange.bind(this);
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToList = this.addToList.bind(this);
        this.addAllToList = this.addAllToList.bind(this);
        this.changeList = this.changeList.bind(this);
    }

    componentDidMount(){
        let id = this.props.location.query.id; //获取id
        //请求数据
        this.getAlbumDetailData(id);
        this.getCommentData(id,1);
    }
    componentWillReceiveProps(nextProps){
        let prevId = this.props.location.query.id; //获取id
        let nowId = nextProps.location.query.id;
        if(prevId == nowId){
            return;
        }
        this.setState({
            albumData:null,
            commentData:null,
        });
        this.getAlbumDetailData(nowId);
        this.getCommentData(nowId,1);
    }
    componentWillUnmount(){
        this.isFetch = false;
    }

    changeList(){
        if(this.state.albumData.album.status < -1){
            //付费提示
            this.props.actions.changeModalStatus('pay');
            return;
        }
        let list = this.state.albumData.songs.concat();
        this.props.actions.changePlaylist(list);
        this.props.actions.changeMusicAsync(list[0].id,0);//播放该歌单的第一首歌
    }
    addAllToList(){
        if(this.state.albumData.album.status < -1){
            //付费提示
            this.props.actions.changeModalStatus('pay');
            return;
        }
        let nowPlaylist = this.props.playlist;
        let list = this.state.albumData.songs.concat();
        let result = arrRemoveSame(nowPlaylist,list);
        this.props.actions.addList(result);
    }
    //添加到列表并且播放
    addAndPlay(song){
        this.props.actions.playItem(song);
    }
    //添加到列表不播放
    addToList(song){
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
    //获取专辑详情数据
    getAlbumDetailData(id){
        getAlbumInfo(id)
            .then(res=>{
                //console.log(res.data);
                if(this.isFetch && res.data.code ==200){
                    this.setState({
                        albumData: res.data
                    });
                }
                return getSingerAlbum(res.data.album.artist.id,0,5);
            })
            .then(res=>{
                if(this.isFetch && res.data.code ==200){
                    //console.log(res.data.hotAlbums);
                    this.setState({
                        otherAlbumData: res.data.hotAlbums
                    });
                }
            })
            .catch(error=>{
                console.log('获取专辑详情数据失败',error);
            });
    }

    //获取歌单评论，每次取20条
    getCommentData(id,page,offset=20){
        getAlbumComment(id,page,offset)
            .then(res=>{
                //console.log(res.data);
                if(this.isFetch && res.data.code ==200){
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
        let { albumData } = this.state;
        if(!albumData){
            return(
                <div id="album_detail" className="album_detail g_main">
                    <div style={{paddingTop:'150px'}}>
                        <Loading />
                    </div>
                </div>
            );
        }
        return(
            <div id="album_detail" className="album_detail g_main g_mainbg clearfix">
                <div className="albd_ctx fl">
                    <div className="albd_ctxwrap">
                        <AlbumInfo album={ albumData.album } changeList={this.changeList} addAllToList={this.addAllToList}/>
                        <AlbumDesc album={ albumData.album } />
                        <AlbumDetailTable addAndPlay={this.addAndPlay} addToList={this.addToList} songs={albumData.songs} curMusic={this.props.currentMusic} />
                        {
                            !this.state.commentData?
                            <div style={{padding:'150px 0'}}><Loading size="small" /></div>:
                            (
                                <div>
                                    <Comment commentData= {this.state.commentData}/>
                                    {
                                        /*数据不超过一页不显示分页条*/
                                        this.state.total>20?<Pagination total = {this.state.total} onChange={this.pageChange} pageSize={20}  />:null
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="albd_side g_side fr">
                    <div className="g_sidewrap">
                        <SideAd />
                        <OtherAlbumPanel data={this.state.otherAlbumData} />
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
        currentMusic:state.currentMusic
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(AlbumDetailPage);
