/*
    lOADING 图标
*/

import React from 'react';
import '../static/css/loading.css';
function Loading(props){
    return(
        <div className={props.size=='small'?'loading loading_size':'loading'} >
            <div className="loading_box">
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
                <span className="line4"></span>
                <span className="line5"></span>
                <span className="line6"></span>
                <span className="line7"></span>
                <span className="line8"></span>
            </div>
            <div className="loading_txt">
                Loading
            </div>
        </div>
    );
}

export default Loading;
