import React from 'react';
import {Link} from 'react-router'
import Loading from '../../loading';
import Pagination from '../../pagination';




function AllRadioPart(props){
    return(
        <div className="allradios">
            <div className="c_title clearfix">
                <h3 className="fl"><span className="title" href="#">电台排行榜</span></h3>
            </div>
            {
                !props.data.length?
                <div className="loading_state2"><Loading size="small"/></div>
                :<ul className="rd_typelist clearfix">
                    {
                        props.data.map(item=>{
                            return(
                                <li key={item.id}>
                                    <Link className="avatar" to={`/djradio?id=${item.id}`}>
                                        <img src={item.picUrl} alt="img" />
                                    </Link>
                                    <div className="info">
                                        <h4><Link title={item.name}  to={`/djradio?id=${item.id}`}>{item.name}</Link></h4>
                                        <p className="username">
                                            <i className="icon_user"></i>
                                            <Link title={item.dj.nickname} to={`/user/home?id=${item.dj.userId}`}>{item.dj.nickname}</Link>
                                            {
                                                item.dj.authStatus?(<i className="icon_v"></i>):null
                                            }

                                        </p>
                                        <p>共{item.programCount}期&nbsp;&nbsp;&nbsp;&nbsp;订阅{item.subCount}次</p>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            }
            <Pagination total={props.total} onChange={props.pageChange} pageSize={props.pageSize} />

        </div>
    )
}

export default AllRadioPart;
