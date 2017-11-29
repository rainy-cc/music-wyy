import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
/**
 * [getSingersMv 获取歌手mv数据]
 * @param  {[number]} id [传入歌手id]
 * @param  {[number]} offset [偏移，分页]
 * @param  {[number]} limit [每次取多少条]
 * @return {[promise]}    [返回promise对象]
 */
export function getSingersMv(id, offset=0, limit=12){
    return axios.get('/artist/mv',{
        params:{
            id,
            limit,
            offset: offset * limit
        }
    });
}

//获取歌手单曲
export function getSingerSongs(id){
    return axios.get('/artists',{
        params:{
            id
        }
    });
}

//获取歌手介绍
export function getSingerIntro(id){
    return axios.get('/artist/desc',{
        params:{
            id
        }
    });
}

//获取歌手专辑
export function getSingerAlbum(id, offset=0, limit=12){
    return axios.get('/artist/album',{
        params:{
            id,
            limit,
            offset: offset * limit
        }
    });
}
//获取歌手列表
export function getSingers(id,initial,offset=0,limit=100){
    return axios.get('/artists/list', {
        params: {
            cat: id,
            initial: initial,
            offset: offset,
            limit: limit
        }
    });
}

//获取热门歌手
export function getTopSingers(offset=0,limit=100){
    return axios.get('/top/artists',{
        params:{
            offset:offset,
            limit:limit
        }
    });
}
