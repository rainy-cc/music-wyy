/*
    页面的一些基本常量
 */
 const playMode = {
     single: 0, //顺序播放+
     loop: 1, //循环播放
     random: 2 //随机播放
 };

//歌单页面的分类
 const categories = [
 	{
 		type:'语种',
 		className:'icon icon_yz',
 		category:['华语','欧美','日语','韩语','粤语','小语种']
 	},
 	{
 		type:'风格',
 		className:'icon icon_fg',
 		category:['流行','摇滚','民谣','电子','舞曲','说唱','轻音乐','爵士','乡村','R&B/Soul','古典','民族','英伦','金属','朋克','蓝调','雷鬼','世界音乐','拉丁','另类/独立','New Age','古风','后摇','Bossa Nova']
 	},
 	{
 		type:'场景',
 		className:'icon icon_cj',
 		category:['清晨','夜晚','学习','工作','午休','下午茶','地铁','驾车','运动','旅行','散步','酒吧']
 	},
 	{
 		type:'情感',
 		className:'icon icon_qg',
 		category:['怀旧','清新','浪漫','性感','伤感','治愈','放松','孤独','感动','兴奋','快乐','安静','思念']
 	},
 	{
 		type:'主题',
 		className:'icon icon_zt',
 		category:['影视原声','ACG','校园','游戏','70后','80后','90后','网络歌曲','KTV','经典','翻唱','吉他','钢琴','器乐','儿童','榜单','00后']
 	}
 ];
//歌手页面导航
const singerTypes = [
     {
         id: 1001,
         title: '华语男歌手'
     }, {
         id: 1002,
         title: '华语女歌手'
     }, {
         id: 1003,
         title: '华语组合/乐队'
     }, {
         id: 2001,
         title: '欧美男歌手'
     }, {
         id: 2002,
         title: '欧美女歌手'
     },{
         id: 2003,
         title: '欧美组合/乐队'
     }, {
         id: 6001,
         title: '日本男歌手'
     }, {
         id: 6002,
         title: '日本女歌手'
     }, {
         id: 6003,
         title: '日本组合/乐队'
     }, {
         id: 7001,
         title: '韩国男歌手'
     }, {
         id: 7002,
         title: '韩国女歌手'
     }, {
         id: 7003,
         title: '韩国组合/乐队'
     }, {
         id: 4001,
         title: '其他男歌手'
     }, {
         id: 4002,
         title: '其他女歌手'
     }, {
         id: 4003,
         title: '其他组合/乐队'
     }

 ];
//左侧导航
 const singerNav = [
 	{
 		title:'华语',
 		types:[
 			{id:1001,title:'华语男歌手'},
 			{id:1002,title:'华语女歌手'},
 			{id:1003,title:'华语组合/乐队'}
 		]
 	},
 	{
 		title:'欧美',
 		types:[
 			{id:2001,title:'欧美男歌手'},
 			{id:2002,title:'欧美女歌手'},
 			{id:2003,title:'欧美组合/乐队'}
 		]
 	},
 	{
 		title:'日本',
 		types:[
 			{id:6001,title:'日本男歌手'},
 			{id:6002,title:'日本女歌手'},
 			{id:6003,title:'日本组合/乐队'}
 		]
 	},
 	{
 		title:'韩国',
 		types:[
 			{id:7001,title:'韩国男歌手'},
 			{id:7002,title:'韩国女歌手'},
 			{id:7003,title:'韩国组合/乐队'}
 		]
 	},
 	{
 		title:'其他',
 		types:[
 			{id:4001,title:'其他男歌手'},
 			{id:4002,title:'其他女歌手'},
 			{id:4003,title:'其他组合/乐队'}
 		]
 	}
 ];

 const daCategories = [
     {
         typeId:2,
         title:'音乐故事',
         data:[]
     },
     {
         typeId:6,
         title:'美文读物',
         data:[]
     },
     {
         typeId:5,
         title:'脱口秀',
         data:[]
     },
     {
         typeId:3,
         title:'情感调频',
         data:[]
     },
     {
         typeId:2001,
         title:'创作|翻唱',
         data:[]
     },
     {
         typeId:11,
         title:'人文历史',
         data:[]
     },
 ];

 export {playMode,categories, singerTypes, singerNav, daCategories};
