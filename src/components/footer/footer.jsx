/*
    网易云页面底部 Footer组件
*/
import  React from 'react';

import '../../static/css/footer.css';
function Footer(){
    return (
        <div id="footer">
            <div className="ft_wrap clearfix">
                <div className="ft_l fl">
                    <p className="ft_links clearfix">
                        <a href="#">关于网易</a><span>|</span>
                        <a href="#">关于网易</a><span>|</span>
                        <a href="#">关于网易</a><span>|</span>
                        <a href="#">关于网易</a><span>|</span>
                        <a href="#">关于网易</a>
                    </p>
                    <p className="ft_copyright">
                        <span className="copyright">网易公司版权所有©1997-2017</span>
                        <span>杭州乐读科技有限公司运营：</span>
                        <a href="#">浙网文[2015] 0415-135号</a>
                    </p>
                </div>

                <div className="ft_r fr">
                    <a href="#">独立音乐人</a>
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                </div>
            </div>
        </div>
    );
}
export default Footer;
