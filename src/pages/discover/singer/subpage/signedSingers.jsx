/*
    入驻歌手页面 SignedSingers
*/

import React from 'react';
import {getSingers} from '../../../../axios/singer';

import SgImgBox from '../../../../components/discover/singer/sgImgBox';

import Loading from '../../../../components/loading';

class SignedSingers extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 0, //加载第几页的数据
            signedSingers:null, //存放入驻歌手的信息列表
            loadMore: false
        };
    }

    componentDidMount(){
        this.getData(); //加载第一页的数据
    }
    //获取入驻歌手信息
    getData(){
        getSingers(5001,66)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    signedSingers: res.data.artists
                });
            })
            .catch(error=>{
                console.log('获取入驻歌手信息数据失败',error);
            });
    }

    render(){
        let data = this.state.signedSingers;

        return(
            <div className="sg_ctx">
                <div className="c_title">
                    <h3 className="fl">入驻歌手</h3>
                </div>
                <div className="sg_list_wrap">
                    {
                        !data?
                            <div style={{paddingTop: '150px'}}><Loading size="small" /></div>:
                            <ul className="sg_list clearfix">
                                {data.map((item)=>{
                                    return(<li key={item.id}>
                                        <SgImgBox img1v1Url={item.img1v1Url} name={item.name} accountId={item.accountId}  />
                                    </li>);
                                })}
                            </ul>
                    }

                </div>

            </div>
        );
    }
}

export default SignedSingers;
