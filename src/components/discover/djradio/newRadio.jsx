/**
 * 优秀新电台组件
 *      props {
 *          data: []
 *      }
 *
 */
import React from 'react';
import {Link} from 'react-router'
import Loading from '../../loading';


function NewRadioPart(props){
    return(
        <div className="newradios">
            <div className="c_title clearfix">
                <h3 className="fl"><span className="title" href="#">优秀新电台</span></h3>
            </div>
            {
                !props.data.length?
                    <div className="loading_state"><Loading size="small"/></div>
                    :<ul className="list clearfix">
                        {
                            props.data.map(item=>{
                                return(
                                    <li key={item.id}>
                                        <Link className="avatar" to={`/djradio?id=${item.id}`}>
                                            <img src={item.picUrl} />
                                        </Link>
                                        <h5><Link title={item.name}to={`/djradio?id=${item.id}`}>{item.name}</Link></h5>
                                        <p className="desc">{item.rcmdtext}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
            }
        </div>
    );
}

export default NewRadioPart;
