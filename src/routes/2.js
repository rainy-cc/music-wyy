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

const routeConfig = [
    {
        path:"/",
        component: App,
        indexRoute: {component: Recommend},
        childRoutes:[
            {
                path: 'friend',
                component:FriendPart
            },
            {
                path: 'mymusic',
                component: Mymusic
            },
            {
                path: 'discover/toplist',
                component: TopList
            },
            {
                path: 'discover/playlist',
                component: PlayList
            },
            {
                path: 'discover/album',
                component: Album
            },
            {
                path: 'discover/artist',
                component: Singer,
                indexRoute: {component: RecSingers },
                childRoutes: [
                    {
                        path: '/discover/artist/signed',
                        component: SignedSingers
                    },
                    {
                        path: '/discover/artist/cat',
                        component: TypeSingers
                    }
                ]
            },
            {
                path: 'discover/djradio',
                component: DJradio
            },
            {
                path: '/discover/djradio/recommend',
                component: DJRecommendPage
            },
            {
                path: '/discover/djradio/rank',
                component: DJRankPage
            },
            {
                path: '/discover/djradio/category',
                component: DJCategoryPage
            },
            {
                path: 'playlist',
                component: PlayListPage
            },
            {
                path: 'album',
                component: AlbumDetailPage
            },
            {
                path: 'artist',
                component: ArtistDatail,
                indexRoute:{component:SongsPanel},
                childRoutes:[
                    {
                        path: 'album',
                        component: AlbumPanel
                    },
                    {
                        path: 'mvs',
                        component: MvPanel
                    },
                    {
                        path: 'desc',
                        component: SingerIntroPanel
                    }
                ]
            },
            {
                path: 'song',
                component: SongPage
            },
            {
                path: 'mv',
                component: MvPage
            },
            {
                path: 'program',
                component: DJProgramPage
            },
            {
                path: 'djradio',
                component: DJradioDetailPage
            },
            {
                path: 'user/home',
                component: UserHome
            },
            {
                path:'search',
                component:SearchPage
            },
            {
                path: '*',
                component: NotFound
            },

        ]
    }
];
class AppRouter extends React.Component {
    render() {
        return (
            <Router routes={routeConfig} history={browserHistory}> </Router>
         );
    }
}

export default AppRouter;
