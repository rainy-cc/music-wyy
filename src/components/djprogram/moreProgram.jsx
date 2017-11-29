import React from 'react';
import {Link} from 'react-router';
import Loading from '../loading';

function MoreProgram(props){
    return(
        <div className="more_program">
            <h5>更多节目</h5>
            {
                !props.data.length
                    ?<Loading size="small" />
                    :<ul className="more_program_list">
                        {
                            props.data.map(item=>{
                                return(
                                    <li key={item.id} className="clearfix">
                                        <div className="avatar">
                                            <Link to={`/program?id=${item.id}`}>
                                                <img src={item.coverUrl}/>
                                            </Link>
                                        </div>
                                        <div className="info">
                                            <p className="name overhide"><Link title={item.name} to={`/program?id=${item.id}`}>{item.name}</Link></p>
                                            <p className="overhide">Vol.{item.serialNum}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }

                    </ul>
            }

        </div>
    );
}

export default MoreProgram;
