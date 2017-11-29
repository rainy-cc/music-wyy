import React from 'react';
import {Link} from 'react-router';
import Loading from '../../../../components/loading';

function RadioTop(props){
    let datas = props.datas;
    return (
        <div className="rd_top_item fl">
            <div className="clearfix c_title">
                <h3 className="fl"><Link className="title" to='/discover/djradio/recommend'>推荐节目</Link></h3>
                <Link to='/discover/djradio/recommend' className="more fr" href="#">更多&nbsp;&gt;</Link>
            </div>
            {
                !datas.length
                    ?<div className="loading_state2"><Loading size="small" /></div>
                    :<ul className="rd_toplist">
                        {
                            datas.map((item,index) =>{
                                return(
                                    <li key={item.id} className={index%2!==0?'even':''} >
                                        <a href="javascript:;" className="avatar fl">
                                            <img src={item.coverUrl+'?param=40y40'} alt="img" />
                                            <i onClick={ev=>{props.playDjRecProgram(index)}} className="play_icon"></i>
                                        </a>
                                        <div className="info fl">
                                            <p><Link className="color0 a_hover"  to={`/program?id=${item.id}`} title={item.name}>{item.name}</Link></p>
                                            <p><Link className="color9 a_hover"  to={`/djradio?id=${item.radio.id}`} title={item.radio.name}>{item.radio.name}</Link></p>
                                        </div>
                                        <Link  to={`/discover/djradio/category?id=${item.radio.categoryId}`} className="type fl">{item.radio.category}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
            }
        </div>
    );
}


export default RadioTop;
