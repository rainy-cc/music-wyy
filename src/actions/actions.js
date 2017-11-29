/*
    设计state
*/

import * as actionTypes from '../constants/index.js';
import {getMusicUrl,getLrc} from '../axios/songs.js';
import {parseLrc} from '../utils/parseLyric';
const playMode={
    single: 0, //顺序播放+
    loop: 1, //循环播放
    random: 2 //随机播放
};
const modalStatus = {
    login: 'login', //登录
    register: 'register',//注册
    phoneLogin: 'phoneLogin',//手机号登录
    pay: 'pay', //购买提示
    none:'none' //隐藏
};

//state的简要设计
const initialState = {
    userInfo:null, //用户信息
    modalStatus:modalStatus.none,
    playList: [],//播放列表
    currentMusic: {
        index:0,
        info:null,//歌曲信息
        lrc: [],//歌曲lrc
        url:''//歌曲地址
    } ,//当前歌曲信息
    playMode: playMode.single ,//当前播放模式
    playState: false //当前播放状态
};
/*
    定义action常量
*/

//改变模态框的显示隐藏
export function changeModalStatus(status){
    return {
        type: actionTypes.CHNAGE_MODAL_STATUS,
        status
    };
}

//变更用户
export function updateUserInfo(userinfo){
    return {
        type: actionTypes.USERINFO_UPDATE,
        userinfo
    };
}


//修改播放模式
export function changePlayMode(mode){
    return {
        type: actionTypes.CHANGE_PLAYMODE,
        mode
    };
}

//修改播放状态
export function changePlayState(flag){
    return {
        type: actionTypes.CHANGE_PLAYSTATE,
        flag
    };
}

//切换当前的播放列表(歌单)
export function changePlaylist(playlist){
    return {
        type: actionTypes.CHANGE_PLAYLIST,
        playlist
    };
}

//添加单曲到播放列表
export function addSong(item){
    return {
        type: actionTypes.ADD_SONG,
        item
    };
}
//添加歌单到播放列表
export function addList(list){
    return {
        type: actionTypes.ADD_LIST,
        list
    };
}

//播放列表中移除该歌曲
export function removeSong(index){
    return {
        type: actionTypes.REMOVE_SONG,
        index
    };
}
//添加到列表并播放(电台节目和歌曲)
export function playItem(item){
    return function(dispatch,getState){
        let playlist = getState().playlist;
        //let isPlaying= getState().playState;
        let id;
        if(item.radio){
            //电台节目
            id = item.mainSong.id;
        }else{
            //歌曲
            id=item.id;
        }
        let index = playlist.map(item =>item.id).indexOf(item.id); //查找列表中是否存在该歌曲

        if(index != -1){
            //如果添加的该歌曲存在于播放列表中，直接切换到该歌曲播放
            dispatch(changeMusicAsync(id,index));
        }else{
            //先添加在播放
            dispatch(addSong(item)); //将该歌曲添加到列表
            dispatch(changeMusicAsync(id,playlist.length));
        }
    };
}
//改变当前歌曲
export function changeCurrentMusic({index,url,info,lrc}){
    return {
        type: actionTypes.CHANGE_CURRENTMUSIC,
        index,
        url,
        info,
        lrc
    };
}

//删除歌曲
export function deleteCurrent(index){
    return {
        type: actionTypes.DELETE_CURRENTMUSIC,
        index
    };
}

//异步action请求
export  function changeMusicAsync(id,index){
    return function(dispatch,getState){
        let url,info,lrc;
        //拿到歌曲信息
        info = getState().playlist[index];
        //获取歌曲url 和歌词
        getMusicUrl(id)
            .then(res=>{
                if(res.data.code == 200) {
                    url = res.data.data[0].url;
                }
                dispatch(changePlayState(true));//播放该歌曲
                return getLrc(id);
            })
            .then(res=>{
                if(res.data.code == 200) {
                    if(res.data.lrc){
                        lrc = parseLrc(res.data.lrc.lyric);
                    }else{
                        lrc=[];
                    }
                }
                dispatch(changeCurrentMusic({index,url,info,lrc}));
            })
            .catch(error=>{
                console.log('获取失败',error);
            });

    };
}
