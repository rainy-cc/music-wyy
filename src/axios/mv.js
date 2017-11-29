//和mv相关的请求接口
import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取mv详情
export function getMvDetail(id){
    return axios.get('/mv',{
        params:{
            id:id
        }
    });
}

export function getSimilarMv(id){
    return axios.get('/simi/mv',{
        params:{
            mvid:id
        }
    });
}
