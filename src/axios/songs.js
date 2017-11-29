import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取单曲的信息
export function getSongInfo(id){
    return axios.get('/song/detail',{
        params:{
            ids: id
        }
    });
}

//获取播放url
export function getMusicUrl(id){
    return axios.get('/music/url',{
        params:{
            id
        }
    });
}
//获取单曲的歌词
export function getLrc(id){
    return axios.get('/lyric',{
        params:{
            id
        }
    });
}

//获取与该单曲的相似歌曲
export function getSimilarSong(id){
    return axios.get('/simi/song',{
        params:{
            id
        }
    });
}

//获取包含该单曲的歌单
export function getSimilarPlaylists(id){
    return axios.get('/simi/playlist',{
        params:{
            id
        }
    });
}
