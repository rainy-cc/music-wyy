/**
 * 获取相关评论的接口
 */
import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';

/**
 * [getComment 获取歌曲的评论]
 * @param  {[Number]} id         [获取歌曲]
 * @param  {Number} [offset=0] [歌曲id]
 * @param  {Number} [limit=20] [取出评论数量,默认为20]
 * @return {[promise]}            [偏移数量,用于分页,如:(评论页数-1)*20, 其中 20 为 limit 的值]
 */
export function getMusicComment(id,offset=1,limit=20){
    return axios.get('/comment/music',{
        params:{
            id,
            limit,
            offset: (offset-1)*limit
        }
    });
}

//获取歌单评论
export function getPlaylistComment(id,offset=1,limit=20){
    return axios.get('/comment/playlist',{
        params:{
            id,
            limit,
            offset: (offset-1)*limit
        }
    });
}

//获取专辑评论
export function getAlbumComment(id,offset=1,limit=20){
    return axios.get('/comment/album',{
        params:{
            id,
            limit,
            offset: (offset-1)*limit
        }
    });
}

//获取电台节目评论
export function getDJProgramComment(id,offset=1,limit=20){
    return axios.get('/comment/dj',{
        params:{
            id,
            limit,
            offset: (offset-1)*limit
        }
    });
}

//获取MV评论
export function getMvComment(id,offset=1,limit=20){
    return axios.get('/comment/mv',{
        params:{
            id,
            limit,
            offset: (offset-1)*limit
        }
    });
}
