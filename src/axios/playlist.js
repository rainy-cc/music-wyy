import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';

//获取首页的热门推荐
export function getHotRec(){
    return axios.get('/personalized');
}

export function getHotRecProgram(){
    return axios.get('/personalized/djprogram');
}
//获取歌单的信息
export function getPlaylistInfo(id){
    return axios.get('/playlist/detail',{
        params:{
            id: id
        }
    });
}

//获取热门歌单
export function getHotPlaylist(limit=5){
    return axios.get('/top/playlist',{
        params:{
               limit
        }
    });
}

export function getPlaylist(category='全部',order='hot',offset=0,limit=35){
    return axios.get('/top/playlist',{
        params:{
            cat:category,
            order: order,
            offset:offset,
            limit:limit
        }
    });
}
