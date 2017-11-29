import React from 'react';

import ad from '../../../static/images/ad.bid.jpg';

function RecommendAd(){
    return(
        <div className="rec_ad">
            <a href="#">
                <img src={ad} alt="广告" />
            </a>
        </div>
    );
}


export default RecommendAd;
