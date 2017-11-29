import React from 'react';

function ToplistNav(props){
    let {fList,gList,nowId} = props
    return(
        <div className="tl_l_ctx">
            <h2>云音乐特色榜</h2>
            <ul className="tl_list">
                {
                    fList.map((item)=>{
                        return(
                            <li className={item.id == nowId?'active':''} key={item.id} onClick={ev=>{
                                props.change(item.id);
                            }}>
                                <div className="item">
                                    <div>
                                        <img src={item.coverImgUrl+'?param=40y40'} alt="img" />
                                    </div>
                                    <p className="name">{item.name}</p>
                                    <p style={{color: '#999'}}>{item.updateFrequency}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            <h2 style={{marginTop:'20px'}}>全球媒体榜</h2>
            <ul className="tl_list">
                {
                    gList.map((item)=>{
                        return(
                            /*让当前的Li active*/
                            <li className={item.id === nowId?'active':''} key={item.id} onClick={ev=>{
                                props.change(item.id);
                                // this.props.history.push(`/discover/toplist?id=${item.id}`)
                            }}>
                                <div className="item">
                                    <div>
                                        <img src={item.coverImgUrl+'?param=40y40'} alt="img" />
                                    </div>
                                    <p className="name">{item.name}</p>
                                    <p style={{color: '#999'}}>{item.updateFrequency}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default ToplistNav;
