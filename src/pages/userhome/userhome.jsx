/*
    网易云用户的个人主页
        router /user/home?id=
        内容：用户信息，创建的电台，创建的歌单，收藏的歌单等板块
*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';
import {getUserInfo,getUserCreateDT,getUserPlaylist} from '../../axios/user';
import {getPlaylistInfo} from '../../axios/playlist';

import UserInfo from '../../components/userhome/userInfo';
import UserCreateDT from '../../components/userhome/createDT';
import UserSonglist from '../../components/userhome/userSonglist';
import Loading from '../../components/loading';

//引入样式
import '../../static/css/userhome.css';


class UserHome extends React.Component {
    constructor(){
        super();
        this.state={
            infoData: null,//个人信息
            createList:null,//用户创建的歌单
            valueList: null, //用户收藏的歌单,
            dtRadioData: null //用户创建的电台
        };
        this.isFetch = true;
        this.changePlaylist=this.changePlaylist.bind(this);
    }
    componentDidMount(){
        let id = this.props.location.query.id;
        this.getInfo(id);
        this.getDtradio(id);
        this.getPlayList(id);
    }
    componentWillReceiveProps(nextprops){
        let id = nextprops.location.query.id;
        this.getInfo(id);
        this.getDtradio(id);
        this.getPlayList(id);
    }

    componentWillUnmount(){
        this.isFetch = false;
    }
    //切换歌单
    changePlaylist(id){
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

    getInfo(id){
        getUserInfo(id)
            .then(res=>{
                if(this.isFetch && res.data.code ==200){
                    this.setState({
                        infoData: res.data
                    });
                }

            })
            .catch(error=>{
                    console.log('请求用户信息出错',error);
            });
    }
    //获取用户创建的电台
    getDtradio(id){
        getUserCreateDT(id)
            .then(res=>{
                //console.log(res.data);
                if(this.isFetch && res.data.code ==200){
                    this.setState({
                        dtRadioData: res.data.djRadios
                    });
                }
            })
            .catch(error=>{
                console.log('请求数据失败', error);
            });
    }
    //获取用户歌单，包含创建和收藏的
    getPlayList(id){
        getUserPlaylist(id)
            .then(res=>{
                if(this.isFetch && res.data.code ==200){
                    this.setState({
                        valueList:res.data.playlist.filter(item=>item.userId != id) ,//个人信息
                        createList:res.data.playlist.filter(item=>item.userId == id)
                    });
                }
            })
            .catch(error=>{
                console.log('请求数据失败', error);
            });
    }
    render(){
        const {infoData,dtRadioData,createList,valueList} = this.state;
        //数据为载入完全
        if( !infoData || !dtRadioData || !createList || !valueList ){
            return(
                <div id="userhome" className="userhome g_main">
                    <div style={{paddingTop: '150px'}}><Loading /></div>
                </div>
            );
        }
        return(
            <div id="userhome" className="userhome g_main">
                <div className="uh_wrap g_wrap">
                    <UserInfo infoData={infoData} />
                    {/* 用户创建的电台 */}
                    {
                        dtRadioData.length>0?
                            <UserCreateDT nickname={infoData.profile.nickname} dtRadioData={dtRadioData} />:
                            null
                    }
                    {/* 用户创建的歌单 */}
                    {
                        createList.length>0?
                            <UserSonglist changePlaylist={this.changePlaylist} nickname={infoData.profile.nickname} data={createList} action="创建" />:null
                    }
                    {/* 用户收藏的歌单 */}
                    {
                        valueList.length>0?
                            <UserSonglist changePlaylist={this.changePlaylist} nickname={infoData.profile.nickname} data={valueList} action="收藏"  />:null
                    }
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

export default connect(matchStateToProps,mapDispatchToProps)(UserHome);
