import React from 'react';
import { Link }  from 'react-router';
import Loading from '../../../../components/loading';


class RadioNav extends React.Component{
    constructor(props){
        super();
        this.state = {
            nowIndex : 0,
        };
        this.changeIndex = this.changeIndex.bind(this);
    }
    changeIndex(index){
        if(index < 0) {
            index = 0;
        }
        if(index > 1) {
            index = 1;
        }
        this.setState({
            nowIndex:index
        })
    }
    render(){
        let listEle1,listEle2;
        let navData1 = this.props.navData1;
        let navData2 = this.props.navData2;
        let nowIndex = this.state.nowIndex;
        let nowId = this.props.nowId;
        if(!navData1 || !navData2 ){
            return <div className="loading_state"><Loading size="small"/></div>;
        }
        listEle1 = navData1.map(item => {
            return(
                <li key={item.id}>
                    <Link className={nowId == item.id?'nav_item nav_item_active':'nav_item'} to={`/discover/djradio/category?id=${item.id}`}>
                        <div style={{backgroundImage: `url(${item.picWebUrl})`}} className="navicon"></div>
                        <span>{item.name}</span>
                    </Link>
                </li>
            );
        });
        listEle2 =navData2.map(item => {
            return(
                <li key={item.id}>
                    <Link className={nowId == item.id?'nav_item nav_item_active':'nav_item'} to={`/discover/djradio/category?id=${item.id}`}>
                        <div style={{backgroundImage: `url(${item.picWebUrl})`}} className="navicon"></div>
                        <span>{item.name}</span>
                    </Link>
                </li>
            );
        });
        return(
            <div className="rd_nav">
                <div className="rd_navwrap">
                    <ul className="rd_navlist clearfix"  style={{display:nowIndex===0?'block': 'none'}}>
                        {/* <li>
                            <a className="nav_item" href="#">
                                <div className="icon"></div>
                                <span>{}</span>
                            </a>
                        </li> */}
                        {
                            listEle1
                        }

                    </ul>
                    <ul className="rd_navlist clearfix" style={{display:nowIndex===1?'block': 'none'}}>
                        {
                            listEle2
                        }
                    </ul>
                    <div className="dots">
                        <span  onClick={e=>{this.changeIndex(0)}} className={'dot ' + (nowIndex===0?'active': '')}></span>
                        <span onClick={e=>{this.changeIndex(1)}} className={'dot ' + (nowIndex===1?'active': '')}></span>
                    </div>
                    <a onClick={e=>{this.changeIndex(0)}} className="arrow arrow_l" href="javascript:;" style={{opacity:nowIndex===0?'0.2': '1'}}></a>
                    <a onClick={e=>{this.changeIndex(1)}} className="arrow arrow_r" href="javascript:;" style={{opacity:nowIndex===1?'0.2': '1'}}></a>
                </div>
            </div>
        );
    }
}


export default RadioNav;
