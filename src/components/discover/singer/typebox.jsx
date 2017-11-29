/**
 *  歌手列表左侧导航块组件
 */
import React from 'react';
import {Link} from 'react-router';

function SingerTypeBox(props){
    return (
        <div className="type_box">
            <h2 className="title">{props.title}</h2>
            <ul className="nav_list">
                {
                    props.types.map((item,index)=>{
                        return(
                            <li key={index}><Link activeClassName="active" to={`/discover/artist/cat?id=${item.id}`}>{item.title}</Link></li>
                        );
                    })
                }
            </ul>
        </div>
    );
}


export default SingerTypeBox;
