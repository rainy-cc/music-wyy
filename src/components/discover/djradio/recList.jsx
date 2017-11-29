import React from 'react';
import { Link } from 'react-router';


function RecList(props){
    return(
        <ul className="rd_more_toplist rd_toplist clearfix">
            {
                props.data.map((item,index) =>{
                    return(
                        <li key={index} className={index%2!==0?'even':''}>
                            <a href="javascript:;" className="avatar fl">
                                <img src={item.coverUrl+'?param=40y40'} alt="img" />
                                <i className="play_icon"></i>
                            </a>
                            <div className="name overhide fl">
                                <Link to={`/program?id=${item.id}`} title={item.name}>{item.name}</Link>
                            </div>
                            <div className="author overhide fl">
                                <Link to={`/djradio?id=${item.radio.id}`} title={item.radio.name}>{item.radio.name}</Link>
                            </div>
                            <div className="playnum fl">播放{item.listenerCount}</div>
                            <div className="zan fl">赞{item.likedCount}</div>
                            <Link to={`/discover/djradio/category?id=${item.radio.categoryId}`} className="type fl">{item.radio.category}</Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default RecList;
