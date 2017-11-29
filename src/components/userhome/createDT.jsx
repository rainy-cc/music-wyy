/*
    userhome
        用户创建的电台
*/
import React from 'react';


function UserCreateDT(props){
    return(
        <div className="uh_dt">
            <div className="uh_title">
                <h3>{props.nickname}创建的电台</h3>
            </div>
            <ul className="uh_dtlist">
                {
                    props.dtRadioData.map(item=>{
                        return(
                            <li key={item.id}>
                                <a className="dt_avatar fl" href="#">
                                    <img src={item.picUrl} />
                                </a>
                                <div className="dt_name fl">
                                    <a href="#">{item.name}</a>
                                    <i className="icon_share"></i>
                                </div>
                                <div className="dt_dy fl">订阅{item.subCount}次</div>
                                <div className="dt_num fl">{item.programCount}期</div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default UserCreateDT;
