/*
    歌单列表页面头部
 */
import React from 'react';
import { Link } from 'react-router';

import {categories} from '../../../../utils/config';



class PlayListHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            showCateBox: false
        };
        this.changeCatBoxState = this.changeCatBoxState.bind(this);
    }
    //点击切换显示隐藏
    changeCatBoxState(ev){
        let isShowCateBox = this.state.showCateBox;
        this.setState({
            showCateBox: !isShowCateBox
        });
    }

    render(){
        return(
            <div className="playlist_hd clearfix">
                <h3>
                    <span className="title">{this.props.category}</span>
                    <a onClick={this.changeCatBoxState} href="javascript:;" className="choose_btn" >
                        <span>选择分类<i className="arrow_down"></i></span>
                    </a>
                </h3>
                {
                    this.state.showCateBox?
                        (
                            <div className="categories" >
                                <div className="arrow_top"></div>
                                <div className="hd">
                                    <Link onClick={ev=>{
                                        this.props.changeCategory('全部');
                                        this.changeCatBoxState();
                                    }}  to={`/discover/playlist?order=${this.props.order}`}>全部风格</Link>
                                </div>
                                <div className="bd">
                                    {
                                        categories.map((item,index)=>{
                                            return(
                                                <dl key={index} className="clearfix">
                                                    <dt>
                                                        <i className={item.className}></i><span>{item.type}</span>
                                                    </dt>
                                                    <dd className={index==4?'last':''}>
                                                        {
                                                            item.category.map((catItem,index)=>{
                                                                return(
                                                                    <span key={index} className="item">
                                                                        <Link to={`/discover/playlist?cat=${encodeURIComponent(catItem)}&order=${this.props.order}`} onClick={e=>{
                                                                            this.props.changeCategory(catItem);
                                                                            this.changeCatBoxState();

                                                                        }}>{catItem}</Link><span className="line">|</span>
                                                                    </span>
                                                                );
                                                            })
                                                        }
                                                    </dd>
                                                </dl>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        ):null
                }

                <div className={`btns_r btns_r_${this.props.order}`}>
                    <Link to="/discover/playlist?order=hot" onClick={e=>{this.props.changeOrder('hot')}} className="a1">热门</Link>
                    <Link to="/discover/playlist?order=new"  onClick={e=>{this.props.changeOrder('new')}} className="a2">最新</Link>
                </div>
            </div>
        );
    }
}
export default PlayListHeader;
