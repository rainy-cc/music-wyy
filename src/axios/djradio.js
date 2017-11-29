//获取电台相关信息的ajax请求
import axios from 'axios';
axios.defaults.baseURL = 'http://www.rainycc.com:4000';
//获取电台页面的导航数据
export function getDjCatelist(){
    return axios.get('/dj/catelist');
}
//获取电台推荐节目
export function getDjRecProgram(offset=0,limit=10){
    return axios.get('/program/recommend',{
        params:{
            offset:offset,
            limit:limit
        }
    });
}
//获取电台推荐节目
export function getDjTopProgram(offset=0,limit=10){
    return axios.get('/program/toplist',{
        params:{
            offset:offset,
            limit:limit
        }
    });
}
//获取不同type的电台数据
export function getDjType(type,offset=0,limit=10){
    return axios.get('/dj/recommend/type',{
        params:{
            type:type,
            offset:offset,
            limit:limit
        }
    });
}
//获取电台节目信息
export function getDJProgram(id){
    return axios.get(`/dj/program/detail?id=${id}`);
}

export function getDJDatail(id){
    return axios.get('/dj/detail',{
        params:{
            rid: id
        }
    });
}


export function getMoreDJPrograms(id,offset=1,limit=6){
    return axios.get('dj/program',{
    	params:{
    		rid:id,
    		offset:(offset-1)*limit,
    		limit
    	}
    });
}
//获取可能喜欢的其他人
export function getDjOthers(categoryId){
    return axios.get('/dj/hot',{
        params:{
            cat: categoryId,
            offset:0,
            limit: 5,
            order:0
        }
    });
}
