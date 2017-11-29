import React from 'react';
import { Link } from 'react-router';
import { getSingersMv } from '../../../axios/singer';
import Pagination from '../../../components/pagination';
import Loading from '../../../components/loading';
class MvPanel extends React.Component {

    constructor(){
        super();
        this.state = {
            mvData: null,
            mvTotal:0,
            currentPage: 1
        };
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount(){
        let id = this.props.location.query.id;
        this.getSingerMvData(id);

    }
    pageChange(currentPage,pageSize){
        //console.log('pageSize:'+ pageSize,'currentPage:'+currentPage);
        let id = this.props.location.query.id;
        let page = currentPage-1;
        this.setState({
            mvData:null,
            currentPage:currentPage
        });
        this.getSingerMvData(id,page);
    }
    //获取歌手mv数据，传入歌手id
    getSingerMvData(id,page=0){
        getSingersMv(id,page)
            .then(response=>{
                //console.log(response.data.mvs);
                this.setState({
                    mvData: response.data.mvs,
                    mvTotal: response.data.size
                });
                window.scrollTo(0,0);
            })
            .catch(error=>{
                console.log('请求歌手相关MV数据失败',error);
            });
    }

    render(){
        //mv数据未加载到
        if(!this.state.mvData){
            return(
                <div>
                    <Loading size="small" />
                </div>
            );
        }
        return(
            <div>
                {
                    this.state.mvData.length?
                    <ul className="mvlist clearfix">
                        {
                            this.state.mvData.map(item=>{
                                return(
                                    <li key={item.id}>
                                        <div>
                                            <Link className="bg"  to={`/mv?id=${item.id}`}>
                                                <img src={item.imgurl+'?param=137y103'}/>
                                                <i className="icon icon_play"></i>
                                            </Link>
                                        </div>
                                        <p className="mvname overhide">
                                            <Link to={`/mv?id=${item.id}`}>{item.name}</Link>
                                        </p>
                                    </li>
                                );
                            })
                        }

                    </ul>:
                    <div style={{paddingTop:'20px',textAlign:'center',fontSize: '20px'}}>抱歉，暂无Mv</div>
                }

                {
                    this.state.mvTotal>12?<div style={{paddingTop: '20px'}}>
                        <Pagination currentPage={this.state.currentPage} onChange={this.pageChange} total={this.state.mvTotal} pageSize={12} />
                    </div>:null
                }

            </div>

        );
    }
}

export default MvPanel;
