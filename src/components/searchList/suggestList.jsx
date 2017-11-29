/**
 * 搜索建议下拉列表
 */
import React from 'react';
import {Link} from 'react-router';

class SearchSuggestList extends React.Component{
    constructor(){
        super();
        this.state={
            searchSuggestTitle:{
                songs: {
                    title: '歌曲',
                    link: '/song'
                },
                mvs:{
                    title: 'MV',
                    link: '/mv'
                } ,
                artists: {
                    title: '歌手',
                    link: '/artist'
                } ,
                playlists: {
                    title: '歌单',
                    link: '/playlist'
                },
                albums: {
                    title: '专辑',
                    link: '/album'
                }
            }
        };
        this.createMarkup = this.createMarkup.bind(this);
    }
    //拼接歌手名称
    concatName(artists){
        return artists.map(itemArt=>{
            return itemArt.name;
        }).join(' ');
    }
    //替换字体
    createMarkup(str,keywords){
        let html = '';
        if(str.indexOf(keywords)!==-1){
            html=str.split(keywords).join(`<span class="keywords">${keywords}</span>`);
        }else{
            html=str;
        }
        return html;
    }
    render(){
        let searchSuggest = this.props.searchSuggest;
        let keywords = this.props.keywords;
        let searchSuggestTitle = this.state.searchSuggestTitle;
        return(
            <div>
                {(searchSuggest&&searchSuggest.order)?(<div className="search_list">
                    <p className="title"><Link to={`/search?s=${this.state.keywords}&type=1`}>搜索"{keywords}"相关用户</Link>&nbsp;&gt;</p>
                    <div className="type">
                        {
                            searchSuggest.order.length?searchSuggest.order.map((item,index)=>{
                                //console.log('log',item,searchSuggest[item]);
                                return (
                                    <div className="item" key={index}>
                                        <h5><i className="icon icon_music"></i>{searchSuggestTitle[item].title}</h5>
                                        <ul className="list">
                                            {
                                                (searchSuggest[item]&&searchSuggest[item].length)?
                                                searchSuggest[item].map(i=>{
                                                    //console.log('detail',item);
                                                    return(
                                                        <li key={i.id} className="overhide">
                                                            {/* <a href="#">{item.name}-<span>周杰伦</span></a> */}
                                                            {
                                                                i.artists&&i.artists.length?(<Link to={`${searchSuggestTitle[item].link}?id=${i.id}`} dangerouslySetInnerHTML={{
                                                                    __html: this.createMarkup(i.name,keywords)+'-'+this.createMarkup(this.concatName(i.artists),keywords)
                                                                }}></Link>):(<Link to={`${searchSuggestTitle[item].link}?id=${i.id}`} dangerouslySetInnerHTML={{
                                                                    __html: this.createMarkup(i.name,keywords)
                                                                }}></Link>)
                                                            }
                                                        </li>
                                                    );
                                                }):null
                                            }
                                        </ul>
                                    </div>
                                );
                            }):null
                        }

                    </div>
                </div>):null}
            </div>
        );
    }
}

export default SearchSuggestList;
