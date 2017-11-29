/*
    头部导航组件
*/

import React from 'react';

import {Link,IndexLink} from 'react-router';

class HeaderNav extends React.Component {
    render() {
        return (
            <ul className="header_nav_bar clearfix">
                <li className="">
                    <IndexLink to='/' className={this.props.bool?'active':''}>
                        <span>发现音乐</span>
                        <i className="triangle"></i>
                    </IndexLink>
                </li>
                <li>
                    <Link to='/mymusic' activeClassName="active">
                        <span>我的音乐</span>
                        <i className="triangle"></i>
                    </Link>
                </li>
                <li>
                    <Link to='/friend' activeClassName="active">
                        <span>朋友</span>
                        <i className="triangle"></i>
                    </Link>
                </li>
                <li>
                    <Link to="http://music.163.com/store/product" target="_blank">
                        <span>商城</span>
                    </Link>
                </li>
                <li>
                    <Link to="http://music.163.com/nmusician/web/recruit" target="_blank">
                        <span>音乐人</span>
                    </Link>
                </li>
                <li>
                    <a to="javascipt:;">
                        <span>下载客户端</span>
                    </a>
                    <span className="icon_hot">&nbsp;</span>
                </li>
            </ul>
        );
    }
}

export default HeaderNav;
