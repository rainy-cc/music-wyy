/*
    网易头部组件
*/
import React from 'react';

import HeaderTop from './headerTop';
import HeaderLine from './headLine';
import HeaderSubNav from './subNav';


import '../../static/css/header.css';

class Header extends React.Component {
    render(){
        //拿到路径,当为/或者含有/discover
        let pathname = this.props.location.pathname;

        let bool = pathname.indexOf('/discover') !== -1||pathname === '/' || pathname.indexOf('/playlist')!==-1 || pathname.indexOf('/artist') !== -1;
        return (
            <div id="header">
                <HeaderTop history={this.props.history} bool={bool} />
                {
                    bool? <HeaderSubNav pathname={pathname} />:<HeaderLine />
                }
            </div>
        );
    }
}


export default Header;
