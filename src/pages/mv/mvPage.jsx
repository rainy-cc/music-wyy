/**
 * 网易云 Mv播放页面
 * router： /mv?id=
 * contains：
 */

import React from 'react';
import {Link} from 'react-router';
import {getMvDetail,getSimilarMv} from '../../axios/mv.js';
import {getMvComment} from '../../axios/comment.js';
import MvPlayer from '../../components/mv/mvPlayer';
import MvBriefDesc from '../../components/mv/mvDesc';
import MvRelative from '../../components/mv/mvRelative';

import MutilDownload from '../../components/download/mutilDownload';
import Comment from '../../components/comment/comment';
import Pagination from '../../components/pagination';
import Loading from '../../components/loading';

import '../../static/css/mvpage.css';

class MvPage extends React.Component {

    constructor(){
        super();
        this.state={
            mvData:null,
            simiMV:[],
            commentData:null,
            total: 0
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount(){
        let id=this.props.location.query.id;
        this.getMvData(id);
        this.getSimiMvData(id);
        this.getCommentData(id);
    }

    componentWillReceiveProps(nextProps){
        let id = this.props.location.query.id;
        let nextId = nextProps.location.query.id;
        if(id == nextId){
            return false;
        }
        this.setState({
            mvData:null,
            simiMV:[],
        });
        this.getMvData(nextId);
        this.getSimiMvData(nextId);
        this.getCommentData(nextId);
    }

    //获取mv数据
    getMvData(id){
        getMvDetail(id)
            .then(res=>{
                if(res.data.code == 200){
                    //console.log(res.data);
                    this.setState({
                        mvData: res.data
                    });
                }
            })
            .catch(error=>{
                console.log('获取mv数据失败',error);
            });
    }

    //获取相关mv数据
    getSimiMvData(id){
        getSimilarMv(id)
            .then(res=>{
                if(res.data.code == 200){
                    this.setState({
                        simiMV: res.data.mvs
                    });
                }

            })
            .catch(error=>{
                console.log('获取相似mv数据失败',error);
            });
    }

    //获取歌单评论，每次取20条
    getCommentData(id,page,offset=20){
        getMvComment(id,page,offset)
            .then(res=>{
                if(res.data.code == 200){
                    //console.log(res.data);
                    this.setState({
                        commentData: res.data,
                        total:res.data.total
                    });
                }
            })
            .catch(error=>{
                console.log('获取MV评论失败',error);
            });
    }
    //MV评论分页
    pageChange(currentPage,pageSize){
        let id=this.props.location.query.id;
        this.getCommentData(id,currentPage);
    }

    render(){
        let { mvData, simiMV } = this.state;
        if(!mvData){
            return(
                <div id="mvpage" className="mv g_main">
                    <div style={{padding:'150px 0'}}>
                        <Loading />
                    </div>
                </div>
            );
        }
        return(
            <div id="mvpage" className="mv g_main g_mainbg clearfix">
                <div className="mv_main fl">
                    <div className="mv_mainwrap">
                        <MvPlayer mvData={mvData} />
                        {
                            !this.state.commentData?
                            <div style={{padding:'150px 0'}}><Loading size="small" /></div>:
                            (
                                <div>
                                    <Comment commentData= {this.state.commentData}/>
                                    {
                                        /*数据不超过一页不显示分页条*/
                                        this.state.total>20?<Pagination total = {this.state.total} onChange={this.pageChange} pageSize={20}  />:null
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="mv_side fr">
                    <div className="mv_sidewrap">
                        <MvBriefDesc mvData={mvData} />
                        <MvRelative data={simiMV}/>
                        <MutilDownload />
                        <MusicOffcialAccounts />
                    </div>
                </div>

            </div>
        );
    }
}





function MusicOffcialAccounts(){
    return(
        <div className="code">
            <h5 className="cm_title_h5">网易云音乐公众账号</h5>
            <div className="clearfix">
                <span className="fl qrcode "></span>
                <div className="text fl">
                    关注我，我们才能<br/>真正拥有彼此啊
                </div>
            </div>
        </div>
    )
}
export default MvPage;
