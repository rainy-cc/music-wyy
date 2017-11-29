/*
    发现音乐的导航
*/

import React from 'react';
import {Link,IndexLink} from 'react-router';

let arrNav = ['推荐','排行榜','歌单','主播电台','歌手','新碟上架'];
let linkPath = ['/','/discover/toplist','/discover/playlist','/discover/djradio','/discover/artist','/discover/album'];

function HeaderSubNav(){
    return(
        <div className="hd_nav2">
            <div className="hd_nav2_wrap">
                <ul className="hd_nav2_list">
                    {
                        arrNav.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <IndexLink activeClassName="active" to={linkPath[index]}><span className="">{arrNav[index]}</span></IndexLink>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

// class HeaderNav2 extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             nowActiveIndex:0
//         };
//     }
//     componentDidMount(){
//         let pathname = this.props.pathname;
//         //console.log(pathname);
//         let nowIndex;
//         if(pathname ==='/'){
//             nowIndex =0;
//         }
//         for(var i=0;i<linkPath.length;i++){
//             if(pathname.indexOf(linkPath[i])!==-1){
//                 nowIndex = i;
//             }
//         }
//         //console.log(nowIndex);
//         this.setState({
//             nowActiveIndex:nowIndex
//         });
//     }
//     //点击切换当前处于active状态的nav
//     changeNowIndex(index){
//         this.setState({
//             nowActiveIndex:index
//         });
//     }
//     render() {
//         const nowActiveIndex = this.state.nowActiveIndex;
//         let navList = arrNav.map((item,index)=>{
//             return (<li key={index} onClick={()=>{this.changeNowIndex(index)}}>
//                 <Link to={linkPath[index]}><span className={index===nowActiveIndex?'active':''}>{item}</span></Link>
//             </li>);
//         });
//         return (
//             <div className="hd_nav2">
//                 <div className="hd_nav2_wrap">
//                     <ul className="hd_nav2_list">
//                         <li>
//                             <IndexLink activeClassName="active" to="/"><span className="">推荐</span></IndexLink>
//                         </li>
//                         <li>
//                             <IndexLink activeClassName="active" to="/discover/toplist"><span>排行榜</span></IndexLink>
//                         </li>
//                         <li>
//                             <IndexLink activeClassName="active" to="/discover/playlist"><span>歌单</span></IndexLink>
//                         </li>
//                         <li>
//                             <IndexLink activeClassName="active" to="/discover/djradio"><span>主播电台</span></IndexLink>
//                         </li>
//                         <li>
//                             <IndexLink activeClassName="active" to="/discover/artist"><span>歌手</span></IndexLink>
//                         </li>
//                         <li>
//                             <IndexLink activeClassName="active" to="/discover/album"><span>新碟上架</span></IndexLink>
//                         </li>
//                         {/* {navList} */}
//                     </ul>
//                 </div>
//             </div>
//         );
//     }
// }

export default HeaderSubNav;
