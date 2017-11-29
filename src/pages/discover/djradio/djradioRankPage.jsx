/*
    节目排行榜页面
        router： /discover/djradio/rank
*/

import React from 'react';
import {getDjTopProgram} from '../../../axios/djradio';
import RankList from '../../../components/discover/djradio/rankList';
import Loading from '../../../components/loading.jsx';
class DJRankPage extends React.Component {

    constructor(){
        super();
        this.state = {
            rankData:[] //存放推荐节目的数据
        };
    }

    componentDidMount(){
        this.getData();

    }
    //加载该页的数据,取50条
    getData(){
        getDjTopProgram(0,100)
        .then(res =>{
            if(res.data.code ==200){
                console.log(res.data.toplist);
                this.setState({
                    rankData: res.data.toplist
                });
            }
        });
    }

    render(){
        const data = this.state.rankData;
        return(
            <div className="g_main djradio">
                <div className="dj_wrap g_wrap">
                    <div className="c_title clearfix">
                        <h3 className="fl"><span className="title" href="#">节目排行榜</span></h3>
                    </div>
                    {
                        !data.length?
                            <div style={{paddingTop: '200px'}}><Loading size="small" /></div>:
                            <RankList data={data} />
                    }
                </div>
            </div>
        );
    }
}

export default DJRankPage;
