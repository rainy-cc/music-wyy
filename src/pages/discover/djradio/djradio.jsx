/*
    电台页面
        @router /discover/djradio
        include: 导航这轮播组件
                 推荐节目 or 节目排行组件
                 电台分类组件
*/

import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';
import {daCategories} from '../../../utils/config';
import {getDjCatelist,getDjRecProgram,getDjTopProgram,getDjType} from '../../../axios/djradio';
import RadioType from './subpage/radioType';
import RadioTop from './subpage/radioTop';
import RadioRec from './subpage/radioRec';
import RadioNav from './subpage/radioNav';

//import '../../../static/css/djradio.css';
class DJradio extends React.Component{
    constructor(){
        super();
        this.state = {
            recDatas:[],//推荐
            rankDatas:[],//排行
            navData1:null,//导航数据第一页
            navData2:null,//导航数据第2页
            categories:daCategories //首页的分类
        };
        this.playDjRecProgram = this.playDjRecProgram.bind(this);
        this.playDjTopProgram = this.playDjTopProgram.bind(this);
    }
    componentDidMount(){
        //获取导航轮播数据
        this.getCatelistData();
        /*
            请求推荐节目和节目排行榜的数据
            各取10条
        */
        this.getRecTop10();
        //获取推荐电台 /dj/recommend/type?type=2&offset=0&limit=4
        let categories = this.state.categories;
        let ajaxReqArr = categories.map((item)=>{
            return getDjType(item.typeId,0,4);
        });
        axios.all(ajaxReqArr)
            .then(response => {
                //console.log(response); //得到6个数组
                response.forEach((item,index) => {
    				if(item.data.code == 200) {
    					categories[index].data = item.data.djRadios;
    				}
    			});
                this.setState({
                    categories: categories
                });
            });

    }
    //播放该节目并添加到列表
    playDjRecProgram(index){
        let program = {...this.state.recDatas[index]};
        this.props.actions.playItem(program);
    }
    playDjTopProgram(index){
        let program = {...this.state.rankDatas[index].program};
        this.props.actions.playItem(program);
    }
    //获取导航轮播数据
    getCatelistData(){
        getDjCatelist()
            .then(response => {
                //console.log(response.data.categories.slice(0,18));
                //console.log(response.data.categories.slice(18));
                this.setState({
                    navData1:response.data.categories.slice(0,18),
                    navData2:response.data.categories.slice(18)
                });
            })
            .catch(error=>{console.log(error);});
    }
    //获取推荐的节目数据
    getRecTop10(){
        axios.all([
            getDjRecProgram(0,10),
            getDjTopProgram(0,10)
        ])
            .then(axios.spread((rseRec,resTop)=>{
                //console.log(rseRec.data.programs,resTop.data)
                this.setState({
                    recDatas:rseRec.data.programs,
                    rankDatas:resTop.data.toplist
                });
            }))
            .catch(error=>{console.log('获取推荐列表失败',error);});
    }
    render(){
        let categories=this.state.categories;
        let typeListEle = categories.map((item,index)=>{
            return <RadioType key={index} datas={item} />;
        });
        return(
            <div id="djradio" className="djradio g_main">
                <div className="dj_wrap g_wrap">
                    <RadioNav navData1={this.state.navData1} navData2={this.state.navData2} />
                    <div className="clearfix">
                        <RadioTop datas={this.state.rankDatas} playDjTopProgram={this.playDjTopProgram}  />
                        <RadioRec datas={this.state.recDatas} playDjRecProgram={this.playDjRecProgram}/>
                    </div>
                    {
                        typeListEle
                    }
                    {/* <RadioType /> */}
                </div>
            </div>
        );
    }
}

function matchStateToProps(state){
    return {
        playlist:state.playlist,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(DJradio);
