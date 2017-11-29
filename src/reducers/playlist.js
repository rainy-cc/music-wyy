/*
    定义当前播放列表的reducer
*/
import {ADD_SONG,ADD_LIST,REMOVE_SONG,CHANGE_PLAYLIST} from '../constants/index';
import localStorageFn from '../utils/localStore';

const initialState = []; //存放歌曲列表信息
export default function playlist(state=initialState,action){
    switch(action.type){
        //添加单曲到播放列表
        case ADD_SONG:
            localStorageFn.setItem('playlist',JSON.stringify([...state,action.item]));
            return [...state,action.item];
        case ADD_LIST:
            localStorageFn.setItem('playlist',JSON.stringify([...state, ...action.list]));
            return [...state, ...action.list]
        //删除
        case REMOVE_SONG:
            let newList = [...state];
            newList.splice(action.index,1);
            localStorageFn.setItem('playlist',JSON.stringify(newList));
            return newList;
        //重置整个列表
        case CHANGE_PLAYLIST:
            localStorageFn.setItem('playlist',JSON.stringify(action.playlist))
            return action.playlist;
        default:
            return state;
    }
}
