/*
    页面底部的播放功能组件
*/

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actions';
import localStorageFn from '../utils/localStore';
import {playMode}  from '../utils/config';
import {changeDuration}  from '../utils/dateFormat';
import {getRandomIndex}  from '../utils/util';
import { scrollFn }  from '../utils/dom.js';
import '../static/css/playbar.css';

class PlayBar extends React.Component {

    constructor(){
        super();
        this.state = {
            modeClass:[
                {
                    className:'icon single',
                    title: '单曲循环'
                },
                {
                    className:'icon loop',
                    title: '循环播放'
                },
                {
                    className:'icon random',
                    title: '随机播放'
                }
            ],
            panelState: false, //是否显示播放列表panel
            volbarState: false,//是否显示音量面板
            volumn:50, //音量
            volumnBtnPosy:36, //音量控制按钮的位置
            volumnHeight:46, // 音量条的高度
            currentTime: 0,//当前播放进度、时间
            percent:0 //播放进度条长度,
        };
        this.changePlayState = this.changePlayState.bind(this);
        this.changePlayMode = this.changePlayMode.bind(this);
        this.clearList = this.clearList.bind(this);
        this.deleteSelectedSong = this.deleteSelectedSong.bind(this);
        this.playSelectedSong = this.playSelectedSong.bind(this);
        this.musicPlay = this.musicPlay.bind(this);
        this.musicPause = this.musicPause.bind(this);
        this.end = this.end.bind(this);
    }

    componentDidMount(){
        let list = localStorageFn.getItem('playlist');
        let curMusic = localStorageFn.getItem('currentMusic');
        let mode = localStorageFn.getItem('playMode');

        this.props.actions.changePlayMode(Number(mode));
        //从本地存储中读取歌单列表和播放歌曲
        if(list){
            this.props.actions.changePlaylist(JSON.parse(list));
        }
        if(curMusic){
            this.props.actions.changeCurrentMusic(JSON.parse(curMusic));
        }
        this.oAudio.ontimeupdate = (ev)=>{
            let percent = ev.target.duration?ev.target.currentTime/ev.target.duration*100+'%':0;
            this.setState({
                currentTime:ev.target.currentTime,
                percent:percent
            });
        };

        //点击空白处 隐藏音量面板
        document.onclick= (ev)=>{
            this.setState({
                //panelState: false, //是否显示播放列表panel
                volbarState: false,//是否显示音量面板
            });
        };
    }
    //组件更新完成后判断当前播放状态来决定播放状态
    componentDidUpdate(prevProps,prevState){
        const lastPlayState = prevProps.playState;
        const nowPlayState = this.props.playState;
        const prevMusic = prevProps.currentMusic;
        const curMusic = this.props.currentMusic;
        //优化
        if(prevMusic==curMusic&&nowPlayState==lastPlayState){
            return false;
        }

        if(nowPlayState && curMusic.url ){
            this.musicPlay();
        }else{
            this.musicPause();
        }
    }
    componentWillUnmount(){
        document.onclick=null;
    }
    //点击修改播放状态
    changePlayState(){
        let isPlaying = this.props.playState;
        this.props.actions.changePlayState(!isPlaying);
    }

    //播放所选歌曲
    playSelectedSong(index){
        let playlist = this.props.playlist;
        let id;
        //是否是电台节目
        if(playlist[index].radio){
            id = playlist[index].mainSong.id;
        }
        else{
            id = playlist[index].id;
        }
        //let id = playlist[index].id;
        this.props.actions.changeMusicAsync(id,index);
    }
    //切换歌曲上一首 下一首
    playToggle(dir){
        let index = this.props.currentMusic.index;
        let playlist = this.props.playlist;
        let mode = this.props.playMode;
        if(playlist.length == 0){
            return;
        }
        //如果当前列表就一首歌
        if(playlist.length == 1){
            this.singlePlay();
            return;
        }
        //随机播放模式
        if(mode == playMode.random){
            this.randomPlay();
            return;
        }
        if(dir == -1){
            index -=1;
            index = index< 0?playlist.length-1:index;
        }else if (dir ==1) {
            index+=1;
            index=index >= playlist.length?0:index;
        }
        let id = playlist[index].id;
        this.props.actions.changeMusicAsync(id,index);
    }
    //歌曲播放结束
    end(){
        let mode = this.props.playMode;
        if(mode == playMode.single){
            //单曲循环模式
            this.singlePlay();
        }else if(mode == playMode.random){
            //随机播放模式
            this.randomPlay();
        }else{
            this.playToggle(1);
        }
    }
    //单曲循环
    singlePlay(){
        this.oAudio.currentTime = 0;
        this.oAudio.play();
        this.props.actions.changePlayState(true);
    }
    //随机播放
    randomPlay(){
        let playlist = this.props.playlist;
        let len = playlist.length;
        let index = getRandomIndex(0,len-1);
        this.props.actions.changeMusicAsync(playlist[index].id,index);
    }

