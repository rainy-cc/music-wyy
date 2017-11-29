/*
    搜索到的歌手结果组件
 */
import React from 'react';
import SgImgBox from '../../../components/discover/singer/sgImgBox';

class SchSingger extends React.Component {
    render(){
        return(
            <div className="sch_singer_result">
                <ul className="sch_singer_list clearfix">
                    {
                        this.props.data.artists.map(item=>{
                            return(
                                <li key={item.id}>
                                    <SgImgBox   id={item.id} img1v1Url={item.img1v1Url} name={item.name} accountId={item.accountId}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default SchSingger;
