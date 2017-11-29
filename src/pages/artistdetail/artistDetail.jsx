/*
    这是歌手详情页面
    @router: /artist?id=
*/

import React from 'react';
import axios from 'axios';
import { changeDuration } from '../../utils/dateFormat';
import {Link,IndexLink} from 'react-router';
import { getSingersMv , getSingerIntro ,getSingerSongs} from '../../axios/singer';
import SideAd from '../../components/sideAd';
import MutilDownload from '../../components/download/mutilDownload';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';

import '../../static/css/artistDetail.css';


class ArtistDetail extends React.Component {

    constructor(){
        super();
        this.state={
            id:0,//歌手id
            infoData: null, //歌手信息
            hotSongs: null,//top50
        };
    }
    componentDidMount(){
        let id = this.props.location.query.id;
        this.setState({
            id: id
        });
        this.getTopsongsData(id);
    }
    componentWillReceiveProps(nextProps){
        let id = this.props.location.query.id;
        let nextId = nextProps.location.query.id;
        if(id == nextId){
            return;
        }
        this.setState({
            id: nextId,
            infoData: null,
            hotSongs: null
        });
        this.getTopsongsData(nextId);
    }

    getTopsongsData(id){
        getSingerSongs(id)
            .then(res=>{
                //console.log(res.data.hotSongs);
                if(res.data.code ==200){
                    this.setState({
                        infoData: res.data.artist, //歌手信息
                        hotSongs: res.data.hotSongs
                    });
                }

            });
    }


    render(){
        let {infoData , hotSongs} = this.state;
        if(!infoData){
            return(
                <div id="artist_detail" className="artist_detail g_main">
                    <div style={{paddingTop:'150px'}}>
                        <Loading />
                    </div>
                </div>
            );
        }
        return(
            <div id="artist_detail" className="artist_detail g_main clearfix">
                <div className="art_ctx fl">
                    <div className="art_ctxwrap">
                        <div className="info">
                            <h2><span className="name fl">{infoData.name}</span>{infoData.alias.length?<span className="s_name">{infoData.alias.join(' ')}</span>:null}</h2>
                            <div className="avatar_bg">
                                <img src={`${infoData.picUrl}?param=640y300`} alt="img" />
                                <span className="mask"></span>
                                <a className="home" href="javascript:;"></a>
                                <a className="value" href="javascript:;"></a>
                            </div>
                        </div>
                        <ArtdTabs id={this.state.id} />
                        {/* <ArtdTopSongs50 hotSongs={hotSongs} /> */}
                        {/* {this.state.mvData?<MvPanel total={this.state.mvTotal} mvData={this.state.mvData}/>:<Loading />} */}
                        {/* <SingerIntroPanel introData={this.state.introData} /> */}
                        {/* <AlbumPanel /> */}
                        {
                            this.props.children
                        }
                    </div>
                </div>
                <div className="albd_side g_side fr">
                    <div className="g_sidewrap">
                        <SideAd />
                        <MutilDownload />
                    </div>
                </div>
            </div>
        );
    }
}

