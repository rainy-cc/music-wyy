import React from 'react';
import { getSearchSuggest } from '../../axios/search.js'


function hocSearch(searchComponent){
    return class SearchInput extends React.Component {

        render(){
            return(
                <searchComponent />
            )
        }
    }
}
