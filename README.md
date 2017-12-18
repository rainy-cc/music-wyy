# music-wyy
使用react+redux构建的网易云首页，个人学习交流作品
技术：`react`+`react-router@2.8`+`redux`+`react-redux`+`webpack`+`axios`  
## 在线访问
[React——网易云音乐](http://music.rainycc.com)  
推荐使用chrome浏览器  
## 项目运行
```shell
$ git clone git@github.com:ForeverCc/music-wyy.git
$ npm install
$ npm start
```
浏览器访问localhost：3000（推荐使用chrome浏览器）
### 完成页面
1. 首页 /
2. 排行榜页面 /discover/toplist
3. 歌单页面 /discover/playlist
4. 歌手页面 /discover/artist
5. 电台页面 /discover/djradio
6. 电台分类页面 /discover/djradio/category
7. 电台推荐页面 /discover/djradio/recommend
8. 电台排行页面 /discover/djradio/rank
9. 专辑页面 /discover/album
10. 歌单详情页面 /playlist
11. 歌手详情页面 /artist
12. 电台详情页面 /djradio
13. 专辑详情页面 /album
14. 电台节目详情页面 /program
15. mv页面 /mv
16. 单曲详情页面 /song
17. 我的音乐页面 /mymusic
18. 朋友页面 /friend

### 页面播放器功能
1. 播放模式切换，支持随机，循环，单曲三种模式
2. 前进后退切换功能
3. 音量大小控制
4. 歌曲进度控制
5. 本地存储功能locastorage

### 项目说明与总结
此网易云音乐项目为个人学习练手项目，使用官方脚手架create-react-app快速搭建，使用react进行UI构建，redux进行状态管理（主要运用在播放器的相关功能上），通过该项目进一步了解react全家桶的使用，页面需要进一步改善，一些bug还需要解决，欢迎各位前端大佬批评指正，也欢迎各位喜欢react的小伙伴一起交流学习;
