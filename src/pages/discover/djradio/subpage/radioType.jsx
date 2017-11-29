import React from 'react';
import { Link } from 'react-router';
import Loading from '../../../../components/loading';



function RadioType(props){
    let datas = props.datas;
    //console.log(datas);
    return (
        <div className="rd_type">
            <div className="rd_type_hd c_title clearfix">
                <h3 className="fl"><Link target="_blank" to={`/discover/djradio/category?id=${datas.typeId}`} className="title">{datas.title}</Link> · 电台</h3>
                <Link to={`/discover/djradio/category?id=${datas.typeId}`} className="more fr" >更多&nbsp;&gt;</Link>
            </div>

                {
                    !datas.data.length
                    ?<div className="loading_state"><Loading size="small"/></div>
                    :<ul className="rd_typelist clearfix">
                            {
                                datas.data.map((item)=>{
                                        return(
                                            <li key={item.id}>
                                                <Link className="avatar" to={`/djradio?id=${item.id}`}>
                                                    <img src={item.picUrl+'?param=120y120'} alt="img" />
                                                </Link>
                                                <div className="info">
                                                    <h4><Link to={`/djradio?id=${item.id}`}>{item.name}</Link></h4>
                                                    <p>{item.rcmdtext}</p>
                                                </div>
                                            </li>
                                        );
                                    })
                            }
                        </ul>
                }

        </div>
    );
}
// function RadioType(){
//     return (
//         <div className="rd_type">
//             <div className="rd_type_hd c_title clearfix">
//                 <h3 className="fl"><a className="title" href="#">音乐故事</a> · 电台</h3>
//                 <a className="more fr" href="#">更多&nbsp;&gt;</a>
//             </div>
//             <ul className="rd_type_list clearfix">
//                 <li>
//                     <a className="avatar" href="#">
//                         <img src="http://p1.music.126.net/S9t4DhG1Xhu_7gvs80pIGA==/18984167765431940.jpg?param=200y200" />
//                     </a>
//                     <div className="info">
//                         <h4><a href="#">林非的唱片私藏馆</a></h4>
//                         <p>DJ林非跟你分享他的两万张老唱片</p>
//                     </div>
//                 </li>
//                 <li>
//                     <a className="avatar" href="#">
//                         <img src="http://p1.music.126.net/S9t4DhG1Xhu_7gvs80pIGA==/18984167765431940.jpg?param=200y200" />
//                     </a>
//                     <div className="info">
//                         <h4><a href="#">林非的唱片私藏馆</a></h4>
//                         <p>DJ林非跟你分享他的两万张老唱片</p>
//                     </div>
//                 </li>
//                 <li>
//                     <a className="avatar" href="#">
//                         <img src="http://p1.music.126.net/S9t4DhG1Xhu_7gvs80pIGA==/18984167765431940.jpg?param=200y200" />
//                     </a>
//                     <div className="info">
//                         <h4><a href="#">林非的唱片私藏馆</a></h4>
//                         <p>DJ林非跟你分享他的两万张老唱片</p>
//                     </div>
//                 </li>
//                 <li>
//                     <a className="avatar" href="#">
//                         <img src="http://p1.music.126.net/S9t4DhG1Xhu_7gvs80pIGA==/18984167765431940.jpg?param=200y200" />
//                     </a>
//                     <div className="info">
//                         <h4><a href="#">林非的唱片私藏馆</a></h4>
//                         <p>DJ林非跟你分享他的两万张老唱片</p>
//                     </div>
//                 </li>
//             </ul>
//         </div>
//     );
// }


export default RadioType;
