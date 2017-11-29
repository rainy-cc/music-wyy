/*
    新碟上架页面
    @router /discover/album ?page=1&area=ALL
*/
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';
import {getHotAlbums,getAllAlbums,getAlbumInfo} from '../../../axios/album.js';

import AlbumItem from '../../../components/album/albumItem';
import Loading from '../../../components/loading.jsx';
import Pagination from '../../../components/pagination';
import '../../../static/css/album.css';


class Album extends React.Component {
    constructor(){
        super();
        this.state={
            hotAlbumData: null, //热门推荐的10条数据
            allAlbumdData: null, //全部新碟,
            total: 0, //共多少调数据
            currentPage: 1
        };

        this.isFetch = true;
        this.pageChange = this.pageChange.bind(this);
        this.changePlaylist = this.changePlaylist.bind(this);
    }
    componentDidMount(){
        const page= Number(this.props.location.query.page) || 1; //组件初始话默认page为1
        const area = this.props.location.query.area || 'ALL' ;//默认area为All
        this.setState({
            currentPage: page
        });
        this.getHotAlbumData();
        this.getAllAlbumData(area,page);
    }
    componentWillUnmount(){
        this.isFetch = false;
    }

    //重新接收到新的页码 ， 改变页面路由并且重新请求数据
    componentWillReceiveProps(nextProps){

        if(this.props.location == nextProps.location){
            return false;
        }
        const page = Number(nextProps.location.query.page) || 1;//这里拿到的是字符串
        const area = nextProps.location.query.area || 'ALL' ;
        this.setState({
            allAlbumdData: null,
            currentPage: page
        });
        this.getAllAlbumData(area,page);

    }

    //切换播放列表
    changePlaylist(id){
        getAlbumInfo(id)
            .then(res=>{
                if(res.data.code == 200){
                    if(res.data.album.status < -1){
                        //alert('该歌曲需要付费');
                        this.props.actions.changeModalStatus('pay');
                    }else{
                        let songs = res.data.songs;
                        this.props.actions.changePlaylist(songs);
                        this.props.actions.changeMusicAsync(songs[0].id,0);//播放该专辑的第一首歌
                    }
                }
            })
            .catch(error=>{
                console.log('获取失败',error);
            });
    }
    //页码改变的回调
    pageChange(currentPage,pageSize){
        //console.log(currentPage);
        const area = this.props.location.query.area || 'ALL' ;
        this.props.history.push(`/discover/album?area=${area}&page=${currentPage}`);
    }
    //获取热门推荐数据
    getHotAlbumData(){
        getHotAlbums()
            .then(res=>{
                if(this.isFetch){
                    this.setState({
                        hotAlbumData: res.data.albums
                    });
                }
            })
            .catch(error=>{
                console.log('请求失败',error);
            });
    }
    //获取新碟上架数据
    getAllAlbumData(area='ALL',page=1){
        getAllAlbums(area,35,page)
            .then(res=>{
                if(this.isFetch){
                    this.setState({
                        total:res.data.total,
                        allAlbumdData: res.data.albums
                    });
                }
            })
            .catch(error=>{
                console.log('请求新碟数据失败',error);
            });
    }

    render(){
        if(!this.state.hotAlbumData){
            return(
                <div id="album" className="album g_main">
                    <div style={{paddingTop: '150px'}}><Loading /></div>
                </div>
            );
        }
        return(
            <div id="album" className="album g_main">
                <div className="album_wrap g_wrap">
                    <div className="alb_hot">
                        <div className="c_title">
                            <h3>热门新碟</h3>
                        </div>
                        <AlbumItem data={this.state.hotAlbumData.slice(0,10)}  changePlaylist={this.changePlaylist} />
                    </div>
                    <div className="al_all">
                        <div className="c_title">
                            <h3>全部新碟</h3>
                            <div className="nav">
                                <Link to="/discover/album?area=ALL">全部</Link><span>|</span>
                                <Link to="/discover/album?area=ZH">华语</Link><span>|</span>
                                <Link to="/discover/album?area=EA">欧美</Link><span>|</span>
                                <Link to="/discover/album?area=KR">韩国</Link><span>|</span>
                                <Link to="/discover/album?area=JP">日本</Link>
                            </div>
                        </div>
                        {
                            this.state.allAlbumdData?<div><AlbumItem data={this.state.allAlbumdData} changePlaylist={this.changePlaylist} />
                            <Pagination currentPage={this.state.currentPage} onChange={this.pageChange} total = {this.state.total} pageSize={35} /></div>:<Loading size
                            ="small" />
                        }
                    </div>
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

export default connect(matchStateToProps,mapDispatchToProps)(Album);
