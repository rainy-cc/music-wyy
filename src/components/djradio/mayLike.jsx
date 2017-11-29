

/**
 * djradio详情页面的侧边可能喜欢组件
 *
 *      props {
 *          data: 详情信息
 *      }
 *
 */

import React from 'react';
import {Link} from 'react-router';
function MaybeLike(props){
    return(
        <div className="maylike">
            <h5>你可能也喜欢</h5>
            <ul className="list">
                {
                    props.data.map(item=>{
                        return(
                            <li key={item.id}>
                                <div className="avatar fl">
                                    <Link to={`/djradio?id=${item.id}`}>
                                        <img src={item.picUrl} />
                                    </Link>
                                </div>
                                <div className="info">
                                    <p className="overhide">
                                        <Link to={`/djradio?id=${item.id}`}>{item.name}</Link>
                                    </p>
                                    <p className="">
                                        <span className="by">by</span>
                                        <Link className="author" to={`/user/home?id=${item.dj.userId}`}>{item.dj.nickname}</Link>
                                        <i className="icon_v"></i>
                                    </p>
                                </div>
                            </li>
                        );
                    })
                }

            </ul>
        </div>
    );
}

export default MaybeLike;
