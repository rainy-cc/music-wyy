/*
    404页面
 */

import React from 'react';
import '../../static/css/404.css';

function NotFound(){
    return(
        <div className="g_main page404">
            <div className="not">
                <div className="bg404"></div>
                <p className="text color6">抱歉，你搜索的页面不存在哦！</p>
            </div>

        </div>
    );
}

export default NotFound;
