/*
    新碟上架
*/
import React from 'react';
import {Link} from 'react-router';
import Loading from '../../loading';
import RecommendContentHeader from './recCtxHeader';

class RecDiscPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            nowIndex: 1,
            isTransition: true
        };
    }

    changeIndex(index) {
        if (!this.state.isTransition) {
            return false;
        }
        this.setState({nowIndex: index});
        //干掉transition，此处设置的是1s 当回到第一页的时候 将该页设置成第三页
        if (index <= 0) {
            setTimeout(() => {
                this.setState({nowIndex: 2, isTransition: false});
            }, 1000);
        } else if (index >= 3) {
            setTimeout(() => {
                this.setState({nowIndex: 1, isTransition: false});
            }, 1000);
        }
        setTimeout(() => {
            this.setState({isTransition: true});
        }, 1050);
    }

    render() {
        const data = this.props.data;
        const nowIndex = this.state.nowIndex;
        const isTransition = this.state.isTransition;
        if (!data.length) {
            return <div className="loading_state"><Loading size="small"/></div>
        }
        let group = [
            data.slice(0, 5),
            data.slice(5, 10),
            data.slice(0, 5),
            data.slice(5, 10)
        ];

        return (
            <div className="rec_new_disc">
                <RecommendContentHeader title="新碟上架" isShowNav={false} linkUrl='/discover/album'/>
                <div className="rec_disc_ctx">
                    <div className="rec_disc_carousel">
                        <a onClick={e => {
                            this.changeIndex(nowIndex - 1)
                        }} className="arrow_btn arrow_btn_l" href="javascript:;"></a>
                        <div className="rec_disc_wrap">
                            {group.map((groupItem, index) => {
                                return (
                                    <ul style={{
                                        left: index == nowIndex
                                            ? '0'
                                            : index < nowIndex
                                                ? '-645px'
                                                : '645px',
                                        transition: isTransition
                                            ? 'left 1s'
                                            : 'none'
                                    }} key={index} className="rec_disc_list clearfix">
                                        {groupItem.map(item => {
                                            return (
                                                <li key={item.id}>
                                                    <div className="disc_img">
                                                        <Link to={`/album?id=${item.id}`}>
                                                            <img src={item.picUrl}/>
                                                        </Link>
                                                        <a className="play_icon" href="javascript:;"></a>
                                                    </div>
                                                    <p className="overhide">
                                                        <Link style={{color: '#000'}} to={`/album?id=${item.id}`}>{item.name}</Link>
                                                    </p>
                                                    <p className="overhide">
                                                        <Link className="name" to={`/artist?id=${item.artist.id}`}>{item.artist.name}</Link>
                                                    </p>
                                                </li>
                                            );
                                        })
}
                                    </ul>
                                );
                            })
}

                        </div>
                        <a onClick={e => {this.changeIndex(nowIndex + 1)}} className="arrow_btn arrow_btn_r" href="javascript:;"></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecDiscPanel;
