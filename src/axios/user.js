/**
 * 获取用户有关的数据
 */
import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取用户信息
export function getUserInfo(id){
    return axios.get(`/user/detail?uid=${id}`);
}
//获取用户创建的电台
export function getUserCreateDT(id){
    return axios.get(`/user/audio?uid=${id}`);
}

//获取用户歌单，包含创建和收藏的
export function getUserPlaylist(id){
    return axios.get(`/user/playlist?uid=${id}`);
}
