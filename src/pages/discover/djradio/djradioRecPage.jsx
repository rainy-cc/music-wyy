/*
    推荐节目详情列表
        router： /discover/djradio/recommend
*/

import React from 'react';
import {getDjRecProgram} from '../../../axios/djradio';
import RecList from '../../../components/discover/djradio/recList';
import Loading from '../../../components/loading.jsx';

class DJRecommendPage extends React.Component {
    constructor(){
        super();
        this.state = {
            recData:[] //存放推荐节目的数据
        };
    }

    componentDidMount(){
        this.getData();
    }
    //加载该页的数据,取50条
    getData(){
        getDjRecProgram(0,50)
        .then(res =>{
            if(res.data.code == 200){
                //console.log(res.data.programs);
                this.setState({
                    recData: res.data.programs
                });
            }
        });
    }
    render(){
        const data = this.state.recData;
        return(
            <div className="g_main djradio">
                <div className="dj_wrap g_wrap">
                    <div className="c_title clearfix">
                        <h3 className="fl"><span className="title" href="#">推荐节目</span></h3>
                    </div>
                    {
                        !data.length?
                            <div style={{paddingTop: '200px'}}><Loading size="small" /></div>:
                            <RecList data={data}  />
                    }

                </div>
            </div>
        );
    }
}

export default DJRecommendPage;