    //从列表中移除选择的歌曲，如果当前播放歌曲和删除的索引一样，则下一首播放
    deleteSelectedSong(index){
        let playState = this.props.playState;
        let currentMusic = this.props.currentMusic;
        let playlist = this.props.playlist;
        this.props.actions.removeSong(index);
        //下一个首播放
        if(currentMusic.index == index){
            playlist[index+1] && this.props.actions.changeMusicAsync(playlist[index+1].id,index);
        }
    }
    //清空歌单列表(传递给子组件)
    clearList(){
        this.props.actions.changePlaylist([]);
    }
    //点击修改播放模式 单曲 循环 还是随机
    changePlayMode(){
        let mode = this.props.playMode;
        if(mode >= 2){
            mode=0;
        }else{
            mode++;
        }
        this.props.actions.changePlayMode(mode);
        localStorageFn.setItem('playMode',mode);
    }
    //改变
    changePanelState(){
        let bool = this.state.panelState;
        this.setState({
            panelState: !bool
        });
    }
    hidePanel(bool){
        this.setState({
            panelState: bool
        });
    }
    changeVolbarState(){
        let bool = this.state.volbarState;
        this.setState({
            volbarState: !bool
        });
    }
    //控制音量大小
    changeVolumn(value){
        this.oAudio.volume = value/100;
        this.setState({
            volume:value
        });
    }
    //点击切换进度条
    clickChangeProgressBar(ev){
        let curMusic = this.props.currentMusic;
        let posX = ev.clientX;
        let posLeft = parseInt(this.progress.getBoundingClientRect().left);
        let dis = posX - posLeft;
        this.curProgress.style.width = dis + 'px';
        if(curMusic.info){
            this.oAudio.currentTime = this.oAudio.duration* dis/this.progress.clientWidth;
        }
    }
    progressDrag(ev){
        let curMusic = this.props.currentMusic;
        var _this = this;  //this的指向
        var disX = ev.clientX - _this.progressBtn.offsetLeft;
        document.onmousemove  = function (ev) {
            //_this.oAudio.pause();
            var left = ev.clientX - disX;
            //console.log(top);
            if(left<=0){
                left=0;
            }
            if(left>=_this.progress.clientWidth){
                left=_this.progress.clientWidth;
            }
            _this.curProgress.style.width = left + 'px';
            //修改当前歌曲的时间
            //修改当前歌曲的时间
            // if(curMusic.info){
            //     _this.oAudio.currentTime = _this.oAudio.duration* left/_this.progress.clientWidth;
            // }
        };
        document.onmouseup = function () {
            if(curMusic.info){
                _this.oAudio.currentTime = _this.oAudio.duration* _this.curProgress.offsetWidth/_this.progress.clientWidth;
            }
            document.onmousemove = null;
            document.onmouseup = null;
        };
        ev.preventDefault();
    }

