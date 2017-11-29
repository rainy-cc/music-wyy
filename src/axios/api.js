//获取api数据
import axios from 'axios';

//获取排行榜
export var getTopList = ()=>{
    return axios.get('/toplist');
};
