/*
    歌词搜索结果 type 1006
 */

import React from 'react';
import { changeDuration} from '../../../utils/dateFormat.js';

class SchLyric extends React.Component {
    constructor(){
        super();
        this.state = {
            moreLrc: false,
        };
    }
    changeState(){
        let moreLrc = this.state.moreLrc;
        this.setState({
            moreLrc: !moreLrc
        });
    }
    render(){
        return(
            <div>
                <ul className="lyric_list sch_song_list">
                    {
                        this.props.data.songs.length?
                        this.props.data.songs.map(item=>{
                            //console.log(item.lyrics);
                            return(
                                <li key={item.id}>
                                    <div className="info item clearfix">
                                        <div className="column">
                                            <a className="play" href="javascript:;"></a>
                                        </div>
                                        <div className="column w370">
                                            <a className="name overhide" href="#">{item.name}</a>
                                            <i className="icon_mv"></i>
                                        </div>
                                        <div className="column w79">
                                            <div className="t_btns clearfix">
                                                <a className="t_btn add" href="javascript:;"></a>
                                                <a className="t_btn value" href="javascript:;"></a>
                                                <a className="t_btn share" href="javascript:;"></a>
                                                <a className="t_btn download" href="javascript:;"></a>
                                            </div>
                                        </div>
                                        <div className="column w130 overhide">
                                            <a href="#">{item.artists[0].name}</a>
                                        </div>
                                        <div className="column w160 overhide">
                                            <a href="#">《{item.album.name}》</a>
                                        </div>
                                        <div className="column fr">
                                            <span>{changeDuration(item.duration)}</span>
                                        </div>
                                    </div>
                                    <div className="lyric">
                                        <div>
                                            {
                                                item.lyrics.length?
                                                item.lyrics.map((item,index)=>{
                                                    return(
                                                        <p key={index} className={index>=4 && !this.state.moreLrc?'lrc_line lrc_linehide':'lrc_line'} dangerouslySetInnerHTML={{__html: item}}></p>
                                                    )
                                                }):
                                                null
                                            }

                                        </div>
                                        <div className="ctrl">
                                            <a onClick={this.changeState.bind(this)}  href="javascript:;">{this.state.moreLrc?<span>收起</span>:<span>展开</span>}<i className={this.state.moreLrc?'arrow arrow_up':'arrow'}></i></a>

                                        </div>

                                    </div>
                                </li>
                            )
                        }):
                        null
                    }
                </ul>
            </div>
        );
    }
}

export default SchLyric;
