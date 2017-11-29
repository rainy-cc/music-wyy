/*热门推荐*/
import React from 'react';
import { Link } from 'react-router';
import Loading from '../../loading';
import RecommendContentHeader from './recCtxHeader';



class RecommendHotPanel extends React.Component {

    render(){
        let data = this.props.data;
        let playPlayist = this.props.playPlayist;
        let playProgram = this.props.playProgram;
        let recHotList;
        if(!data.length){
            recHotList = <div className="loading_state"><Loading size="small" /></div>;
        }else{
            recHotList = data.map((item,index)=>{
                return (<ImgBoxItem playPlayist={playPlayist} playProgram={playProgram} key={item.id} data={item} />);
            });
        }

        return (
            <div className="rec_hot">
                <RecommendContentHeader isShowNav={true} title={'热门推荐'} linkUrl='/discover/playlist'/>
                <ul className="rec_hot_list clearfix">
                    {recHotList}
                </ul>
            </div>
        );
    }
}

/*
    热门推荐单个 img box
*/


function ImgBoxItem(props){
    let data = props.data;
    let playPlayist = props.playPlayist;
    let playProgram = props.playProgram;
    return(
        <li className="rec_hot_item">
            <div className="image_box">
                <Link to={data.program?`/program?id=${data.id}`:`/playlist?id=${data.id}`}><img src={data.picUrl+'?param=140y140'} /></Link>
                <div className="info">
                    <i className="icon_earphone"></i>
                    <span className="num">{data.playCount?(Math.round(parseInt(data.playCount/10000,10))+'万'):parseInt(data.program.adjustedPlayCount)}</span>
                    <a onClick={data.program?ev=>{playProgram(data.program)}:ev=>{playPlayist(data.id)}} className="play_icon" href="javascript:;"></a>
                </div>
            </div>
            <p className="desc">
                <Link  to={data.program?`/program?id=${data.id}`:`/playlist?id=${data.id}`}>{data.program?<i className="icon_dtjm"></i>:null}{data.name}</Link>
            </p>
        </li>
    );
}

export default RecommendHotPanel;
