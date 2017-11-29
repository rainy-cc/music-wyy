import React, {Component} from 'react';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Modal from './components/modal/modal';
import PlayBar from './components/playbar';

import './static/css/recommend.css';
import './static/css/djradio.css';
class App extends Component {
    render() {
        window.scrollTo(0, 0); //解决路由跳转浏览器滚动条的位置
        return (
            <div>
                <Header location={this.props.location} history={this.props.history}/>
                {this.props.children}
                <Footer/>
                <PlayBar/>
                <Modal />
            </div>
        );
    }
}

export default App;
