import React from 'react';
import {Router,browserHistory} from 'react-router';

import App from '../App';

const routeConfig = [
    {
        path:"/",
        component: App,
        indexRoute:{
            getComponent(location,callback){
                require.ensure([], (require)=> {
                  callback(null, require('../pages/discover/recommend/recommend').default);
              },'Recommend');
            }
        },
        childRoutes:[
            {
                path: 'friend',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../components/friend/friend').default);
                  },'FriendPart');
                }
            },
            {
                path: 'mymusic',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../components/myMusic/myMusic').default);
                  },'Mymusic');
                }
            },
            {
                path: 'discover/toplist',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/toplist/toplist').default);
                  },'TopList');
                }
            },
            {
                path: 'discover/playlist',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/playlist/playList').default);
                  },'PlayList');
                }
            },
            {
                path: 'discover/album',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/album/album').default);
                  },'Album');
                }
            },
            {
                path: 'discover/artist',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/singer/singer').default);
                  },'Singer');
                },
                indexRoute: {
                    getComponent(location,callback){
                        require.ensure([], (require)=> {
                          callback(null, require('../pages/discover/singer/subpage/recSingers').default);
                      },'RecSingers');
                    }
                 },
                childRoutes: [
                    {
                        path: '/discover/artist/signed',
                        getComponent(location,callback){
                            require.ensure([], (require)=> {
                              callback(null, require('../pages/discover/singer/subpage/signedSingers').default);
                          },'SignedSingers');
                        }
                    },
                    {
                        path: '/discover/artist/cat',
                        getComponent(location,callback){
                            require.ensure([], (require)=> {
                              callback(null, require('../pages/discover/singer/subpage/typeSingers').default);
                          },'TypeSingers');
                        }
                    }
                ]
            },
            {
                path: 'discover/djradio',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/djradio/djradio').default);
                  },'DJradio');
                }
            },
            {
                path: '/discover/djradio/recommend',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/djradio/djradioRecPage').default);
                  },'DJRecommendPage');
                }
            },
            {
                path: '/discover/djradio/rank',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/djradio/djradioRankPage').default);
                  },'DJRankPage');
                }
            },
            {
                path: '/discover/djradio/category',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/discover/djradio/djCategoryPage').default);
                  },'DJCategoryPage');
                }
            },
            {
                path: 'playlist',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/playlistdetail/playlistPage').default);
                  },'PlayListPage');
                }
            },
            {
                path: 'album',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/albumdetail/albumdetail').default);
                  },'AlbumDetailPage');
                }
            },
            {
                path: 'artist',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/artistdetail/artistDetail').default);
                  },'ArtistDatail');
                },
                indexRoute:{
                    getComponent(location,callback){
                        require.ensure([], (require)=> {
                          callback(null, require('../pages/artistdetail/subpage/songs').default);
                      },'SongsPanel');
                    }
                },
                childRoutes:[
                    {
                        path: 'album',
                        getComponent(location,callback){
                            require.ensure([], (require)=> {
                              callback(null, require('../pages/artistdetail/subpage/album').default);
                          },'AlbumPanel');
                        }
                    },
                    {
                        path: 'mvs',
                        getComponent(location,callback){
                            require.ensure([], (require)=> {
                              callback(null, require('../pages/artistdetail/subpage/mv').default);
                          },'MvPanel');
                        }
                    },
                    {
                        path: 'desc',
                        getComponent(location,callback){
                            require.ensure([], (require)=> {
                              callback(null, require('../pages/artistdetail/subpage/desc').default);
                          },'SingerIntroPanel');
                        }
                    }
                ]
            },
            {
                path: 'song',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/song/songPage').default);
                  },'SongPage');
                }
            },
            {
                path: 'mv',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/mv/mvPage').default);
                  },'MvPage');
                }
            },
            {
                path: 'program',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/djProgram/djprogram').default);
                  },'DJProgramPage');
                }
            },
            {
                path: 'djradio',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/djetail/djradioDatail').default);
                  },'DJradioDetailPage');
                }
            },
            {
                path: 'user/home',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/userhome/userhome').default);
                  },'UserHome');
                }
            },
            {
                path:'search',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/search/searchPage').default);
                  },'SearchPage');
                }
            },
            {
                path: '*',
                getComponent(location,callback){
                    require.ensure([], (require)=> {
                      callback(null, require('../pages/404/notFound').default);
                  },'NotFound');
                }
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
