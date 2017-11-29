import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取搜索建议
export function getSearchSuggest(keywords){
    return axios.get('/search/suggest',{
        params:{
            keywords
        }
    });
}
/**
    type: 搜索类型；默认为1即单曲,取值意义:
    1: 单曲
    10: 专辑
    100: 歌手
    1000: 歌单
    1002: 用户
    1004: MV
    1006: 歌词
    1009: 电台
 */
export function getSearch(keywords,type,offset=1,limit=30){
    return axios.get('/search',{
        params:{
            keywords,
            type,
            limit,
            offset:(offset-1)*limit
        }
    });
}
