import React from 'react';
import { Link } from 'react-router';
import Loading from '../../../../components/loading';

function RadioRec(props){
    let datas = props.datas;
    return (
        <div className="rd_top_item fr ">
            <div className="clearfix c_title">
                <h3 className="fl"><Link className="title" to="/discover/djradio/rank">节目排行榜</Link></h3>
                <Link className="more fr" to="/discover/djradio/rank">更多&nbsp;&gt;</Link>
            </div>
            {
                !datas.length
                    ?<div className="loading_state2"><Loading size="small" /></div>
                    :    <ul className="rd_toplist rd_toplist_h">
                            {
                                datas.map((item,index)=>{
                                    return (
                                        <li key={item.program.id} className={index%2!==0?'even':''}>
                                            <div className="rank_num fl">
                                                <span className="num">{item.rank<10?('0'+item.rank):item.rank}</span>
                                                {
                                                    item.lastRank != null && item.lastRank>=0
                                                     ?<i className={item.lastRank-index-1>0?'icon_raise icon_rank':(item.lastRank-index-1==0?'icon_same icon_rank':'icon_drop icon_rank')}>{Math.abs(item.lastRank-index-1)}</i>
                                                         :<i className="icon_new"></i>
                                                }
                                            </div>
                                            <a href="javascript:;" className="avatar fl">
                                                <img src={item.program.coverUrl+'?param=40y40'} alt="" />
                                                <i onClick={ev=>{props.playDjTopProgram(index)}} className="play_icon"></i>
                                            </a>
                                            <div className="info fl">
                                                <p><Link className="color0 a_hover" to={`/program?id=${item.program.id}`} title={item.program.name}>{item.program.name}</Link></p>
                                                <p><Link  className="color9 a_hover"  to={`/djradio?id=${item.program.radio.id}`} title={item.program.radio.name}>{item.program.radio.name}</Link></p>
                                            </div>
                                            <div className="progress fl">
                                                <div style={{width:100*(item.score)/(datas[0].score)+'%'}}></div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
            }

        </div>
    );
}
export default RadioRec;
