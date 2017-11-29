/**
 * 节目排行榜页面的列表组件
 *      props{
 *          data: array
 *      }
 */
import React from 'react';
import { Link } from 'react-router';


function RankList(props){
    return(
        <ul className="rd_toplist rd_toplist_h rd_toplist_rank">
            {
                props.data.map((item,index)=>{
                    return(
                        <li key={item.program.id}  className={index%2!==0?'even':''}>
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
                               <i className="play_icon"></i>
                           </a>
                           <div className="name overhide fl">
                               <Link to={`/program?id=${item.program.id}`} title={item.program.name}>{item.program.name}</Link>
                           </div>
                           <div className="author overhide fl">
                               <Link to={`/djradio?id=${item.program.radio.id}`} title={item.program.radio.name}>{item.program.radio.name}</Link>
                           </div>
                           <Link  to={`/discover/djradio/category?id=${item.program.radio.categoryId}`} className="type fl">{item.program.radio.category}</Link>
                           <div className="progress fr">
                               <div style={{width:100*(item.score)/(props.data[0].score)+'%'}}></div>
                           </div>
                       </li>
                   );
                })
            }
        </ul>
    );
}

export default RankList;