    volumnDrag(ev){
        var _this = this;  //this的指向
        var disY = ev.clientY - _this.volumnBtn.offsetTop;
        _this.volumnContainer.onmousemove = function (ev) {
            var top = ev.clientY - disY;
            //console.log(top);
            if(top<=-10){
                top=-10;
            }
            if(top>=_this.volumnBox.clientHeight-10){
                top=_this.volumnBox.clientHeight-10;
            }
            _this.setState({
                volumnBtnPosy: top,
                volumnHeight:_this.volumnBox.clientHeight - top -10
            });
            _this.oAudio.volume = (_this.volumnBox.clientHeight - top -10)/100;

        };
        document.onmouseup = function () {
            _this.volumnContainer.onmousemove = null;
            document.onmouseup = null;
        };
        ev.preventDefault();
    }
    //音乐播放
    musicPlay(){
        if(this.oAudio){
            this.oAudio.play();
        }
    }
    //音乐暂停
    musicPause(){
        if(this.oAudio){
            this.oAudio.pause();
        }
    }
    render(){
        let playState = this.props.playState;
        let currentMusic = this.props.currentMusic;
        let mode = this.props.playMode;
        let modeClass = this.state.modeClass;

        let picUrl='';
        if(currentMusic.info){
            if(currentMusic.info.al){
                picUrl=currentMusic.info.al.picUrl;
            }else if(currentMusic.info.album){
                picUrl=currentMusic.info.album.picUrl;
            }else if(currentMusic.info.coverUrl){
                picUrl=currentMusic.info.coverUrl;
            }
        }else{
            picUrl = 'http://s4.music.126.net/style/web2/img/default/default_album.jpg';
        }

        return(
            <div id="playbar" className="playbar">
                <div className="lock_bg">
                    <div className="lock">
                        <i className="icon_lock"></i>
                    </div>
                    <div className="bg"></div>
                </div>
                <div className="playbar_bg">
                    <div className="playbar_wrap">
                        <div className="pb_btns fl">
                            <a onClick={ev=>{this.playToggle(-1)}} className="prev" href="javascript:;">上一首</a>
                            <a onClick={this.changePlayState} className={playState?'play control':'pause control'} href="javascript:;">暂停</a>
                            <a onClick={ev=>{this.playToggle(1)}} className="next"  href="javascript:;">下一首</a>
                        </div>
                        <div className="pb_avatar fl">
                            <a href="javascript:;">
                                <img src={picUrl+'?param=34y34'} alt="" />
                            </a>
                        </div>
                        <div className="pb_progress fl">
                            {
                                currentMusic.info?
                                <div className="info">
                                    {
                                        currentMusic.info.radio?
                                        <Link className="name overhide fl" to={`/program?id=${currentMusic.info.id}`}>{currentMusic.info.name}</Link>:
                                        <Link className="name overhide fl" to={`/song?id=${currentMusic.info.id}`}>{currentMusic.info.name}</Link>
                                    }
                                    {
                                        currentMusic.info.mv?
                                            <Link className="mv fl" title="MV" to={`/mv?id=${currentMusic.info.mv}`}></Link>:
                                            null
                                    }
                                    {
                                        currentMusic.info.radio?<Link className="nickname fl" to={`/djradio?id=${currentMusic.info.radio.id}`}>{currentMusic.info.radio.name}</Link>:
                                        <Link className="nickname fl" to={currentMusic.info.ar?`/artist?id=${currentMusic.info.ar[0].id}`:`/artist?id=${currentMusic.info.artists[0].id}`}>{currentMusic.info.ar?currentMusic.info.ar[0].name:currentMusic.info.artists[0].name}</Link>
                                    }
                                </div>:
                                <div className="info"></div>
                            }
                            {/* <div className="info">
                                {
                                        currentMusic.info?
                                        <Link className="name overhide fl" to={`/song?id=${currentMusic.info.id}`}>{currentMusic.info.name}</Link>:
                                        null
                                }

                                {
                                    currentMusic.info && currentMusic.info.mv?
                                        <Link className="mv fl" title="MV" to={`/mv?id=${currentMusic.info.mv}`}></Link>:
                                        null
                                }
                                {
                                    currentMusic.info?
                                    <Link className="nickname fl" to={currentMusic.info.ar?`/artist?id=${currentMusic.info.ar[0].id}`:`/artist?id=${currentMusic.info.artists[0].id}`}>{currentMusic.info.ar?currentMusic.info.ar[0].name:currentMusic.info.artists[0].name}</Link>:
                                    null
                                }
                            </div> */}
                            <div className="progress" onClick={ev=>this.clickChangeProgressBar(ev)} ref={p=>this.progress=p}>
                                <div className="pro_bg">
                                    <div style={{width: this.state.percent}} ref={cur=>this.curProgress=cur} className="current">
                                        <span ref={btn=>this.progressBtn=btn} onMouseDown={ev=>{this.progressDrag(ev)}} className="point_btn"></span>
                                    </div>
                                </div>
                                <span className="time">
                                    <em>{changeDuration(this.state.currentTime*1000)}</em> / {currentMusic.info?changeDuration(currentMusic.info.dt || currentMusic.info.duration ):'00:00'}
                                </span>
                            </div>
                        </div>
                        <div className="pb_operation fl">
                            <a className="icon add" title="收藏" href="javascript:;">收藏</a>
                            <a className="icon share" title="分享" href="javascript:;">分享</a>
                        </div>
                        <div className="pb_control fl">
                            <a onClick={ev=>{this.changeVolbarState();ev.nativeEvent.stopImmediatePropagation() }} className="icon volume" title="音量" href="javascript:;">音量</a>
                            <a onClick={this.changePlayMode} className={modeClass[mode].className} title={modeClass[mode].title} href="javascript:;">模式</a>
                            <div className="list_btn fl" onClick={this.changePanelState.bind(this)}>
                                <div className="tip"></div>
                                <span className="num">{this.props.playlist.length}</span>
                            </div>
                            <div ref={(con)=>{this.volumnContainer = con;}} onClick={ev=>ev.nativeEvent.stopImmediatePropagation()} className="vol_bar" style={{display: this.state.volbarState?'block': 'none'}}>
                                    <div ref={(box)=>{this.volumnBox = box;}} className="vol_total">
                                        <div style={{height: this.state.volumnHeight+'px'}} className="vol_current"></div>
                                        <span ref={(btn)=>{this.volumnBtn = btn;}} onMouseDown={ev=>{
                                            this.volumnDrag(ev);
                                        }} className="ctrl_btn"
                                        style={{top: this.state.volumnBtnPosy+'px'}}></span>
                                    </div>
                            </div>

                        </div>
                    </div>

                    {
                        this.state.panelState?
                        <PlayPanel
                            currentMusic={this.props.currentMusic}
                            currentTime={this.state.currentTime} deleteSelectedSong={this.deleteSelectedSong}
                            playSelectedSong={this.playSelectedSong}
                            clearList={this.clearList}
                            playlist={this.props.playlist}
                            hidePanel={this.hidePanel.bind(this)} />:null
                    }
                </div>
                <audio src={this.props.currentMusic.url || ''} ref={(audio)=>{this.oAudio = audio;}} onEnded={this.end} id="m_audio"></audio>
            </div>
        );
    }
}

