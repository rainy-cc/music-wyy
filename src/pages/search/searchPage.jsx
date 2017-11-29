/**
 * 搜索页面
 */

import React from 'react';
import {Link} from 'react-router';

import { getSearchSuggest, getSearch } from '../../axios/search.js'
import '../../static/css/search.css';

import SearchSuggestList from '../../components/searchList/suggestList';

import SchSong from './sub/song';
import SchSingger from './sub/singer';
import SchAlbum from './sub/album';
import SchPlaylist from './sub/playlist';
import SchUser from './sub/user';
import SchRadio from './sub/djradio';
import SchLyric from './sub/lyric';
import SchMV from './sub/mv';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';



class SearchPage extends React.Component {

    constructor(){
        super();
        this.state = {
            keywords: '',
            type:1,//搜索类型
            searchSuggest:null, //存放搜索关键词的数据
            isSchListShow: false,
            resultData: null,
        };
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount(){
        let type = Number(this.props.location.query.type) || 1 //拿到type值，默认为1
        let keywords=this.props.location.query.s || '';
        this.setState({
            type: type,
            keywords: keywords
        });
        this.getSearchData(keywords,type);
    }

    componentWillReceiveProps(nextProps){
        let nextType = Number(nextProps.location.query.type);  //拿到新type值，默认为1
        let nextKeywords=nextProps.location.query.s;
        this.setState({
            type: nextType,
            resultData:null,
            keywords:nextKeywords
        });
        this.getSearchData(nextKeywords,nextType);
    }
    //分页搜索
    pageChange(currentpage,pageSize){
        let type = Number(this.props.location.query.type) || 1 //拿到type值，默认为1
        let keywords=this.props.location.query.s || '';
        // this.setState({
        //     resultData:null,
        // });
        this.getSearchData(keywords,type,currentpage);
    }

    changeKeywords(ev){
        this.setState({
            keywords: ev.target.value,
        });
    }
    //点击搜索按钮或者按下enter开始搜索
    clickSearch(ev){
        let keywords = this.state.keywords;
        if(keywords!=''){
                this.props.history.push(`/search?s=${keywords}&type=1`);
        }
        ev.preventDefault();
    }
    startSearch(ev){
        let keywords = ev.target.value;
        //如果文本框没有字，则需隐藏搜索建议列表
        if(keywords==''){
            this.setState({
                isSchListShow: false,
                searchSuggest:null, //存放搜索关键词的数据
            });
            //alert('请输入你感兴趣的主题');
            return;
        }
        //按下enter
        if(ev.keyCode == 13){
            this.props.history.push(`/search?s=${keywords}&type=1`);
            this.setState({
                isSchListShow: false
            });
        }
        else{
            this.setState({
                isSchListShow: true
            });
            this.getSearchSuggestData(keywords);
        }

        //this.getSearchSuggestData(keywords);
    }
    //获得焦点  显示建议列表
    getFocus(){
        this.setState({
            isSchListShow: true
        });
    }
    //失去焦点影藏搜索列表
    lostFocus(){
        setTimeout(()=>{
            this.setState({
                isSchListShow: false
            });
        },250);
    }
    //获取搜索建议，根据传入的type值
    getSearchData(keywords,type,offset=1){
        getSearch(keywords,type,offset)
            .then(res=>{
                //console.log(res.data);
                if(res.data.code ==200){
                    //console.log(res.data.result);
                    this.setState({
                        resultData: res.data.result
                    });
                }

            });
    }
    //获取搜索建议的数据
    getSearchSuggestData(keywords){
        getSearchSuggest(keywords)
            .then(res=>{
                if(res.data.code == 200){
                    const newResult = Object.assign({},res.data.result);
                    this.setState({
                        searchSuggest: newResult
                    });
                }
            })
            .catch(error=>{
                //throw new Error('获取搜索建议失败',error);
                console.log(error);
            });
    }

    render(){
        const {isSchListShow,searchSuggest,keywords,type,resultData} = this.state;
        let element = null; //渲染哪一个面板
        let total; //搜索结果的总数
        if(resultData){
            total = resultData.songCount || resultData.artistCount|| resultData.albumCount|| resultData.mvCount|| resultData.playlistCount|| resultData.djRadiosCount|| resultData.userprofileCount
        }
        switch(type){
            case 1:
                element = <SchSong data={resultData}/>;
                break;
            case 100:
                element = <SchSingger data={resultData}/>;
                break;
            case 10:
                element = <SchAlbum data={resultData}/>;
                break;
            case 1004:
                element = <SchMV data={resultData}/>;
                break;
            case 1006:
                element = <SchLyric data={resultData}/>;
                break;
            case 1000:
                element = <SchPlaylist data={resultData}/>;
                break;
            case 1009:
                element = <SchRadio data={resultData}/>;
                break;
            case 1002:
                element = <SchUser data={resultData}/>;
                break;
            default:
        }
    return(
            <div id="search" className="search g_main">
                <div className="g_wrap">
                    <div className="sch_box">
                        <input
                            onFocus={this.getFocus.bind(this)}
                            onBlur={this.lostFocus.bind(this)}
                            onKeyUp={this.startSearch.bind(this)}
                            onChange={this.changeKeywords.bind(this)}
                            value={this.state.keywords}
                            type="text" />
                        <a onClick={this.clickSearch.bind(this)} className="sch_btn" title="搜索" href="javascript:;"></a>
                        {
                            isSchListShow?<SearchSuggestList keywords={keywords}  searchSuggest={searchSuggest} />:null
                        }

                    </div>
                    <div className="sch_info">
                        搜索“<span>{this.state.keywords}</span>”，找到&nbsp;<em>{total}</em>&nbsp;首单曲
                    </div>
                    <SchTab keywords={keywords} type={type} />
                    <div className="sch_result">

                        {
                            resultData
                            ?element
                            :<Loading size="small"/>
                        }
                        {
                            total>30
                            ?<Pagination onChange={this.pageChange} pageSize={30} total={total} />
                            :null
                        }

                    </div>
                </div>
            </div>
        );
    }
}


function SchTab(props){
    return(
        <ul className="sch_tab">
                <li>
                    <Link className={props.type==1?'active':''} to={`/search?s=${props.keywords}&type=1`}><span>单曲</span></Link>
                </li>
                <li>
                    <Link className={props.type==100?'active':''} to={`/search?s=${props.keywords}&type=100`}><span>歌手</span></Link>
                </li>
                <li>
                    <Link className={props.type==10?'active':''} to={`/search?s=${props.keywords}&type=10`}><span>专辑</span></Link>
                </li>
                <li>
                    <Link className={props.type==1004?'active':''}  to={`/search?s=${props.keywords}&type=1004`}><span>MV</span></Link>
                </li>
                <li>
                    <Link className={props.type==1006?'active':''} to={`/search?s=${props.keywords}&type=1006`}><span>歌词</span></Link>
                </li>
                <li>
                    <Link className={props.type==1000?'active':''} to={`/search?s=${props.keywords}&type=1000`}><span>歌单</span></Link>
                </li>
                <li>
                    <Link className={props.type==1009?'active':''} to={`/search?s=${props.keywords}&type=1009`}><span>主播电台</span></Link>
                </li>
                <li>
                    <Link className={props.type==1002?'active':''}  to={`/search?s=${props.keywords}&type=1002`}><span>用户</span></Link>
                </li>
        </ul>
    );
}


export default SearchPage;
