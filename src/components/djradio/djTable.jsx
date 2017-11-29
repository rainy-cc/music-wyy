/**
 * djradio详情页面的program表格组件
 *
 *      props {
 *          data: 详情信息
 *      }
 *
 */

import React from 'react';
import {Link} from 'react-router';
import Loading from '../../components/loading';
import { format, changeDuration } from '../../utils/dateFormat';
function DjradioTable(props){
    const {count,currentPage,program,curMusic} = props;
    return(
        <div className="song_tb">
            <div className="stb_title">
                <h3>节目列表</h3>
                <span className="stb_length">共{count}期</span>
            </div>
            <div className="stb_wrap">
                {
                    !program.length?
                    <div style={{height:'200px', paddingTop:'100px'}}><Loading size="small" /></div>:
                    <table className="sl_table dr_table">
                        <tbody>
                            {
                                program.map((item,index)=>{
                                    return(
                                        <tr key={item.id} className={index%2 !==0? 'even':''}>
                                            <td className="column1">
                                                <div className="hd">
                                                    <span className="num">{count-(currentPage-1)*100-index}</span>
                                                    <i onClick={ev=>{props.addAndPlay(item)}}
                                                        className={curMusic.info&&curMusic.info.id==item.mainSong.id?'icon_play active':'icon_play'}></i>
                                                </div>
                                            </td>
                                            <td className="column2">
                                                <div className="name overhide fl">
                                                    <Link title={item.name} to={`/program?id=${item.id}`}>{item.name}</Link>
                                                </div>
                                                <div className="t_btns fr clearfix">
                                                    <a onClick={ev=>{props.addToPlaylist(item.mainSong)}} className="t_btn add" href="javascript:;"></a>
                                                    <a className="t_btn share" href="javascript:;"></a>
                                                    <a className="t_btn download" href="javascript:;"></a>
                                                </div>
                                            </td>
                                            <td className="column3">
                                                <div>
                                                    <span className="time">
                                                    播放{item.listenerCount>=100000?(Math.round(parseInt(item.listenerCount/10000))+'万'):item.listenerCount}</span>
                                                </div>
                                            </td>
                                            <td className="column4">
                                                <div>
                                                    赞{item.likedCount}
                                                </div>
                                            </td>
                                            <td className="column5">
                                                <div>
                                                    {format(item.createTime,'yyyy-MM-dd')}
                                                </div>
                                            </td>
                                            <td className="column6">
                                                <div>
                                                    {changeDuration(item.duration)}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                }

            </div>
        </div>
    );
}

export default DjradioTable;
