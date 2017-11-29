/*
    歌单列表页  /discover/playlist
*/

import React from 'react';
import { getPlaylistInfo , getPlaylist } from '../../../axios/playlist.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';

import PlayListHeader from './subpage/playListHd';
import PlayListContent from './subpage/playListContent';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

import '../../../static/css/playlist.css';

class PlayList extends React.Component {
    constructor(){
        super();
        this.state = {
            order:'hot' ,//热门和最新  hot/new  默认hot
            listDatas: null,
            category: '全部', //种类
            total:0, //歌单数据总数
            currentPage:1
        };
        this.isFetch = true;
        this.pageChange = this.pageChange.bind(this);
        this.changeOrder=this.changeOrder.bind(this);
        this.changeCategory=this.changeCategory.bind(this);
        this.changeList=this.changeList.bind(this);
    }
    //切换歌单
    changeList(id){
        getPlaylistInfo(id)
            .then(res=>{
                if(res.data.code == 200){
                    let playlist = res.data.playlist;
                    //如果歌单歌曲列表为空
                    if(!playlist.tracks.length){
                        return;
                    }else {
                        let newTracks = playlist.tracks.map(item=>{
                            return item;
                        });
                        this.props.actions.changePlaylist(newTracks);
                        this.props.actions.changeMusicAsync(newTracks[0].id,0);//播放该歌单的第一首歌
                    }
                }
            })
            .catch(error=>{
                console.log('获取失败',error);
            });
    }
    componentDidMount(){
        //获取GET参数
        let category = this.props.location.query.cat || '全部',
            order = this.props.location.query.order || 'hot',
            offset = this.props.location.query.offset || 0;

        this.setState({
            order:order,
            category: category,
            currentPage: offset/35+1
        });

        this.getData(category,order);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return false;
        }
        window.scrollTo(0,0);
        let category = nextProps.location.query.cat || '全部',
            order = nextProps.location.query.order || 'hot',
            offset = nextProps.location.query.offset || 0;
        this.setState({
            listDatas: null,
            currentPage: offset/35+1
        });
        this.getData(category,order,offset);
    }
    componentWillUnmount(){
        this.isFetch = false;
    }

    //页码改变
    pageChange(currentPage,pageSize){
        let order = this.state.order,
            category = encodeURIComponent(this.state.category);
        this.props.history.push(`/discover/playlist?order=${order}&cat=${category}&limit=${35}&offset=${(currentPage-1)*35}`);

    }
    //hot  还是  new
    changeOrder(newOrder){
        this.setState({
            order:newOrder,
        });
    }
    //改变查询的类型
    changeCategory(newCategory){
        this.setState({
            category:newCategory
        });
    }
    //获取歌单列表信息
    getData(category,order,offset=0,limit=35){
        getPlaylist(category,order,offset,limit=35)
        .then(res=>{
            if(this.isFetch&& res.data.code == 200){
                this.setState({
                    listDatas: res.data.playlists,
                    total: res.data.total
                });
            }
        });
    }
    render(){
        let {category,order,listDatas,total,currentPage} = this.state;
        return(
            <div id="playlist" className="playlist g_main">
                <div className="pl_wrap g_wrap">
                    <PlayListHeader category={category} order={order} changeOrder={this.changeOrder} changeCategory={this.changeCategory}/>
                    {

                        this.state.listDatas?(
                            <div>
                                <PlayListContent changeList={this.changeList} datas={listDatas} />
                                {
                                    total>35?<Pagination currentPage={currentPage} onChange={this.pageChange} total={total} pageSize={35} />:null
                                }

                            </div>
                        ):<div style={{paddingTop: '150px'}}><Loading /></div>
                    }
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

export default connect(matchStateToProps,mapDispatchToProps)(PlayList);
