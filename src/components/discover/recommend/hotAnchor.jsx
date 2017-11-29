/*
    主页热门主播
*/
import React from 'react';
import {Link} from 'react-router';
import {hotDj} from '../../../axios/mock';

function HotAnchor() {
    return (
        <div className="hot_anchor">
            <h3>热门主播</h3>
            <ul className="hot_anchor_list">
                {
                    hotDj.map(item=>{
                        return(
                            <li key={item.userId}>
                                <Link to={`/user/home?id=${item.userId}`} className="hot_anchor_avatar">
                                    <img src={item.picUrl} alt="img"/>
                                </Link>
                                <div className="hot_anchor_info">
                                    <p>
                                        <Link to={`/user/home?id=${item.userId}`}>{item.name}</Link>
                                        <i className="icon_v"></i>
                                    </p>
                                    <span>{item.desc}</span>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default HotAnchor;
