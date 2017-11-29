{(searchSuggest&&searchSuggest.order)?(<div style={{display:isSuggestListShow?'block':'none' }} className="search_list">
    <p className="title"><Link to={`/search?s=${this.state.keywords}&type=1`}>搜索"{this.state.keywords}"相关用户</Link>&nbsp;&gt;</p>
    <div className="type">
        {
            searchSuggest.order.length?searchSuggest.order.map((item,index)=>{
                //console.log('log',item,searchSuggest[item]);
                return (
                    <div className="item" key={index}>
                        <h5><i className="icon icon_music"></i>{searchSuggestTitle[item]}</h5>
                        <ul className="list">
                            {
                                (searchSuggest[item]&&searchSuggest[item].length)?
                                searchSuggest[item].map(item=>{
                                    //console.log('detail',item);
                                    return(
                                        <li key={item.id} className="overhide">
                                            {/* <a href="#">{item.name}-<span>周杰伦</span></a> */}
                                            {
                                                item.artists&&item.artists.length?(<a href="#" dangerouslySetInnerHTML={{
                                                    __html: this.createMarkup(item.name,keywords)+'-'+this.createMarkup(this.concatName(item.artists),keywords)
                                                }}></a>):(<a href="#" dangerouslySetInnerHTML={{
                                                    __html: this.createMarkup(item.name,keywords)
                                                }}></a>)
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
