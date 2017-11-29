/*
    单曲搜索结果
 */

import React from 'react';
import { Link } from 'react-router';

import { changeDuration} from '../../../utils/dateFormat.js';

function SchSong(props){
    return(
        <div>
            {
                props.data.songs.length?
                <ul className="sch_song_list">
                    {
                        props.data.songs.map((item,index)=>{
                            return(
                                <li key={item.id} className="">
                                    <div className="item clearfix">
                                        <div className="column">
                                            <a className="play" href="javascript:;"></a>
                                        </div>
                                        <div className="column w370">
                                            <Link className="name overhide" to={`/song?id=${item.id}`}>{item.name}</Link>
                                            <i className="icon_mv"></i>
                                        </div>
                                        <div className="column w79 ">
                                            <div className="t_btns clearfix">
                                                <a className="t_btn add" href="javascript:;"></a>
                                                <a className="t_btn value" href="javascript:;"></a>
                                                <a className="t_btn share" href="javascript:;"></a>
                                                <a className="t_btn download" href="javascript:;"></a>
                                            </div>
                                        </div>
                                        <div className="column w130 overhide">
                                            <Link to={`/artist?id=${item.artists[0].id}`}>{item.artists[0].name}</Link>
                                        </div>
                                        <div className="column w160 overhide">
                                            <a href="#">《{item.album.name}》</a>
                                        </div>
                                        <div className="column fr">
                                            <span>{changeDuration(item.duration)}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>:
                <div>未搜索到相关歌曲</div>
            }
        </div>
    );
}


export default SchSong;
