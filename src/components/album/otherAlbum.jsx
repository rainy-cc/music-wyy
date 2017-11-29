/**
 * 他的热门专辑组件
 */

 import React from 'react';
 import { Link } from 'react-router';
 import {format} from '../../utils/dateFormat';
 import Loading from '../../components/loading';

function OtherAlbumPanel(props){
    return (
        <div className="other_album">
            <h5>Ta的其他热门专辑</h5>
            {
                props.data.length?
                <ul className="list">
                    {
                        props.data.map(item=>{
                            return(
                                <li key={item.id} className="clearfix">
                                    <div className="avatar fl">
                                        <Link to={`/album?id=${item.id}`}>
                                            <img src={item.picUrl+'?param=50y50'}/>
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <p className="title overhide color0">
                                            <Link to={`/album?id=${item.id}`} title={item.name}>{item.name}</Link>
                                        </p>
                                        <p>
                                            <span className="time color6 overhide">{format(item.publishTime,'yyyy-MM-dd')}</span>
                                        </p>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>:
                <div style={{padding: '50px 0'}}>
                    <Loading size="small" />
                </div>
            }

        </div>
    );
}

export default OtherAlbumPanel;
