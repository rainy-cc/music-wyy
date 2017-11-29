import React from 'react';
import { getSingerIntro } from '../../../axios/singer';

class SingerIntroPanel extends React.Component {

    constructor(){
        super();
        this.state = {
            introData: null
        };
    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getSingerIntroData(id);
    }
    //获取歌手描述，传入歌手id
    getSingerIntroData(id){
        getSingerIntro(id)
            .then(res=>{
                //console.log(res.data);
                this.setState({
                        introData: res.data
                });
                window.scrollTo(0,0);
            });
    }

    render(){
        if(!this.state.introData){
            return(
                <div style={{lineHeight: '30px', fontSize: '14px',marginTop: '20px'}}>
                    暂无该歌手相关介绍
                </div>
            );
        }
        return(
            <div className="intro">
                <h2 style={{borderLeft: '3px solid #c10d0c',paddingLeft:'6px'}}>歌手简介</h2>
                <p className="indent">{this.state.introData.briefDesc}</p>
                {
                    this.state.introData.introduction.map((item,index)=>{
                        return(
                            <div key={index}>
        						<h2>{item.ti}</h2>
        						<p
        						dangerouslySetInnerHTML={{__html:item.txt.replace(/\n/g,'<br />')}}
        						></p>
        					</div>
                        );
                    })
                }
            </div>
        );
    }
}

export default SingerIntroPanel;
