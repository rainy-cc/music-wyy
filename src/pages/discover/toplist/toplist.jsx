
/*
    排行榜页面
    @router /discover/toplist?id=
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';

import { getToplistNav, getToplistDetail } from '../../../axios/toplist';
import { getPlaylistComment } from '../../../axios/comment';
import { arrRemoveSame } from '../../../utils/util';
import Comment from '../../../components/comment/comment';
import Pagination from '../../../components/pagination';
import Loading from '../../../components/loading';
import TopListNav from '../../../components/discover/toplist/toplistNav';
import TopListTable from '../../../components/discover/toplist/toplistTable';
import ToplistInfo from '../../../components/discover/toplist/toplistInfo';

import '../../../static/css/toplist.css';
class TopList extends React.Component {
    constructor(){
        super();
        this.state = {
            gList: [], //global 全球煤体
            fList:[] ,// feature 特色音乐
            detailDatas:null,//详情
            nowId:19723756,
            comments: null //评论数据
        };
        this.isFetch = true;
        this.clickChangeState = this.clickChangeState.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.addAllToList = this.addAllToList.bind(this);
        this.changeList = this.changeList.bind(this);
    }

    componentDidMount(){ //默认取前20条数据
        let id = this.props.location.query.id ||  19723756;
        this.setState({
            nowId: id,
        });
        this.getNavData();
        this.getDetail(id);
        this.getCommentData(id,1,20);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location.query.id == nextProps.location.query.id){
            return false;
        }
        let id = nextProps.location.query.id;
        this.setState({
            nowId: id,
            detailDatas:null,
            comments: null //评论数据
        });
        this.getDetail(id);
        this.getCommentData(id,1,20);
    }
    componentWillUnmount(){
        this.isFetch = false;
    }
    changeList(){
        let list = this.state.detailDatas.tracks.concat();
        this.props.actions.changePlaylist(list);
        this.props.actions.changeMusicAsync(list[0].id,0);//播放该歌单的第一首歌
    }
    addAllToList(){
        let nowPlaylist = this.props.playlist;
        let list = this.state.detailDatas.tracks.concat();
        //删除已经存在的歌曲
        let result = arrRemoveSame(nowPlaylist,list);
        //console.log(result);
        this.props.actions.addList(result);
    }
    //添加到列表并且播放
    addAndPlay(song){
        this.props.actions.playItem(song);
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
    pageChange(currentPage,pageSize){
        let id = this.props.location.query.id ||  19723756;
        this.getCommentData(id,currentPage,pageSize);
    }
    //获取左侧导航数据
    getNavData(){
        getToplistNav()
            .then(res=>{
                //console.log(res.data.list);
                if(this.isFetch&&res.data.code==200){
                    const dataList = res.data.list;
                    const gList = dataList.filter(item => {
                        return !item.ToplistType;
                    });
                    const fList = dataList.filter(item => {
                        return item.ToplistType;
                    });
                    this.setState({
                        gList: gList,
                        fList: fList
                    });
                }
            })
            .catch(error=>{
                console.log('获取排行榜数据失败',error);
            });
    }
    //获取评论数据
    getCommentData(id,currentPage = 1,pageSize = 20){
        //获取评论
        getPlaylistComment(id,currentPage,pageSize)
            .then(res=>{
                //console.log('data',res.data);
                if(this.isFetch&&res.data.code==200){
                    this.setState({
                        comments: res.data
                    });
                }
                //console.log('state',this.state.comments)
            })
            .catch(error=>{
                console.log('加载失败'+error);
            });
    }
    //获取歌曲列表的请求
    getDetail(id){
        getToplistDetail(id)
            .then(res=>{
                //console.log('jintian ',res.data);
                if(this.isFetch && res.data.code==200){
                    //console.log(res.data.playlist);
                    this.setState({
                        detailDatas:res.data.playlist,
                    });
                }
            })
            .catch(error=>{
                console.log('请求数据失败',error);
            });
    }
    //每个Li的点击事件，改变当前id
    clickChangeState(id){
        //pushState
        this.props.history.push(`/discover/toplist?id=${id}`);
    }
    render(){
        let {gList,fList,nowId, detailDatas, comments} = this.state;
        return(
            <div id="toplist" className="g_main">
                <div className="tl_wrap clearfix">
                    <div className="tl_l fl">
                        <TopListNav gList={gList} fList={fList} nowId={nowId} change={this.clickChangeState}  />
                    </div>
                    <div className="tl_r fr">
                        <div className="tl_r_ctx">
                            {
                                !detailDatas?
                                <div style={{height: '100px', padding:'250px 0'}}>
                                    <Loading size="small" />
                                </div>:
                                <div>
                                    <ToplistInfo changeList={this.changeList} addAllToList={this.addAllToList} updateTime={''} detailDatas={detailDatas}/>
                                    <TopListTable currentMusic={this.props.currentMusic} addAndPlay={this.addAndPlay} addToPlaylist={this.addToPlaylist} detailDatas={detailDatas}/>
                                </div>
                            }
                            {
                                comments ?
                                (
                                    <div>
                                        <Comment commentData= {comments} />
                                        {
                                            /*数据不超过一页不显示分页条*/
                                            comments.total>20?<Pagination total = {comments.total} onChange={this.pageChange} pageSize={20}  />:null
                                        }
                                    </div>
                                ):
                                <div style={{paddingTop:'150px'}}><Loading size="small" /></div>
                            }
                        </div>
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

export default connect(matchStateToProps,mapDispatchToProps)(TopList);
