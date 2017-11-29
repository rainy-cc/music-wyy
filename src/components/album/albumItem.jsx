/*
    新碟页面的单个图片盒子
*/
import React from 'react';
import {Link} from 'react-router';

import PropTypes from 'prop-types';

function AlbumItem(props){
    return(
        <ul className="alb_list album_coverlist clearfix">
            {
                /*取10条数据*/
                props.data.map(item=>{
                    return(
                        <li key={item.id}>
                            <div className="alb_imgwrap">
                                <Link className="mask" to={`/album?id=${item.id}`}></Link>
                                <img src={item.picUrl+'?param=130y130'} />
                                <i onClick={ev=>{props.changePlaylist(item.id)}} className="icon_play"></i>
                            </div>
                            <p className="name overhide"><Link to={`/album?id=${item.id}`} title={item.name} >{item.name}</Link></p>
                            <p className="nickname overhide"><Link to={`/artist?id=${item.artist.id}`} title={item.artist.name}>{item.artist.name}</Link></p>
                        </li>
                    );
                })
            }
        </ul>
    );
}
/*
    参数验证
*/
AlbumItem.propTypes = {

    data: PropTypes.array.isRequired

};

export default AlbumItem;
