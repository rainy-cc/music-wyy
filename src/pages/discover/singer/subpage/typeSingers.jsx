/*
    歌手分类列表
*/
import React from 'react';
import axios from 'axios';

import SgInitialList from '../../../../components/singer/sgInitialList';
import SgImageWrap from '../../../../components/discover/singer/imagesWrap';
import Loading from '../../../../components/loading';
import { singerTypes } from '../../../../utils/config';

let ascii = []; //存放A-Z的ascii值

for (var i = 65; i < 91; i++) {
    ascii.push(String.fromCharCode(i));
}

//console.log(ascii); //A-Z

class TypeSingers extends React.Component {
    constructor() {
        super();
        this.state = {
            artists: null,
            nowType: singerTypes[0],
            nowInitial: -1,
            nowId:''
        };
        this.changeInitial=this.changeInitial.bind(this);
        //this.getType = this.getType.bind(this);
    }
    componentDidMount() {
        let id = this.props.location.query.id; //拿到地址栏中的参数
        let initial = this.props.location.query.initial; //拿到initial b不存在默认为-1
        if (initial === undefined) {
            initial = -1;
        }
        let type = this.getType(id)[0];
        //console.log(type);
        this.setState({
            nowType: type,
            nowInitial: initial
        });
        this.getData(id, initial);
    }
    //页面接收到的id值发生变化时  获取新的数据
    componentWillReceiveProps(nextProps) {
        if (this.props.location == nextProps.location) {
            return;
        }
        console.log("componentWillReceiveProps");
        //console.log('页面地址变化了 ');
        let id = nextProps.location.query.id,
            initial = nextProps.location.query.initial;
        if (initial === undefined) {
            initial = -1;
        }
        let type = this.getType(id)[0];
        //console.log(type);
        this.setState({
            artists: null,
            nowType: type,
            nowInitial: initial
        });
        this.getData(id, initial);
    }
    //changeIntial,传给子集改变负极的回调
    changeInitial(initial){
        this.setState({
            nowInitial: initial
        });
    }
    //根据id值拿到type类型
    getType(id){
        return singerTypes.filter(item=>{
            return item.id == id;
        });
    }
    //获取歌手分类数据
    getData(id = 5001, initial = -1) {
        axios.get('/artists/list', {
            params: {
                cat: id,
                initial: initial,
                offset: 0,
                limit: 100
            }
        }).then(res => {
            //console.log(res.data.artists);
            this.setState({artists: res.data.artists});
        });
    }
    render() {
        //console.log("render");
        return (
            <div className="sg_ctx">
                <div className="c_title">
                    <h3 className="fl">{this.state.nowType.title}</h3>
                </div>
                <SgInitialList id={this.state.nowType.id} ascii={ascii} changeInitial={this.changeInitial} initial={this.state.nowInitial}/>
                <div className="sg_list_wrap">
                    {
                        this.state.artists?
                        <SgImageWrap divideLine={true} datas={this.state.artists}/>
                        :<div  style={{paddingTop: '150px'}}><Loading size="small"  /></div>
                    }

                </div>
            </div>
        );
    }
}

export default TypeSingers;
