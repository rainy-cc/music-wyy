/**
 * mv搜索结果 type=1004
 */
import React from 'react';
import {Link} from 'react-router'

function SchMV(props){
    return(
        <div>

                {
                    props.data.mvs.length?
                        <ul className="mv_list clearfix">
                            {
                                props.data.mvs.map(item=>{
                                    return(
                                        <li key={item.id} className="clearfix">
                                            <div className="cover">
                                                <img src={item.cover} />
                                                <Link className="mask" to={`/mv?id=${item.id}`}></Link>
                                                <div className="playcount"><i className="icon_camera"></i>8888</div>
                                                <span className="duration">03:37</span>
                                            </div>
                                            <p className="mv_name overhide"><Link  to={`/mv?id=${item.id}`} title={item.name}>{item.name}</Link></p>
                                            <p className="mv_author overhide"><Link to={`/artist?id=${item.artistId}`} title={item.artistName}>{item.artistName}</Link></p>
                                        </li>
                                    );
                                })
                            }
                        </ul>:
                        <div>未搜索到相关Mv，请搜索点别的吧，亲</div>
                }
                {/* <li className="clearfix">
                    <div className="cover">
                        <img src="http://p3.music.126.net/OyXaKM_FsCo8pMU5Kdrr8w==/18905002928266421.jpg?param=159y90" />
                        <a className="mask" href="#"></a>
                        <div className="playcount"><i className="icon_camera"></i>8888</div>
                        <span className="duration">03:37</span>
                    </div>
                    <p className="mv_name"><a href="#">123</a></p>
                    <p className="mv_author"><a href="#">郭欣桐</a></p>
                </li> */}

        </div>
    );
}

export default SchMV;
