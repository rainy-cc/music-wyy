/*
 *  头部Top组件
 */
import React from 'react';
import {connect} from 'react-redux';
import {changeModalStatus} from '../../actions/actions';
import {getSearchSuggest} from '../../axios/search';
import HeaderNav from './headerNav.jsx';
import HeaderLoginButton from './headerLogin.jsx';
import SearchSuggestList from '../searchList/suggestList';

class HeaderTop extends React.Component {
    constructor() {
        super();
        this.state = {
            keywords: '', //搜索框内容 关键字
            isLabelShow: true,
            searchSuggest:null, //存放搜索关键词的数据
            isSuggestListShow: false //是否显示下拉搜索列表
        };
    }
    login(status){
        this.props.changeModalStatus(status);
    }

    /*
        文本框  获得焦点
        失去焦点  内容不为空  则label依旧隐藏
    */
    hideLabel() {
        this.setState({isLabelShow: false});
        this.textInput.focus();
    }
    //获得焦点显示下拉搜索结果
    getFocus(){
        this.setState({
            isSuggestListShow: true
        });
    }
    //失去焦点
    lostFocus(ev) {
        //如果当前搜索框为空，显示label
        if (ev.target.value == '') {
            this.setState({
                isLabelShow: true
            });
        }
        //延时消失(否则失去焦点就无法点击链接)
        setTimeout(()=>{
            this.setState({
                isSuggestListShow: false
            });
        },250);

    }
    //改变输入文字
    textChange(ev) {
        this.setState({
            keywords: ev.target.value
        });

    }
    //进行关键词请求
    getSuggestData(keywords){
        getSearchSuggest(keywords)
            .then(res=>{
                if(res.data.code == 200){
                    const newResult = Object.assign({},res.data.result);
                    //console.log(newResult);
                    //console.log(res.data);
                    this.setState({
                        searchSuggest: newResult
                    });
                }
            })
            .catch(error=>{
                throw new Error('获取搜索建议失败',error);
            });
    }
    //按下enter建开始搜索
    startSearch(ev){
        let keywords = ev.target.value;
        //如果文本框没有字，则需隐藏搜索栏
        if( keywords == '' ){
            this.setState({
                isSuggestListShow: false,
                searchSuggest:null, //存放搜索关键词的数据
            });
            return;
        }
        //按下enter
        if(ev.keyCode == 13){
            this.props.history.push(`/search?s=${keywords}&type=1`);
            this.setState({
                isSuggestListShow: false
            });
        }
        else{
            this.setState({
                isSuggestListShow: true
            });
            this.getSuggestData(keywords);
        }

    }
    render() {
        const {searchSuggest ,keywords,isSuggestListShow} = this.state;
        return (
            <div className="header_top">
                <div className="header_top_wrap clearfix">
                    <h1 className="logo">
                        <a href="https://github.com/ForeverCc">网易云音乐</a>
                    </h1>
                    <HeaderNav bool={this.props.bool}/> {/*登陆*/}
                    <HeaderLoginButton login={this.login.bind(this)} />
                    <a className="hd_video_sub" href="#">视频投稿</a>
                    <div className="hd_search">
                        <div className="hd_search_bg">
                            <label
                                style={{display: this.state.isLabelShow?'block':'none'
                            }}
                                onClick={this.hideLabel.bind(this)}>音乐/电台/用户</label>
                            <input
                                type="text"
                                value={this.state.keywords}
                                ref={input => {this.textInput = input;}}
                                onChange={this.textChange.bind(this)}
                                onKeyUp={this.startSearch.bind(this)}
                                onBlur={this.lostFocus.bind(this)}
                                onFocus={this.getFocus.bind(this)}
                            />
                        </div>
                        {
                            isSuggestListShow?<SearchSuggestList searchSuggest={searchSuggest} keywords={keywords} />:null
                        }

                        {/* {searchSuggest?<SearchList {...searchSuggest} />:null} */}
                    </div>
                </div>
            </div>

        );
    }
}


function matchStateToProps(state){
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeModalStatus: (status)=>{dispatch(changeModalStatus(status));}
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(HeaderTop);
