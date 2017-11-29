/*
    电台分类  catergory
    @router /discover/category? id=....
*/

import React from 'react';
import axios from 'axios';


import RadioNav from './subpage/radioNav';
import NewRadioPart from '../../../components/discover/djradio/newRadio';
import AllRadioPart from '../../../components/discover/djradio/allRadio';


class DJCategoryPage extends React.Component {

    constructor(){
        super();
        this.state = {
            nowId:10001, //当前页面的类别id
            navData1:null,//导航数据第一页
            navData2:null,//导航数据第2页,
            newRadiosData:[],
            allRadiosData:[],
            pageSize: 30,
            total:0,
        };
        this.pageChange = this.pageChange.bind(this);
    }
    //初始化请求数据
    componentDidMount(){
        const id = this.props.location.query.id;//拿到id
        this.setState({
            nowId:id,
        });
        this.getNavData();
        this.getNewRadiosData(id,5);
        this.getAllRadiosData(id,1,30,1);
    }
    //props改变重新发起请求
    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return;
        }
        const id = nextProps.location.query.id;//拿到id
        //为了显示Loading状态，先把数据清空
        this.setState({
            nowId:id,
            newRadiosData:[],
            allRadiosData:[],
        });
        this.getNavData();
        this.getNewRadiosData(id,5);
        this.getAllRadiosData(id,1,30,1);
    }
    //页码改变的时候加载
    pageChange(currentPage,pageSize){

        const id = this.props.location.query.id;
        this.setState({
            allRadiosData:[],
        });
        this.getAllRadiosData(id,currentPage,30,1);
    }

    /*获取全部的数据，每次取30条
        @param {number}  id  获取的类型id(必选)
        @param {number}  offset  分页用
        @param {number}  limit  每次去除的数据条数
        @param {number}  order  0:最热电台  1 上升最快
    */
    getAllRadiosData(id,offset=1,limit=30,order=1){
        axios.get('/dj/hot',{
            params: {
                cat: id,
                offset:(offset-1)*limit,
                limit: limit,
                order: order
            }
        })
        .then(res =>{
            console.log(res.data);
            this.setState({
                allRadiosData: res.data.djRadios,
                total: res.data.count
            });
        });
    }

    //获取优秀新电台的五条数据
    getNewRadiosData(id,limit=5){
        axios.get('/dj/recommend/type',{
            params: {
                type: id,
                offset:0,
                limit: limit
            }
        })
        .then(res =>{
            //console.log(res.data.djRadios);
            this.setState({
                newRadiosData: res.data.djRadios
            });
        });
    }

    getNavData(){
        axios.get('/dj/catelist')
        .then(response => {
            this.setState({
                navData1:response.data.categories.slice(0,18),
                navData2:response.data.categories.slice(18)
            });
        });
    }

    render(){
        const {newRadiosData,allRadiosData,pageSize, total} = this.state;
        return(
            <div id="djradio" className="djradio g_main">
                <div className="dj_wrap g_wrap">
                    <RadioNav nowId={this.state.nowId} navData1={this.state.navData1} navData2={this.state.navData2} />
                    <NewRadioPart data={newRadiosData}/>
                    <AllRadioPart data={allRadiosData} total={total} pageChange={this.pageChange} pageSize={pageSize}/>
                </div>
            </div>
        );
    }
}
export default DJCategoryPage;
