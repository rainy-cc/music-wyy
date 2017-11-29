//和专辑相关的数据请求
import axios from 'axios';

axios.defaults.baseURL = 'http://www.rainycc.com:4000'
//获取专辑详情
export function getAlbumInfo(id){
    return axios.get(`/album?id=${id}`);
}

//获取热门新碟  首页和专辑页面 （前10条）
export function getHotAlbums(){
    return axios.get('/hot/album');
}

//获取新碟上架数据
export function getAllAlbums(area,limit=35,page=1){
    return axios.get('/top/album',{
        params:{
            area:area,
            limit: 35, //每次取出多少条
            offset: (page-1)*35
        }
    });
}
