/*
    一些与播放相关的reducer
        播放状态
        播放模式
 */
import {CHANGE_PLAYMODE,CHANGE_PLAYSTATE} from '../constants/index';

//播放模式
export function playMode(state=0,action){
    switch(action.type){
        case CHANGE_PLAYMODE:
            return action.mode;
        default:
            return state;
    }
}
//播放状态
export function playState(state=false,action){
    switch(action.type){
        case CHANGE_PLAYSTATE:
            return action.flag;
        default:
            return state;
    }
}
