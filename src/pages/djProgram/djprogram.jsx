/**
 * 电台节目页面
 *      @router /program?id=
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import {getDJProgram,getMoreDJPrograms} from '../../axios/djradio.js';
import {getDJProgramComment} from '../../axios/comment.js';
import SideAd from '../../components/sideAd';
import MutilDownload from '../../components/download/mutilDownload';
import Loading from '../../components/loading';
import ProgramInfo from '../../components/djprogram/programInfo';
import MoreProgram from '../../components/djprogram/moreProgram';
import Pagination from '../../components/pagination';
import Comment from '../../components/comment/comment';

import '../../static/css/djprogram.css';
class DJProgramPage extends React.Component {

    constructor(){
        super();
        this.state={
            programData: null,//节目信息
            morePrograms: [],
            commentData:null, //节目评论
            total:0
        };
        this.pageChange = this.pageChange.bind(this);
        this.addAndPlayProgram = this.addAndPlayProgram.bind(this);
        this.addAndPlaySong = this.addAndPlaySong.bind(this);
        this.addToList = this.addToList.bind(this);

    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getProgramData(id);
        this.getComment(id)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location == nextProps.location){
            return false;
        }
        this.setState({
            programData: null,
            morePrograms: [],
        });
        let id = nextProps.location.query.id;
        this.getProgramData(id);
        this.getComment(id);
    }
    //将电台节目添加到播放列表并且播放
    addAndPlayProgram(){
        let program = this.state.programData;
        this.props.actions.playItem(program);
    }
    addAndPlaySong(song){
        this.props.actions.playItem(song);
    }
    //添加到列表不播放
    addToList(song){
        let curPlaylist = this.props.playlist;
        let isExist = curPlaylist.map(item =>item.id).indexOf(song.id) == -1;
        if(isExist){//不存在
            this.props.actions.addSong(song);
        }else {
            console.log("播放列表已存在");
            return;
        }
    }

    //获取电台节目信息数据 并根据得到的数据的rid得到推荐节目
    getProgramData(id){
        getDJProgram(id)
            .then(res=>{
                if(res.data.code == 200){
                    this.setState({
                        programData: res.data.program,

                    });
                }
                let rid = res.data.program.radio.id;
                return getMoreDJPrograms(rid); //获取更多节目数据
            })
            .then(res=>{
                //console.log( res.data.programs);
                if(res.data.code == 200){
                    this.setState({
                        morePrograms: res.data.programs.filter(item=>(item.id != id)),
                    });
                }
            })
            .catch(error=>{
                console.log(error);
            });
    }

    //页码改变
    pageChange(currentPage,pageSize){
        let id=this.props.location.query.id;
        this.getComment(id,currentPage);
    }
    //获取该节目评论
    getComment(id,page,limit=20){
        getDJProgramComment(id,page,limit)
            .then(res=>{
                if(res.data.code == 200){
                    this.setState({
                        commentData:res.data,
                        total:res.data.total
                    });
                }

            })
            .catch(error=>{
                console.log('获取节目评论失败',error);
            });
    }
    render(){
        let {programData ,morePrograms, commentData, total} = this.state;
        if(!programData){
            return <div id="djprogram" className="djprogram g_main clearfix" style={{paddingTop:'150px'}}><Loading /></div>
        }
        return(
            <div id="djprogram" className="djprogram g_main g_mainbg clearfix">
                <div className="pro_ctx fl">
                    <div className="pro_ctx_wrap">
                        <ProgramInfo
                            addAndPlayProgram={this.addAndPlayProgram} addAndPlaySong={this.addAndPlaySong}
                            addToList={this.addToList}
                            program={programData}
                            curMusic={this.props.currentMusic}
                         />
                        {
                            !commentData
                            ?<div style={{padding:'150px 0'}}><Loading size="small" /></div>
                            :(
                                <div>
                                    <Comment commentData= {commentData}/>
                                    {
                                        /*数据不超过一页不显示分页条*/
                                        total>20?<Pagination total = {total} onChange={this.pageChange} pageSize={20}  />:null
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="g_side fr">
                    <div className="g_sidewrap">
                        <SideAd />
                        <MoreProgram data={morePrograms} />
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

export default connect(matchStateToProps,mapDispatchToProps)(DJProgramPage);
