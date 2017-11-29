/*
    评论组件
*/
import React from 'react';
import {Link} from 'react-router';
import {getDate} from '../../utils/dateFormat';

import '../../static/css/comment.css';
import avatar from '../../static/images/default_avatar.jpg';


class Comment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            commentData:props.commentData
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            commentData:nextProps.commentData
        })
    }

    render() {
        let comments = this.state.commentData;
        let hotCommentsEle = comments.hotComments&&comments.hotComments.length?comments.hotComments.map(item=>{
            return (
                <div key={item.commentId} className="cmt_item">
                    <div className="avatar fl">
                        <img src={item.user.avatarUrl} alt="avatar" />
                    </div>
                    <div className="cmt_detail_wrap">
                        <p>
                            <Link to={`/user/home?id=${item.user.userId}`}>{item.user.nickname}</Link> :  {item.content}
                        </p>
                        <div className="clearfix">
                            <span className="cmt_time">{getDate(item.time)}</span>
                            <a href="javascript:;" >回复</a>
                            <span className="line">|</span>
                            <a href="javascript:;"><i className="icon2 icon_zan"></i> {item.likedCount>0?(`(${item.likedCount})`:item.likedCount):''}</a>
                        </div>
                     </div>
                 </div>
            );
        }):null

        let commentsEle = comments.comments&&comments.comments.length?comments.comments.map(item=>{
            return (
                <div key={item.commentId} className="cmt_item">
                    <div className="avatar fl">
                        <img src={item.user.avatarUrl} alt="avatar" />
                    </div>
                    <div className="cmt_detail_wrap">
                        <p>
                            <Link to={`/user/home?id=${item.user.userId}`}>{item.user.nickname}</Link> :  {item.content}
                        </p>
                        <div className="clearfix">
                            <span className="cmt_time">{getDate(item.time)}</span>
                            <a href="javascript:;" >回复</a>
                            <span className="line">|</span>
                            <a href="javascript:;" ><i className="icon2 icon_zan"></i> {item.likedCount>0?(`(${item.likedCount})`:item.likedCount):''}</a>

                        </div>
                     </div>
                 </div>
            );
        }):null
        return (
            <div id="comment">
                <div className="cmt_wrap">
                    <div className="cmt_hd">
                        <h3>评论</h3>
                        <span>共{comments.total}条评论</span>
                    </div>
                    <div className="cmt_bd">
                        {/*输入文本框*/}
                        <div className="input_area clearfix">
                            <div className="avatar fl">
                                <img src={avatar} alt="avatar" />
                            </div>
                            <div className="form_area">
                                <div className="areabox">
                                    <textarea></textarea>
                                </div>
                                <div className="form_btns clearfix">
                                    <i className="icon icon_face"></i>
                                    <i className="icon icon_at"></i>
                                    <a href="#">评论</a>
                                    <span>140</span>
                                </div>
                            </div>
                        </div>
                        <div className="cmt_content">
                            {
                                comments.hotComments&&comments.hotComments.length?<h4>精彩评论</h4>:null
                            }
                            {
                                hotCommentsEle
                            }
                            <br />
                            <br />
                            {
                                comments.comments&&comments.comments.length?<h4>最新评论</h4>:null
                            }
                            {
                                commentsEle
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Comment;
