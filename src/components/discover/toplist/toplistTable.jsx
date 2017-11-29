/**
 *
 */
import React from 'react';
import {Link} from 'react-router';
import {format} from '../../../utils/dateFormat.js';

function TopListTable(props){
    let data = props.detailDatas;
    let curMusic = props.currentMusic;
    return(
        <div className="song_list">
            <div className="sl_title">
                <h3>歌曲列表</h3>
                <span className="length">{data.trackCount}首歌</span>
                <div className="play_num">播放&nbsp;:&nbsp;<strong>{data.playCount}</strong>&nbsp;次</div>
            </div>
            <div className="sl_ctx">
                <table className="sl_tabel">
                    <thead>
                        <tr>
                            <th className="first_th w1"></th>
                            <th><div className="t_title">标题</div></th>
                            <th className="th_len"><div className="t_title">时长</div></th>
                            <th className="th_len"><div className="t_title">歌手</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.tracks.map((item,index)=>{
                                return(
                                    <tr className={index%2===0?'even':''} key={item.id}>
                                   <td>
                                       <div className="column1">
                                           <span className="num">{index+1}</span>
                                           <div className="rank">
                                               {
                                                   item.lastRank != null && item.lastRank>=0
                                                    ?<span className={item.lastRank-index>0?'icon_raise icon_rank':(item.lastRank-index==0?'icon_same icon_rank':'icon_drop icon_rank')}>{Math.abs(item.lastRank-index)}</span>
                                                        :<span className="icon_new"></span>

                                               }
                                           </div>
                                       </div>
                                   </td>
                                   <td>
                                       <div className={index<3?'column2 col2_img clearfix':'column2'}>
                                           {
                                               index<3 ?<Link  to={`/song?id=${item.id}`} className="avatar fl"><img src={item.al.picUrl+'?param=50y50'} /></Link>:null
                                           }
                                           <span onClick={ev=>props.addAndPlay(item)} className={curMusic.info&&curMusic.info.id==item.id?'p_icon active':'p_icon'}></span>
                                           <p className="overhide"><Link to={`/song?id=${item.id}`} title={item.name}>{item.name}</Link></p>
                                       </div>
                                   </td>
                                   <td>
                                       <div className="column3">
                                           <span className="time">{format(item.dt,'mm:ss')}</span>
                                           <div className="t_btns clearfix">
                                               <a className="t_btn add" href="javascript:;"></a>
                                               <a className="t_btn value" href="javascript:;"></a>
                                               <a className="t_btn share" href="javascript:;"></a>
                                               <a className="t_btn download" href="javascript:;"></a>
                                           </div>
                                       </div>
                                   </td>
                                   <td>
                                       <div className="column4 overhide">
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
export default TopListTable;
