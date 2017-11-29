/**
 *  用户主页信息部分组件
 */
import React from 'react';

function UserInfo(props){
    let data = props.infoData;
    return(
        <div className="uh_info clearfix">
            <div className="uh_avatar fl">
                <img src={data.profile.avatarUrl} alt="avatar" />
            </div>
            <div className="uh_info_detail fl">
                {/*关于*/}
                <div className="about">
                    <div className="about_t clearfix">
                        <h2 className="fl clearfix">
                            <span className="nickname">{data.profile.nickname}</span>
                            <span className="level">{data.level}<i></i></span>
                            <i className={data.profile.gender == 1?'icon_sex icon_man':'icon_sex icon_woman'}></i>
                        </h2>
                        <div className="hd_btns fl">
                            <a className="hd_btn hd_btn1" href="javascript:;"><span>发私信</span></a>
                            <a className="hd_btn hd_btn2" href="javascript:;">关&nbsp;注</a>
                        </div>
                    </div>
                    {
                        /*认证*/
                        data.profile.authStatus?(<p className="tag"><i className="vrz"></i><span>{data.profile.description}</span></p>):null

                    }
                    {
                        /*达人*/
                        data.profile.expertTags?(<p className="tag"><i className="daren"></i><span>音乐({data.profile.expertTags.join('、')})</span></p>):null
                    }
                </div>
                {/*动态关注粉丝*/}
                <div className="data"></div>
                {
                    data.profile.signature?(<p className="more_info">个人介绍&nbsp;：&nbsp;{data.profile.signature}</p>):null
                }
                <p className="more_info">
                    <span>所在地区：中国（此处需要映射）</span>
                </p>
            </div>
        </div>
    );
}

export default UserInfo;
