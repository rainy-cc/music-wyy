import React from 'react';
import {Link} from 'react-router';

import ImgBox from '../../../../components/ImgBox.jsx';
//import Loading from '../../../../components/loading.jsx';
function PlayListContent(props){
    let datas= props.datas;
    let listEle = datas.map(item=>{
        return(
            <li key={item.id}>
                <ImgBox changeList={props.changeList} id={item.id} src={item.coverImgUrl+'?param=140y140'} playCount={item.playCount<100000?item.playCount:(Math.round(parseInt(item.playCount/10000,10))+'万')} />
                <p className="desc overhide">
                    <Link title={item.name} href={`/playlist?id=${item.id}`}>{item.name}</Link>
                </p>
                <p className="author_info">
                    <span className="by">by </span>
                    <Link title={item.creator.nickname} className="author_name overhide" to={`/user/home?id=${item.userId}`}>{item.creator.nickname}&nbsp;</Link>
                    {item.creator.authStatus?<i className="icon"></i>:(item.creator.expertTags?<i className="icon icon_star"></i>:null)}
                </p>
            </li>
        );
    });
    return(
        <ul className="pl_list clearfix">
            {
                listEle
            }
        </ul>
    );
}

export default PlayListContent;
