/*
    新碟上架
*/
import React from 'react';
import {Link} from 'react-router';
import {move} from '../../../utils/move';
import Loading from '../../loading';
import RecommendContentHeader from './recCtxHeader';

class RecDiscPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            nowIndex: 1,
        };
        this.isMoving = true;
    }

    changeIndex(index) {
        if(this.isMoving){
            this.isMoving = false;
            this.setState({
                nowIndex: index
            },()=>{
                move(this.roller,{left:-index * 645},1000,'easeOut',()=>{
                    if(index == 3){
                        this.setState({
                            nowIndex: 1
                        });
                        this.roller.style.left = '-645px';
                    }else if(index == 0){
                        this.setState({
                            nowIndex: 2
                        });
                        this.roller.style.left = '-1290px';
                    }
                    this.isMoving = true;

                });
            });
        }


    }

    render() {
        const data = this.props.data;
        const playAlbum = this.props.playAlbum;
        const nowIndex = this.state.nowIndex;
        if (!data.length) {
            return <div className="loading_state" style={{padding:'30px 0'}}><Loading size="small"/></div>
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
                <div ref= {obj =>this.lalal = obj} className="rec_disc_ctx">
                    <div className="rec_disc_carousel">
                        <a onClick={e => {
                            this.changeIndex(nowIndex - 1)
                        }} className="arrow_btn arrow_btn_l" href="javascript:;"></a>
                        <div className="rec_disc_wrap">
                            <div className="carousel" ref={roll =>this.roller = roll}>
                                {
                                    group.map((groupItem, index) => {
                                    return (
                                        <ul key={index} className="rec_disc_list clearfix">
                                            {
                                                groupItem.map(item => {
                                                return (
                                                        <li key={item.id}>
                                                            <div className="disc_img">
                                                                <Link to={`/album?id=${item.id}`}>
                                                                    <img src={item.picUrl+'?param=100y100'}/>
                                                                </Link>
                                                                <a onClick={ev=>{playAlbum(item.id)}} className="play_icon" href="javascript:;"></a>
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
                        </div>
                        <a onClick={e => {this.changeIndex(nowIndex + 1)}} className="arrow_btn arrow_btn_r" href="javascript:;"></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecDiscPanel;