function ArtdTabs(props){
    return(
        <ul className="tab">
            <li>
                <IndexLink activeClassName="active" to={`/artist?id=${props.id}`}><span>热门50单曲</span></IndexLink>
            </li>
            <li>
                <Link activeClassName="active" to={`/artist/album?id=${props.id}`}><span>所有专辑</span></Link>
            </li>
            <li>
                <Link activeClassName="active" to={`/artist/mvs?id=${props.id}`}><span>相关MV</span></Link>
            </li>
            <li>
                <Link activeClassName="active" to={`/artist/desc?id=${props.id}`}><span>歌手介绍</span></Link>
            </li>
        </ul>
    );
}
//热门歌手6
function HotArtists6(){
        return(
            <ul>
                <li></li>
            </ul>
        );
}
//歌曲排行前50
function ArtdTopSongs50(props){
    return(
        <div className="song_tb ">
            <div className="btns_group clearfix" style={{marginBottom: '10px'}}>
                <a className="btn-1" href="javascript:;"><span><i className="play"></i>播放</span></a>
                <a className="btn-2 plus" href="javascript:;"></a>
                <a className="btn-public btn-3" href="javascript:;"><span>收藏热门50</span></a>
            </div>
            <div className="stb_wrap">
                <table className="sl_table artd_table" style={{border:'none'}}>
                    <tbody>
                        {
                            props.hotSongs.map((item,index)=>{
                                return(
                                    <tr key={item.id} className={index%2==0?'even':''}>
                                                     <td className="column1">
                                                        <div className="hd">
                                                            <span className="num">{index+1}</span>
                                                             <i className="icon_play"></i>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            <a href="#">{item.name}</a>
                                                            {item.mv?<span className="mv_btn" title="播放mv"></span>:null}

                                                        </div>
                                                     </td>
                                                    <td className="column3">
                                                     <div>
                                                            <span className="time">{changeDuration(item.dt)}</span>
                                                         <div className="t_btns clearfix">
                                                                <a className="t_btn add" href="javascript:;"></a>
                                                                 <a className="t_btn value" href="javascript:;"></a>
                                                                <a className="t_btn share" href="javascript:;"></a>
                                                                 <a className="t_btn download" href="javascript:;"></a>
                                                             </div>
                                                         </div>
                                                     </td>
                                                     <td className="column4">
                                                         <div className="overhide">
                                                             <a href="#">{item.al.name}</a>
                                                         </div>
                                                     </td>
                                                     <td className="column5">
                                                         <div className="progress">
                                                             <span style={{width: 100*item.pop/100 + '%'}}></span>
                                                         </div>
                                                     </td>
                                                </tr>
                                )
                            })
                        }
                        {/* <tr className="even">
                                         <td className="column1">
                                            <div className="hd">
                                                <span className="num">{1}</span>
                                                 <i className="icon_play"></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                            <a href="#">{123}</a></div>
                                         </td>
                                        <td className="column3">
                                         <div>
                                                <span className="time">{1023}</span>
                                             <div className="t_btns clearfix">
                                                    <a className="t_btn add" href="javascript:;"></a>
                                                     <a className="t_btn value" href="javascript:;"></a>
                                                    <a className="t_btn share" href="javascript:;"></a>
                                                     <a className="t_btn download" href="javascript:;"></a>
                                                 </div>
                                             </div>
                                         </td>
                                         <td className="column4">
                                             <div>
                                                 <a href="#">{'vivian'}</a>
                                             </div>
                                         </td>
                                         <td className="column5">
                                             <div>
                                                 <a href="#">{'vivian'}</a>
                                             </div>
                                         </td>
                                    </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
//所有专辑
class AlbumPanel extends React.Component {

    constructor(){
        super();
        this.state = {
            albumData: null,
            total: 0
        };
    }

    componentDidMount(){

    }
    getAlbumData(){

    }
    render(){
        return(
            <ul className="album_list">
                <li>
                    <div className="imgwrap">
                        <a href="#" className="mask"></a>
                        <img src="http://p3.music.126.net/9JOVl48dMe7U8zShniMPcA==/1372190515036862.jpg?param=120y120" />
                        <i className="icon_play"></i>
                    </div>
                    <p className="name">
                        <a href="#">周杰伦的床边故事</a>
                    </p>
                    <p className="time">2016.6.24</p>
                </li>
            </ul>
        )
    }
}
//相关mv
class MvPanel extends React.Component {
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <ul className="mvlist clearfix">
                    {
                        this.props.mvData.map(item=>{
                            return(
                                <li key={item.id}>
                                    <div>
                                        <Link className="bg"  to={`/mv?id=${item.id}`}>
                                            <img src={item.imgurl}/>
                                            <i className="icon icon_play"></i>
                                        </Link>
                                    </div>
                                    <p className="mvname overhide">
                                        <Link to={`/mv?id=${item.id}`}>{item.name}</Link>
                                    </p>
                                </li>
                            );
                        })
                    }

                </ul>
                <Pagination total={this.props.total} pageSize={12} />
            </div>

        );
    }
}

//歌手介绍
function SingerIntroPanel(props){
    if(!props.introData){
        return(
            <div>
                暂无介绍
            </div>
        )
    }
    return(
        <div className="intro">
            <h2 style={{borderLeft: '3px solid #c10d0c',paddingLeft:'6px'}}>周杰伦简介</h2>
            <p className="indent">{props.introData.briefDesc}</p>
            {
                props.introData.introduction.map((item,index)=>{
                    return(
                        <div key={index}>
    						<h2>{item.ti}</h2>
    						<p
    						dangerouslySetInnerHTML={{__html:item.txt.replace(/\n/g,'<br />')}}
    						></p>
    					</div>
                    );
                })
            }
        </div>
    );
}
export default ArtistDetail;
