/*
    歌手页面首字母排序
        传递给父组件要查询的参数initial
*/
import React from 'react';
import {Link} from 'react-router';

class SgInitialList extends React.Component {
    change(initial){
        this.props.changeInitial(initial);
    }
    render(){
        let ascii = this.props.ascii;
        let id = this.props.id;
        let lisEle = ascii.map((item,index)=>{
            return (
                <li key={index} onClick={ev=>{this.change(item.charCodeAt())}}>
                    <Link to={`/discover/artist/cat?id=${id}&initial=${item.charCodeAt()}`} activeClassName="active">{item}</Link>
                </li>
            );
        });
        return(
            <ul className="sg_Initial_list clearfix">
                <li>
                    <Link onClick={ev=>{this.change(-1)}} to={`/discover/artist/cat?id=${id}&initial=-1`} className={ (this.props.initial == -1?'zh active':'zh')}>热门</Link>
                </li>
                {
                    lisEle
                }
                <li>
                    <Link onClick={ev=>{this.change(0)}} to={`/discover/artist/cat?id=${id}&initial=0`} className="zh" activeClassName="active">其他</Link>
                </li>

            </ul>
        );
    }
}
export default SgInitialList;
