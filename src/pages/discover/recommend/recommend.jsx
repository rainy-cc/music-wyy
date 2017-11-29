/*
    推荐首页 router : / or /discover
        1.导航轮播  banner
        2.右侧部分 sidebar
        3.页面主体 content
            3.1.热门推荐
            3.2 新碟上架
            3.3 榜单

*/
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';
import {getHotAlbums,getAlbumInfo} from '../../../axios/album';

import {getToplistDetail} from '../../../axios/toplist';
import { getPlaylistInfo } from '../../../axios/playlist.js';
import {getHotRec,getHotRecProgram} from '../../../axios/playlist';
import {singersData} from '../../../axios/mock';
import Banner from '../../../components/banner/banner';
import RecDiscPanel from '../../../components/discover/recommend/discPanel';
import RecommendAd from '../../../components/discover/recommend/recAd';
import RecommendHotPanel from '../../../components/discover/recommend/recHotPanel';
import RecBillboard from '../../../components/discover/recommend/billboard';
import SideBarLogin from '../../../components/discover/recommend/sidebar_top';
import SignedSingerPanel from '../../../components/discover/recommend/signedSingerPanel';
import HotAnchor from '../../../components/discover/recommend/hotAnchor';


//import '../../../static/css/recommend.css';

class Recommend extends React.Component {

    constructor(){
        super();
        this.state={
            hotRecommendData:[],
            albumData: [], //新碟上架数据
            bsData:null, //飙升榜
            xgData:null,//新歌帮
            ycData:null //原创
        };

        this.isFetch = true;
        this.changeList = this.changeList.bind(this);
        this.playPlayist = this.playPlayist.bind(this);
        this.playProgram = this.playProgram.bind(this);
        this.playAlbum = this.playAlbum.bind(this);
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToList = this.addToList.bind(this);
    }
    componentDidMount(){
        this.getHotRecData();
        this.getHotAlbumData();
        this.getListData();
    }
    componentWillUnmount(){
        this.isFetch = false;
    }
    changeList(list){
        this.props.actions.changePlaylist(list);
        this.props.actions.changeMusicAsync(list[0].id,0);//播放该歌单的第一首歌
    }
    //用户登录
    login(){
        this.props.actions.changeModalStatus('login');
    }
    //播放歌单
    playPlayist(id){
        getPlaylistInfo(id)
            .then(res=>{
                if(res.data.code == 200){
                    let playlist = res.data.playlist;
                    //如果歌单歌曲列表为空
                    if(!playlist.tracks.length){
                        return;
                    }else {
                        let newTracks = playlist.tracks.map(item=>{
                            return item;
                        });
                        this.props.actions.changePlaylist(newTracks);
                        this.props.actions.changeMusicAsync(newTracks[0].id,0);//播放该歌单的第一首歌
                    }
                }
            })
            .catch(error=>{
                console.log('获取失败',error);
            });
    }
    //将电台节目添加到播放列表并且播放
    playProgram(program){
        // let mainSong = program.mainSong;
        // console.log('program',program);
        // this.props.actions.playItem(mainSong);
        this.props.actions.playItem(program);
    }
    playAlbum(id){
        getAlbumInfo(id)
            .then(res=>{
                if(res.data.code == 200){
                    if(res.data.album.status < -1){
                        //alert('该歌曲需要付费');
                        this.props.actions.changeModalStatus('pay');
                    }else{
                        let songs = res.data.songs;
                        this.props.actions.changePlaylist(songs);
                        this.props.actions.changeMusicAsync(songs[0].id,0);//播放该专辑的第一首歌
                    }
                }
            })
            .catch(error=>{
                console.log('获取失败',error);
            });

    }
    //添加单曲到列表并播放
    addAndPlay(song){
        this.props.actions.playItem(song);
    }
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
    //获取热门推荐的数据
    getHotRecData(){
        axios.all([
            getHotRec(),
            getHotRecProgram()
        ])
          .then(axios.spread((hotData, dtProgramData)=>{
            // 两个请求都成功
            //console.log(hotData)
            //console.log(dtProgramData)
            let hotRecommendData = hotData.data.result;
            hotRecommendData.splice(2,0,dtProgramData.data.result[0]);
            hotRecommendData.splice(4,0,dtProgramData.data.result[1]);
            hotRecommendData.splice(6,0,dtProgramData.data.result[2]);
            hotRecommendData.splice(3,1);
            //console.log(hotRecommendData);
            if(this.isFetch){
                this.setState({
                    hotRecommendData: hotRecommendData
                });
            }

          }))
          .catch(error => {
              console.log('请求出错',error);
          });
    }
    //获取新碟上架的十条数据
    getHotAlbumData(){
        getHotAlbums()
            .then(res=>{
                if(res.data.code == 200){
                    if(this.isFetch){
                        this.setState({
                            albumData:res.data.albums.slice(0,10) //取出10条
                        });
                    }
                }
            })
            .catch(error=>{
                console.log('获取新碟上架数据失败',error);
            });
    }
    //获取新歌榜  飙升榜 原创榜数据
    getListData(){
        axios.all([
            getToplistDetail(19723756),
            getToplistDetail(3779629),
            getToplistDetail(2884035)
        ])
            .then(axios.spread( (res1, res2,res3)=> {
                // 3个请求现在都执行完成
                //console.log('飙升榜',res1.data);
                if(this.isFetch){
                    this.setState({
                        bsData:res1.data.playlist, //飙升榜
                        xgData:res2.data.playlist,//新歌帮
                        ycData:res3.data.playlist //原创
                    });
                }
            }))
            .catch(error=>{console.log(error);});
    }
    render(){
        return (
            <div>
                <Banner />
                <div className="recommend g_main">
                    <div className="recommend_wrap clearfix">
                        <div className="rec_ctx">
                            <RecommendHotPanel playPlayist={this.playPlayist} playProgram={this.playProgram} data={this.state.hotRecommendData} />
                            <RecommendAd />
                            <RecDiscPanel playAlbum={this.playAlbum} data={this.state.albumData}/>
                            <RecBillboard changeList={this.changeList} addAndPlay={this.addAndPlay} addToList={this.addToList} bsData={this.state.bsData} xgData={this.state.xgData} ycData={this.state.ycData} />
                        </div>
                        <div className="m_sidebar_wrap">
                            <SideBarLogin login={this.login.bind(this)}/>
                            <SignedSingerPanel data={singersData}/>
                            <HotAnchor/>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(Recommend);
