/**
 *
 */
 import React from 'react';
 import {Link} from 'react-router';
 import Loading from '../loading';

 function MvRelative(props){
     return(
         <div className="mv_relative">
             <h5 className="cm_title_h5">相关MV</h5>
             {
                 !props.data.length ?
                 <div style={{padding: '80px 0'}}>
                     <Loading size="small" />
                 </div> :
                 <ul className="list">
                     {
                         props.data.map(item=>{
                             return(
                                 <li key={item.id}>
                                     <div className="mv_img fl">
                                         <Link className="" to={`/mv?id=${item.id}`}>
                                             <img src={item.cover}></img>
                                             <i className="icon_play"></i>
                                         </Link>
                                     </div>
                                     <div className="mv_name overhide"><Link title={item.name} to={`/mv?id=${item.id}`}>{item.name}</Link></div>
                                 </li>
                             );
                         })
                     }
                 </ul>
             }

         </div>
     );
 }

 export default MvRelative;
