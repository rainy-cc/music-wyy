/*
    电台详情页面
    @router /djradio?id=335965054
*/

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';
import {getDJDatail, getMoreDJPrograms,getDjOthers} from '../../axios/djradio';
import DjradioInfo from '../../components/djradio/djInfo';
import DjradioTable from '../../components/djradio/djTable';
import MaybeLike from '../../components/djradio/mayLike';
import SideAd from '../../components/sideAd';
import MutilDownload from '../../components/download/mutilDownload';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';

import '../../static/css/djradioPage.css';

class DJradioDetailPage extends React.Component {

    constructor(){
        super();
        this.state = {
            drInfoData:null, //电台信息
            program: [], //电台节目列表,
            othersLike:[],
            currentPage: 1,
            total: 0
        };
        this.pageChange=this.pageChange.bind(this);
        this.addAndPlay = this.addAndPlay.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.playAll = this.playAll.bind(this);
    }
    componentDidMount(){
        const id = this.props.location.query.id;
        this.getDjData(id);
        this.getProgramsData(id,1,100);
    }
    componentDidUpdate(prevProps){
        const id = prevProps.location.query.id;
        console.log(id);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return;
        }
        const id = nextProps.location.query.id;
        this.setState({
            drInfoData:null, //电台信息
            program: [], //电台节目列表,
            othersLike:[],
        });
        this.getDjData(id);
        this.getProgramsData(id,1,100);
    }
    //播放全部电台节目
    playAll(){
        const id = this.props.location.query.id;
        // axios.get('/dj/program',{
        //     params:{
        //         rid: id,
        //         limit: 999,
        //         offset:0
        //     }
        // })
        getMoreDJPrograms(id,1,999)
        .then(res=>{
            if(res.data.code ==200){
                let program = res.data.programs;
                if(program.length){
                    let list = program.map(item=>{
                        return item;
                    });
                    this.props.actions.changePlaylist(list);
                    this.props.actions.changeMusicAsync(list[0].mainSong.id,0);//播放该歌单的第一首歌
                }
            }
        })
    }

    //添加到列表并且播放
    addAndPlay(program){
        //看看当前播放列表是否存在
        //let curPlaylist = this.props.playlist;
        this.props.actions.playItem(program);
    }
    //添加到列表不播放
    addToPlaylist(program){
        let curPlaylist = this.props.playlist;
        let isExist = curPlaylist.map(item =>item.id).indexOf(program.id) == -1;
        if(isExist){//不存在
            this.props.actions.addSong(program);
        }else {
            console.log("播放列表已存在");
            return;
        }
    }
    //页码改变
    pageChange(currentPage,pageSize){
        const id = this.props.location.query.id;
        this.setState({
            currentPage:currentPage,
            program:[]
        });
        this.getProgramsData(id,currentPage,100);
        window.scrollTo(0,0);
    }
    //根据页面的id获取用户信息数据
    getDjData(id){
        getDJDatail(id)
        .then(res=>{
            if(res.data.code == 200){
                this.setState({
                    drInfoData: res.data.djRadio,
                    total:res.data.djRadio.programCount
                });
            }
            return this.getOthers(res.data.djRadio.categoryId);
        })
        .then(res=>{
            //console.log(res.data);
            if(res.data.code == 200){
                this.setState({
                    othersLike: res.data.djRadios.slice(0,5) //返回10条数据取出5条
                });
            }
        })
        .catch(error=>{
            console.log('请求电台信息出错',error);
        });
    }

    //获取节目列表
    getProgramsData(id,offset=1,limit=100){
        getMoreDJPrograms(id,offset,limit)
        .then(res=>{
            //console.log(res.data.programs);
            if(res.data.code == 200){
                this.setState({
                    program: res.data.programs
                });
            }
        })
        .catch(error=>{
            console.log('请求节目列表出错',error);
        });
    }

    //获取可能喜欢的其他人
    getOthers(categoryId){
        return getDjOthers(categoryId);
    }

    render(){
        const {drInfoData,program,othersLike,currentPage,total} = this.state
        if(!drInfoData || !othersLike.length){
            return(
                <div id="djradio_detail" className="djradio_detail g_main" style={{paddingTop:'150px'}}>
                    <Loading />
                </div>
            )
        }
        return(
            <div id="djradio_detail" className="djradio_detail g_main clearfix">
                <div className="dr_ctx fl">
                    <div className="dr_ctxwrap">
                        <DjradioInfo playAll={this.playAll} data={drInfoData} />
                        <DjradioTable addAndPlay={this.addAndPlay} addToPlaylist={this.addToPlaylist} curMusic={this.props.currentMusic} currentPage={currentPage} count={drInfoData.programCount} program={program} />
                        {
                            program.length && total>100?<Pagination currentPage={currentPage} onChange={this.pageChange} total={drInfoData.programCount} pageSize={100} />:null
                        }

                    </div>
                </div>
                <div className="dr_side g_side fr">
                    <div className="g_sidewrap">
                        <SideAd />
                        <MaybeLike data = {othersLike} />
                        <MutilDownload />
                    </div>
                </div>
            </div>
        );
    }
}

function matchStateToProps(state){
    return {
        playlist:state.playlist,
        currentMusic:state.currentMusic
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(DJradioDetailPage);
