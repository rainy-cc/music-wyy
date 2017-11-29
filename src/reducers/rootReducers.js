/*
    rootReducer
*/
import { combineReducers} from 'redux';
import playlist from './playlist.js';
import currentMusic from './currentMusic';
import {playMode ,playState} from './playState';
import modalStatus from './modal';


const playModeObj={
    sequence: 0, //顺序播放+
    cycle: 1, //循环播放
    random: 2 //随机播放
};
//状态树
const initialState = {
    userInfo:null, //用户信息
    playList: [],//播放列表
    currentMusic: {
        index:0,
        info:null,
        lrc: '',
        url:''
    } ,//当前歌曲信息
    playMode: playModeObj.sequence ,//当前播放模式
    playState: false //当前播放状态
};

//整合reducer
const rootReducer = combineReducers({
    //es6
    playlist,
    currentMusic,
    playMode,
    playState,
    modalStatus
});

export default rootReducer;
