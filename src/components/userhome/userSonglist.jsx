/*
    用户的歌单
*/
import React from 'react';
import {Link} from 'react-router';
import ImgBox from '../../components/ImgBox';

function UserSonglist(props){
    return(
        <div className="uh_songlist">
            <div className="uh_title">
                <h3>{props.nickname}{props.action}的歌单（&nbsp;{props.data.length}&nbsp;）</h3>
            </div>
            <ul className="uh_sllist clearfix">
                {
                    props.data.map(item=>{
                        return(
                            <li key={item.id}>
                                <ImgBox changeList={props.changePlaylist} id={item.id} src={item.coverImgUrl+'?param=140y140'} playCount={item.playCount<100000?item.playCount:(Math.round(parseInt(item.playCount/10000,10))+'万')} />
                                <p className="desc overhide">
                                    <Link href={`/playlist?id=${item.id}`}>{item.name}</Link>
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}


export default UserSonglist;
