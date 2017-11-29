/**
 * 专辑详情页表格组件
 *      props {
 *          album
 *      }
 *
 */

import React from 'react';
import {Link} from 'react-router';
import {changeDuration} from '../../utils/dateFormat.js';

function AlbumDetailTable(props){
    return(
        <div className="song_tb">
            <div className="stb_title">
                <h3>包含歌曲列表</h3>
                <span className="stb_length">{props.songs.length}首歌</span>
            </div>
            <div className="stb_wrap">
                <table className="sl_table">
                    <thead>
                        <tr>
                            <th className="first_th width1"></th>
                            <th className="width2"><div className="t_title">歌曲标题</div></th>
                            <th className="th_len width3"><div className="t_title">时长</div></th>
                            <th className="th_len width4"><div className="t_title">歌手</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.songs.map((item,index)=>{
                                return(
                                    <tr key={item.id} className={index%2===0?'even':''}>
                                        <td>
                                            <div className="hd">
                                                <span className="num">{index+1}</span>
                                                <i onClick={ev=>{props.addAndPlay(item)}} className={props.curMusic.info && props.curMusic.info.id==item.id?'icon_play active':'icon_play'}></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <Link title={item.name} to={`/song?id=${item.id}`}>{item.name}</Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span className="time">{changeDuration(item.dt)}</span>
                                                <div className="t_btns clearfix">
                                                    <a onClick={ev=>{props.addToList(item)}} className="t_btn add" href="javascript:;"></a>
                                                    <a className="t_btn value" href="javascript:;"></a>
                                                    <a className="t_btn share" href="javascript:;"></a>
                                                    <a className="t_btn download" href="javascript:;"></a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <Link title={item.ar[0].name} to={`/artist?id=${item.ar[0].id}`}>{item.ar[0].name}</Link>
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

export default AlbumDetailTable;
