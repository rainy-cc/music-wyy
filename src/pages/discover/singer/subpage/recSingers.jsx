/*
    推荐歌手列表 RecSingers
*/

import React from 'react';
import axios from 'axios';

import {getTopSingers,getSingers} from '../../../../axios/singer';

import SgImageWrap from '../../../../components/discover/singer/imagesWrap';
import Loading from '../../../../components/loading';


class RecSingers extends React.Component {
    constructor(){
        super();
        this.state = {
            signedSingers:null, //入驻歌手
            hotSingers: null //热门歌手
        };
        this.isFetch = true;
    }
    componentDidMount(){
        this.getData();
    }
    componentWillUnmount(){
        this.isFetch = false;
    }

    getData(){
        axios.all([
            getSingers(5001,66,0,10), //入驻歌手取出10条
            getTopSingers(0,100) //热门歌手
        ])
            .then(axios.spread((resData1,resData2)=>{
                //console.log(resData1,resData2);
                if(this.isFetch && resData1.data.code==200 && resData2.data.code==200){
                    this.setState({
                        signedSingers:resData1.data.artists, //入驻歌手
                        hotSingers: resData2.data.artists //热门歌手
                    });
                }
            }))
            .catch(error=>{
                console.log('获取推荐歌手列表失败',error);
            });
    }
    render(){
        let {signedSingers,hotSingers} = this.state;
        //数据未载入
        if(!signedSingers || !hotSingers){
            return(
                <div className="sg_ctx" style={{paddingTop: '150px'}}>
                    <Loading size="small" />
                </div>
            );
        }
        return(
            <div className="sg_ctx">
                <div className="c_title">
                    <h3 className="fl">入驻歌手</h3>
                    <a href="#" className="more fr">更多&gt;</a>
                </div>
                <div className="sg_list_wrap">
                    {/* <ul className="sg_list"></ul> */}
                    <SgImageWrap divideLine={false} datas={this.state.signedSingers} />
                </div>
                <div className="c_title">
                    <h3 className="fl">热门歌手</h3>
                    <a href="#" className="more fr">更多&gt;</a>
                </div>
                <div className="sg_list_wrap">
                    <SgImageWrap divideLine={true} datas={this.state.hotSingers} />
                </div>
            </div>
        );
    }
}

export default RecSingers;
