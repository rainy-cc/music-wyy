/*
    推荐主体头部共用的title
*/

import React from 'react';
import { Link } from 'react-router';

const element = (<div className="nav">
    <Link className="color6" to={`/discover/playlist?cat=${encodeURIComponent('华语')}`}>华语</Link><span>|</span>
    <Link className="color6" to={`/discover/playlist?cat=${encodeURIComponent('流行')}`}>流行</Link><span>|</span>
    <Link className="color6" to={`/discover/playlist?cat=${encodeURIComponent('摇滚')}`}>摇滚</Link><span>|</span>
    <Link className="color6" to={`/discover/playlist?cat=${encodeURIComponent('民谣')}`}>民谣</Link><span>|</span>
    <Link className="color6" to={`/discover/playlist?cat=${encodeURIComponent('电子')}`}>电子</Link>
</div>);

function RecommendContentHeader(props){
    return (
        <div className="rec_ctx_header">
            <a className="title" href="#">{props.title}</a>
            { props.isShowNav? element: null }
            <span className="more">
                <Link to={props.linkUrl}>更多</Link>
                <i></i>
            </span>
        </div>
    );
}




export default RecommendContentHeader;
