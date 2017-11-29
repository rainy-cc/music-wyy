 import React from 'react';
import {Link} from 'react-router';
 import SgImgBox from './sgImgBox';

 class SgImageWrap extends React.Component {

     render(){
         let datas = this.props.datas;
         let divideLine = this.props.divideLine;
         if(!datas) return(<div>加载中</div>);
         let listEle;
         listEle = datas.map((item,index)=>{
             if(index<10){
                 return(
                     <li key={item.id} className={divideLine?(index<5?'':'line'):''}>
                         {/* <div className="avatar">
                             <a href="#">
                                 <img src={item.img1v1Url} />
                             </a>
                         </div>
                         <p className="name">
                             <a className="" href="#">{item.name}</a>
                             {item.accountId?<a href="#" ><i className="icon"></i></a>:null}
                         </p> */}
                         <SgImgBox id={item.id} img1v1Url={item.img1v1Url} name={item.name} accountId={item.accountId}  />
                     </li>
                 );
             }else{
                 return(
                     <li key={item.id} className="no_avatar">
                         <Link className="name overhide" to={`/artist?id=${item.id}`}>{item.name}</Link>
                         {item.accountId?<Link className="icon" to={`/user/home?id=${item.accountId}`} ></Link>:null}
                     </li>
                 );
             }

         });
         return(
             <ul className="sg_list clearfix">


                 {
                     listEle
                 }
             </ul>
         );
     }
 }

export default SgImageWrap;
