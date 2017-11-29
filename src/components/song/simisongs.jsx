/**
 * 单曲页面其他相似单曲组件 SimliarSongs
 *      props  {
 *          data
 *      }
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function SimliarSongs(props){
    return(
        <div className="simi_songs">
            <h5>相似歌曲</h5>
            <ul className="simi_list">
                {
                    props.data && props.data.length?
                        props.data.map(item=>{
                            return(
                                <li key={item.id} className="clearfix">
                                    <div className="text fl">
                                        <p className="overhide"><Link to={`/song?id=${item.id}`} title={item.name}>{item.name}</Link></p>
                                        <p className="overhide"><Link className="author" to={`/artist?id=${item.artists[0].id}`}  title={item.artists[0].name}>{item.artists[0].name}</Link></p>
                                    </div>
                                    <div className="btn_box fr">
                                        <a onClick={e=>{props.playSong(item)}} className="play" title="播放" href="javascript:;"></a>
                                        <a onClick={e=>{props.addSong(item)}} className="add" title="添加" href="javascript:;"></a>
                                    </div>
                                </li>
                            );
                        }):null
                }

            </ul>
        </div>
    );
}
SimliarSongs.propTypes ={
    data: PropTypes.array.isRequired
};

export default SimliarSongs
