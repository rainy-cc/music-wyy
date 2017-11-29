/**
 *
 *
 */

 import React from 'react';
 import {Link} from 'react-router';

 function MvBriefDesc(props){
     return(
         <div className="mv_intro">
             <h5 className="cm_title_h5">MV简介</h5>
             <div className="mv_intro_ctx">
                 <p>发布时间：{props.mvData.data.publishTime}</p>
                 <p>播放次数：{props.mvData.data.playCount}</p>
                 <div className="intro">{props.mvData.data.briefDesc}<br />{props.mvData.data.desc}</div>
             </div>
         </div>
     );
 }

 export default MvBriefDesc;
