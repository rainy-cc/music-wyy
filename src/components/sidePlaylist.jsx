import React from 'react';
import { Link } from 'react-router';

function SidePlaylist(props){
    return(
        <div className="side_playlist">
            <h5>{props.title}</h5>
            <ul className="reclist">
                {
                    props.playlists.map(item=>{
                        return(
                            <li key={item.id} className="clearfix">
                                <div className="avatar fl">
                                    <Link to={`/playlist?id=${item.id}`} title={item.name}>
                                        <img src={item.coverImgUrl+'?param=50y50'}/>
                                    </Link>
                                </div>
                                <div className="info">
                                    <p className="title overhide color0">
                                        <Link to={`/playlist?id=${item.id}`} title={item.name}>{item.name}</Link>
                                    </p>
                                    <p>
                                        <span className="by fl">by</span>
                                        <Link className="name fl overhide" to={`/user/home?id=${item.userId}`} title={item.creator.nickname}>{item.creator.nickname}</Link>
                                        {item.creator.expertTags?<i className="icon fl"></i>:null}
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

export default SidePlaylist;