class PlayPanel extends React.Component {
    constructor(){
        super();
        this.state = {
            currentLrcLine:0 //当前第几行歌词
        };
    }
    componentDidMount(){
        this.scrollMove();
    }
    componentWillReceiveProps(nextProps) {
        const lrc = this.props.currentMusic.lrc
        if(!lrc.length){
            //歌词不存在
            return;
        }
        //解决切换歌曲时歌词不归0的bug
        if(nextProps.currentTime == 0){
            this.setState({
                currentLrcLine:0
            });
        } else {
            lrc.forEach((item,index) => {
                if(nextProps.currentTime >= item.time/1000) {
                    this.setState({
                        currentLrcLine:index
                    });
                }
            });
        }

    }

    playSong(ev,index){
        //如果没点击到a 或 i标签
        //console.log(/[^ai]/.test(ev.target.tagName.toLowerCase()));
        if(/[^ai]/.test(ev.target.tagName.toLowerCase())){
          this.props.playSelectedSong(index);
        }
    }

    componentDidUpdate(prevProps,prevState){
        this.scrollMove();
    }
    //列表和歌词滚动
    scrollMove(){
        if(this.props.playlist.length){

            let barWrap = this.barWrap;
            let scrollbar = this.bar;
            let scrollCon = this.scrollCon;
            let conWrap = this.conWrap;
            scrollFn(conWrap,scrollCon,barWrap,scrollbar);
        }
        if(this.props.currentMusic.lrc.length){
            let lrcbarWrap = this.lrcbarWrap;
            let lrcbar = this.lrcbar;
            let lrcCon = this.lrcCon;
            let lrcWrap = this.lrcWrap;
            scrollFn(lrcWrap,lrcCon,lrcbarWrap,lrcbar);
        }
    }
    change(){
        this.props.hidePanel(false);
    }

