/**
 * 歌手页面专辑面板 AlbumPanel
 *      所有专辑
 *      @router： /artist/album?id=10559
 *
 */
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions/actions';
import { getSingerAlbum } from '../../../axios/singer';
import {getAlbumInfo} from '../../../axios/album.js';
import { format } from '../../../utils/dateFormat';
import Pagination from '../../../components/pagination';
import Loading from '../../../components/loading';

class AlbumPanel extends React.Component {

    constructor(){
        super();
        this.state = {
            albumData: null, //数据
            total: 0, //数据总数
            currentPage: 1 //当前页
        };
        this.pageChange = this.pageChange.bind(this);
        this.changePlaylist = this.changePlaylist.bind(this);
    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getAlbumData(id);  //第一次发起ajax请求
    }
    //切换播放列表
    changePlaylist(id){
        getAlbumInfo(id)
            .then(res=>{
                if(res.data.code == 200){
                    if(res.data.album.status < -1){
                        alert('该歌曲需要付费');
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
    //分页切换
    pageChange(currentPage,pageSize){
        let id = this.props.location.query.id;
        let page = currentPage -1 ;
        this.setState({
            albumData: null,
            currentPage:currentPage
        });
        this.getAlbumData(id,page);
    }
    //获取该歌手专辑数据，传入歌手id
    getAlbumData(id,page){
        getSingerAlbum(id,page)
            .then(res=>{
                //console.log(res.data);
                if(res.data.code == 200){
                    this.setState({
                        albumData:res.data.hotAlbums,
                        total:res.data.artist.albumSize
                    });
                }
                window.scrollTo(0,0);
            });
    }
    render(){
        let {total,albumData,currentPage} = this.state;
        if(!this.state.albumData){
            return(
                <div>
                    <Loading size="small" />
                </div>
            );
        }
        return(
            <div>
                {
                    albumData.length?
                    <ul className="album_list clearfix">
                        {
                            albumData.map(item=>{
                                return(
                                    <li key={item.id}>
                                        <div className="imgwrap">
                                            <Link to={`/album?id=${item.id}`} className="mask"></Link>
                                            <img src={item.picUrl+'?param=120y120'} />
                                            <i onClick={ev=>{this.changePlaylist(item.id)}} className="icon_play"></i>
                                        </div>
                                        <p className="name overhide">
                                            <Link to={`/album?id=${item.id}`} title={item.name}>{item.name}</Link>
                                        </p>
                                        <p className="time">{format(item.publishTime,'yyyy.M.d')}</p>
                                    </li>
                                );
                            })
                        }

                    </ul>:
                    <div style={{paddingTop:'20px',textAlign:'center',fontSize: '20px'}}>抱歉，暂无专辑</div>
                }

                {
                    total>12?
                    <div style={{paddingTop: '20px'}}>
                        <Pagination currentPage={currentPage} onChange={this.pageChange} total={total} pageSize={12} />
                    </div>:
                    null
                }
            </div>
        );
    }
}

function matchStateToProps(state){
    return {
        playlist:state.playlist
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(AlbumPanel);
