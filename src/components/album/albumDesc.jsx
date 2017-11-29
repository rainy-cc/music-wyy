/**
 * 专辑信息组件
 */
import React from 'react';

class AlbumDesc extends React.Component {
    constructor(){
        super();
        this.state={
            moreDesc: false //是否显示更多的信息
        };
    }
    //改变展示 还是收起的状态
    change(){
        let moreDesc = this.state.moreDesc;
        this.setState({
            moreDesc: !moreDesc
        });
    }

    render(){
        return(
            <div className="albd_desc">
                <strong>专辑介绍:</strong>
                <div className="desc" style={{display: this.state.moreDesc?'none':'block'}}>
                    {
                        this.props.album.description?
                            (this.props.album.description.substr(0,160)+'...')
                                .split('\n')
                                .map((item,index)=>{
                                    return (<p key={index}>{item}</p>);
                                })
                                :<p>暂时没有相关介绍</p>
                    }
                </div>
                <div className="desc" style={{display: this.state.moreDesc?'block':'none'}}>
                    {
                        this.props.album.description?
                            this.props.album.description
                                .split('\n')
                                .map((item,index)=>{
                                    return (<p key={index}>{item}</p>);
                                })
                                :<p>暂时没有相关介绍</p>
                    }
                </div>
                {
                    this.props.album.description&&this.props.album.description.length>160?
                    <div className="open clearfix">
                        <a onClick={this.change.bind(this)} href="javascript:;">{this.state.moreDesc?<span>收起</span>:<span>展开</span>}<i className={this.state.moreDesc?'arrow arrow_up':'arrow'}></i></a>
                    </div>:null
                }
            </div>
        );
    }
}

export default AlbumDesc;