    render(){
        return (
            <div className="panel">
                <div className="panel_hd">
                    <div className="panel_hdwrap">
                        <h4>播放列表<span>({this.props.playlist.length || 0})</span></h4>
                        <a className="value_all"><i className="icon icon_value"></i>收藏全部</a>
                        <span className="line"></span>
                        <a onClick={this.props.clearList} className="clear_all" href="javascript:;"><i className="icon icon_clear"></i>清除</a>
                        <p className="name overhide">{this.props.currentMusic.info&&this.props.currentMusic.info.name}</p>
                        <span className="close" onClick={this.change.bind(this)}>close</span>
                    </div>
                </div>
                <div className="panel_bd">
                    <div ref={conWrap=>this.conWrap = conWrap} className="panel_list">
                        {
                            !this.props.playlist.length ?
                                <div className="no_content">
                                    <p><i className="icon_listen"></i>你还没有添加任何歌曲</p>
                                    <p>去首页<a href="#">发现音乐</a>&nbsp;，或在<a href="#">我的音乐</a>收听自己收藏的歌单。</p>
                                </div> :
                                <ul ref={scrollCon =>this.scrollCon=scrollCon} className="slist">
                                    {
                                        this.props.playlist.map((item,index)=>{
                                            return (
                                                <li key={item.id} className={this.props.currentMusic.index ==index?'active':''} onClick={ev=>{this.playSong(ev,index)}}>
                                                    <div className="col1 col">
                                                        <div className="play" style={{display:this.props.currentMusic.index ==index?'block':'none'}}></div>
                                                    </div>
                                                    <div className="col2 col overhide">{item.name}</div>
                                                    <div className="col3 col">
                                                        <div className="icons_wrap clearfix">
                                                            <i className="icon icon_value" title="收藏"></i>
                                                            <i className="icon icon_share" title="分享"></i>
                                                            <i className="icon icon_download" title="下载"></i>
                                                            <i onClick={e=>{
                                                                this.props.deleteSelectedSong(index)
                                                            }} className="icon icon_delete" title="删除"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col4 col overhide">
                                                        {
                                                            item.radio?<Link to={`/djradio?id=${item.radio.id}`}>{item.radio.name}</Link>:
                                                            <Link to={`/artist?id=${item.ar?item.ar[0].id: item.artists[0].id}`}>{item.ar?item.ar[0].name: item.artists[0].name}</Link>
                                                        }
                                                        {/* <Link to={`/artist?id=${item.ar?item.ar[0].id: item.artists[0].id}`}>{item.ar?item.ar[0].name: item.artists[0].name}</Link> */}
                                                    </div>
                                                    <div className="col5 col">{item.dt?changeDuration(item.dt):changeDuration(item.duration)}</div>
                                                    <div className="col6 col"><a href="#"></a></div>
                                                </li>
                                            );
                                        })
                                    }

                                </ul>
                        }
                    </div>
                    <div ref={barWrap=>this.barWrap=barWrap} className="scrollbar">
                        {this.props.playlist.length?<span ref={bar=>this.bar=bar}></span>:null}
                    </div>
                    <div className="lrc" ref={l=>{this.lrcWrap=l}}>
                        <div className="lrc_wrap" ref={con=>{this.lrcCon=con}} style={{top:this.state.currentLrcLine<=3?'0':`${-(this.state.currentLrcLine*32)+96}px`}}>
                            {
                                this.props.currentMusic.lrc.length?
                                    this.props.currentMusic.lrc.map((item,index)=>{
                                        return(
                                            <p key={index} className={this.state.currentLrcLine==index?'lrc_item active':'lrc_item'}>{item.txt==''?' ':item.txt}</p>
                                        );
                                    }):
                                    <p style={{paddingTop:'85px'}} className="lrc_item">抱歉，当前歌曲暂时没有歌词</p>
                            }
                        </div>


                    </div>
                    <div ref={barWrap=>this.lrcbarWrap=barWrap}  className="scrollbar scrollbar1">
                        <span ref={bar=>this.lrcbar=bar}></span>
                    </div>
                </div>
            </div>
        );
    }
}


function matchStateToProps(state){
    return {
        playlist: state.playlist,
        currentMusic: state.currentMusic,
        playMode:state.playMode,
        playState:state.playState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(PlayBar);
