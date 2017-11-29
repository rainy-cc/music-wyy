/*
    搜索专辑结果
 */
import React from 'react';

import  AlbumItem from '../../../components/album/albumItem';

class SchAlbum extends React.Component {
    render(){
        return(
            <div>
                <AlbumItem data={this.props.data.albums} />
            </div>
        );
    }
}

export default SchAlbum;
