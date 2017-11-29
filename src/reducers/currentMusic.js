/*
    当前播放音乐的信息
 */
import {CHANGE_CURRENTMUSIC,DELETE_CURRENTMUSIC} from '../constants/index';
import localStorageFn from '../utils/localStore';

const initialState = {
    index:0, //当前播放第几首歌曲的索引
    info:null,//歌曲的信息
    url:null,//src
    playing:false,//是否播放
    lrc:[]//存放当前歌曲的歌词
};
//当前歌曲信息
export default function currentMusic(state = initialState, action){
    switch(action.type){
        case CHANGE_CURRENTMUSIC:
             const index = action.index === 0 ? 0 : action.index || state.index;
             let music = {
                 index:action.index || index,
                 info:action.info || state.info,
                 url:action.url || state.url, //由于不知道付费的字段时段哦，付费歌曲的url为空
                 lrc:action.lrc || state.lrc,
             };
             localStorageFn.setItem('currentMusic',JSON.stringify(music));
             return music;
        case DELETE_CURRENTMUSIC:
            return;
        default:
            return state;
    }
}
