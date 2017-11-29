/*
    歌单搜索结果
 */
import React from 'react';
import {Link} from 'react-router'


function  SchPlaylist(props){
    return(
        <div>
            {
                props.data.playlists.length?
                <ul className="play_list">
                    {
                        props.data.playlists.map((item,index)=>{
                            return(
                                <li key={item.id} className={index%2!=0?'even':''}>
                                    <div className="column col1">
                                        <i className="icon_play"></i>
                                    </div>
                                    <div className="column col2">
                                        <Link href="#">
                                            <img src={item.coverImgUrl+'?param=50y50'} />
                                        </Link>
                                    </div>
                                    <div className="column col3">
                                        <Link to={`/playlist?id=${item.id}`}  title={item.name}>{item.name}</Link>
                                    </div>
                                    <div className="column col4 color9">{item.trackCount}首</div>
                                    <div className="column col5 color6">by <Link className="color6" to={`/user/home?id=${item.creator.userId}`}>{item.creator.nickname}</Link></div>
                                    <div className="column col6 color9">收藏:&nbsp;<span>{item.bookCount}</span></div>
                                    <div className="column col7 color9">收听:&nbsp;<span>{item.playCount>10000?parseInt(item.playCount/10000)+'万':item.playCount}</span></div>
                                </li>
                            );
                        })
                    }

                </ul>:
                <div>未搜索到相关结果</div>
            }

        </div>
    );
}

export default SchPlaylist;
