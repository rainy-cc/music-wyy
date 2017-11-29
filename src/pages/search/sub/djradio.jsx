/**
 * 主播电台搜索结果 type=1009
 */

import React from 'react';
import {Link} from 'react-router';

function SchRadio(props){
    return(
        <div>
            <h5 className="hd">主播电台</h5>
            {
                props.data.djRadios.length?
                <ul className="dj_list clearfix">
                    {
                        props.data.djRadios.map(item=>{
                            return(
                                <li key={item.id}>
                                    <Link className="avatar">
                                        <img src={item.picUrl+'?param=150y150'} />
                                    </Link>
                                    <p className="name overhide">
                                        <Link to={`/djradio?id=${item.id}`} title={item.name}>{item.name}</Link>
                                    </p>
                                    <p className="author overhide">
                                        <span className="by">by</span>
                                        <Link className="nickname" to={`/user/home?id=${item.dj.userId}`} title={item.dj.nickname}>{item.dj.nickname}<i className="icon_gender"></i></Link>
                                    </p>
                                </li>
                            )
                        })
                    }


                </ul>:
                <div>未搜索到相关结果</div>
            }

        </div>
    );
}
export default SchRadio;
