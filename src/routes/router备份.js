import React from 'react';
import {Router, Route,browserHistory, IndexRoute} from 'react-router';

import App from '../App';
import Recommend from '../pages/discover/recommend/recommend';
import FriendPart from '../components/friend/friend';
import Mymusic from '../components/myMusic/myMusic';
import TopList from '../pages/discover/toplist/toplist';

import DJradio from '../pages/discover/djradio/djradio';
import DJRecommendPage from '../pages/discover/djradio/djradioRecPage';
import DJRankPage from '../pages/discover/djradio/djradioRankPage';
import DJCategoryPage from '../pages/discover/djradio/djCategoryPage';
import DJradioDetailPage from '../pages/djetail/djradioDatail';
import DJProgramPage from '../pages/djProgram/djprogram';

import PlayList from '../pages/discover/playlist/playList';
import Singer from '../pages/discover/singer/singer';
import Album from '../pages/discover/album/album';//新碟上架页面
import AlbumDetailPage from '../pages/albumdetail/albumdetail'; //新碟详情页
import RecSingers from '../pages/discover/singer/subpage/recSingers';//推荐歌手
import SignedSingers from '../pages/discover/singer/subpage/signedSingers'; //入驻歌手
import TypeSingers from '../pages/discover/singer/subpage/typeSingers';

import ArtistDatail from '../pages/artistdetail/artistDetail'; //歌手详情页
import MvPanel from '../pages/artistdetail/subpage/mv';
import SingerIntroPanel from '../pages/artistdetail/subpage/desc';
import AlbumPanel from '../pages/artistdetail/subpage/album';
import SongsPanel from '../pages/artistdetail/subpage/songs';

import SearchPage from '../pages/search/searchPage';

import NotFound from '../pages/404/notFound';


import PlayListPage from '../pages/playlistdetail/playlistPage';
import UserHome from '../pages/userhome/userhome'; //网易用户主页

import MvPage from '../pages/mv/mvPage'; //mv播放页面
import SongPage from '../pages/song/songPage'; //mv播放页面
// const routeConfig = [
//     {
//         path:"/",
//         components: App
//     }
// ];

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Recommend}></IndexRoute>
                    <Route path="friend" component={FriendPart}></Route>
                    <Route path="mymusic" component={Mymusic}></Route>
                    {/* <Route path="discover" component={Recommend}></Route> */}
                    <Route path="discover/toplist" component={TopList}></Route>
                    <Route path="discover/djradio" component={DJradio}>
                    </Route>
                    <Route path="/discover/djradio/recommend" component={DJRecommendPage}>
                    </Route>
                    <Route path="/discover/djradio/rank" component={DJRankPage}>
                    </Route>
                    <Route path="/discover/djradio/category" component={DJCategoryPage}>
                    </Route>
                    <Route path="djradio" component={DJradioDetailPage}>
                    </Route>
                    <Route path="program" component={DJProgramPage}>
                    </Route>
                    {/* <Route path></Route> */}
                    <Route path="discover/playlist" component={PlayList}></Route>
                    <Route path="discover/artist" component={Singer}>
                        <IndexRoute component={RecSingers}></IndexRoute>
                        <Route path="/discover/artist/signed" component={SignedSingers}></Route>
                        <Route path="/discover/artist/cat" component={TypeSingers}></Route>
                        {/* <Route path="123" component={RecSingers}></Route> */}
                    </Route>
                    <Route path="discover/album" component={Album}></Route>
                    <Route path="album" component={AlbumDetailPage}></Route>
                    <Route path="playlist" component={PlayListPage}></Route>
                    <Route path="user/home" component={UserHome}></Route>
                    <Route path="artist" component={ArtistDatail}>
                        <IndexRoute component={SongsPanel}></IndexRoute>
                        <Route path="album" component={AlbumPanel}></Route>
                        <Route path="mvs" component={MvPanel}></Route>
                        <Route path="desc" component={SingerIntroPanel}></Route>
                    </Route>
                    <Route path="mv" component={MvPage}></Route>
                    <Route path="song" component={SongPage}></Route>
                    <Route path="search" component={SearchPage}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Route>
            </Router>
        );
    }
}
export default AppRouter;
