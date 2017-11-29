/*
    首页的baner图组件
        由于banner接口的参数不明，所以数据自己简单mock了一下；
 */
import React from 'react';

import {bannerApi} from '../../axios/banner';
import CarouselImg from './carousel';

import '../../static/css/banner.css';

class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            bannersData: bannerApi,
            nowIndex: 0 //当前第几张
        };
        this.timer = null; //挂载定时器
    }
    componentDidMount() {
        this.autoPlay(); //自动播放
    }
    //点击改变索引值
    setIndex(index) {
        var len = this.state.bannersData.length > 0
            ? this.state.bannersData.length
            : 8;
        if (index < 0) {
            index = len - 1;
        }
        if (index > len - 1) {
            index = 0;
        }
        this.setState({nowIndex: index});
    }
    changeIndex(index) {
        //this.setIndex(this.state.nowIndex-1);
        var len = this.state.bannersData.length > 0
            ? this.state.bannersData.length
            : 6;
        if (index < 0) {
            index = len - 1;
        }
        if (index > len - 1) {
            index = 0;
        }
        this.setState({nowIndex: index});
    }
    clearTimer() {
        clearInterval(this.timer);
    }
    //自动播放
    autoPlay() {
        clearInterval(this.timer);
        var len = this.state.bannersData.length > 0
            ? this.state.bannersData.length
            : 6;
        this.timer = setInterval(() => {
            let nowIndex = this.state.nowIndex;
            if (nowIndex >= len - 1) {
                this.setState({nowIndex: 0});
            } else {
                this.setState({
                    nowIndex: nowIndex + 1
                });
            }
        }, 3500);

    }
    //组件卸载清楚定时器
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        /*
            由于自己写的数据，没有异步请求过程，但还是进行判断一下
         */
        let bannerArea = null, //存放jsx元素
            dotList = null,
            bannersData = this.state.bannersData,
            nowIndex = this.state.nowIndex;
        /*
                数据没请求成功 显示Loading状态
                */
        if (!bannersData.length) {
            bannerArea = (
                <div>Loading</div>
            );
        } else {
            //数据接口url有空存在，处理一下
            bannerArea = bannersData.map((item, index) => {
                return <CarouselImg key={index} src={item.picUrl} isActive={nowIndex === index
                    ?'active':''} href={item.linkUrl} alt='carousel_img'/>;
            });
            dotList = bannersData.map((item, index) => {
                return (
                    <span onClick={() => {
                        this.changeIndex(index);
                    }} key={index} className={nowIndex === index
                        ? 'active'
                        : ''}></span>
                );
            });
        }
        var bgStyle = `url(${bannersData[nowIndex].bgUrl}) repeat-x`;
        return (
            <div id="banner" onMouseOut={this.autoPlay.bind(this)} onMouseOver={this.clearTimer.bind(this)} style={{
                background: bgStyle
            }}>
                <div className="bn_wrap">
                    <div className="bn_carousel">
                        <div className="bn_c_wrap">
                            {bannerArea}
                        </div>
                        {/*map一下*/}
                        <div className="bn_car_dots">
                            {dotList}
                        </div>
                    </div>
                    {/*左右箭头*/}
                    <a onClick={() => {
                        this.changeIndex(nowIndex - 1);
                    }} className="bn_btn bn_btn_l" href="javascript:;"></a>
                    <a onClick={() => {
                        this.changeIndex(nowIndex + 1);
                    }} className="bn_btn bn_btn_r" href="javascript:;"></a>
                    <div className="bn_download">
                        <a className="bn_download_btn" href="javascript:;">下载客户端</a>
                        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
