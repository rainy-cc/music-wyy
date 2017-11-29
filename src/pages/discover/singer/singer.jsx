/**
 * 这是歌手列表页面
 * 		@router : /discover/artist
 */

import React from 'react';
import {IndexLink,Link} from 'react-router';
import {singerNav} from '../../../utils/config';
import SingerTypeBox from '../../../components/discover/singer/typebox';
import '../../../static/css/singer.css';

class Singer extends React.Component {

    render(){
        return(
            <div id="singer" className="singer g_main clearfix">
                <div className="singer_nav fl">
                    <div className="sg_nav_wrap">
                        <div className="type_box">
                            <h2 className="title">推荐</h2>
                            <ul className="nav_list">
                                <li><IndexLink activeClassName="active" to="/discover/artist/">推荐歌手</IndexLink></li>
                                <li><Link activeClassName="active" to="/discover/artist/signed/">入驻歌手</Link></li>
                            </ul>
                        </div>
                        {
                            singerNav.map((item,index)=>{
                                return (
                                    <SingerTypeBox key={index} title={item.title} types={item.types} />
                                );
                            })
                        }
                    </div>
                </div>
				{/* 右侧的页面 */}
                <div className="singer_content fr">
					<div className="sg_content_wrap">
						{/* <RecSingers/> */}
						{
							this.props.children
						}
					</div>
                </div>
            </div>
        );
    }
}

export default Singer;
