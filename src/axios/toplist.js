//获取排行榜数据
import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取排行榜页面导航栏数据
export function getToplistNav(){
    return axios.get('/toplist');
}
//获取该榜单详情信息
export function getToplistDetail(id){
    return axios.get(`/top/list?idx=${id}`);
}
