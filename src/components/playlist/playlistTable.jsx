/**
 * 歌单详情页面信息部分
 *      props {
 *          data
 *      }
 */
import React from 'react';
import { Link } from 'react-router';
import { changeDuration } from  '../../utils/dateFormat.js';

//歌单详情页表格
function PlaylistTable(props){
    return(
        <div className="song_tb">
            <div className="stb_title">
                <h3>歌曲列表</h3>
                <span className="stb_length">{props.tracks.length}首歌</span>
                <div className="stb_playnum">播放&nbsp;:&nbsp;<strong>{props.playCount}</strong>&nbsp;次</div>
            </div>
            <div className="stb_wrap">
                <table className="sl_table pld_table">
                    <thead>
                        <tr>
                            <th className="first_th width1"></th>
                            <th className="width2"><div className="t_title">歌曲标题</div></th>
                            <th className="th_len width3"><div className="t_title">时长</div></th>
                            <th className="th_len width4"><div className="t_title">歌手</div></th>
                            <th className="th_len width5"><div className="t_title">专辑</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.tracks.map((item,index)=>{
                                return(
                                    <tr key={item.id} className={index%2===0?'even':''}>
                                        <td>
                                            <div className="hd">
                                                <span className="num">{index+1}</span>
                                                <i onClick={ev=>{props.addAndPlay(item)}} className={props.curMusic.info&&props.curMusic.info.id==item.id?'icon_play active':'icon_play'}></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="overhide">
                                                <Link to={`/song?id=${item.id}`} title={item.name}>{item.name}</Link>
                                                {
                                                    item.mv?<Link className="mv_btn" to={`/mv?id=${item.mv}`}></Link>:null
                                                }

                                            </div>
                                        </td>
                                        <td>
                                            <div className="overhide">
                                                <span className="time">{changeDuration(item.dt)}</span>
                                                <div className="t_btns clearfix">
                                                    <a onClick={ev=>{props.addToPlaylist(item)}} className="t_btn add" href="javascript:;"></a>
                                                    <a className="t_btn value" href="javascript:;"></a>
                                                    <a className="t_btn share" href="javascript:;"></a>
                                                    <a className="t_btn download" href="javascript:;"></a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="overhide">
                                                <Link to={`/artist?id=${item.ar[0].id}`} title={item.ar[0].name}>{item.ar[0].name}</Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="overhide">
                                                <Link to={`/album?id=${item.al.id}`} title={item.al.name}>{item.al.name}</Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
}


 export default PlaylistTable;
