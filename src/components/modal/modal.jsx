/**
 * 网页弹出框
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import LoginModal from './login';
import RegisterModal from './register';
import PhoneLoginModal from './phoneLogin';
import PayModal from './pay';
import CopyRightModal from './copyRight';

import '../../static/css/modal.css';

class Modal extends React.Component {

    changeModalStatus(status){
        this.props.actions.changeModalStatus(status);
    }
    render(){
        let element;

        switch(this.props.modalStatus){
            case 'login':
                element = <LoginModal changeModalStatus={this.changeModalStatus.bind(this)} />;
                break;
            case 'phoneLogin':
                element = <PhoneLoginModal changeModalStatus={this.changeModalStatus.bind(this)} />;
                break;
            case 'register':
                element = <RegisterModal changeModalStatus={this.changeModalStatus.bind(this)} />;
                break;
            case 'pay':
                element = <PayModal changeModalStatus={this.changeModalStatus.bind(this)} />;
                break;
            case 'copyRight':
                element = <CopyRightModal changeModalStatus={this.changeModalStatus.bind(this)} />;
                break;
            default:
        }
        return(

            <div className="modal_mask" style={{display:this.props.modalStatus != 'none'?'block':'none'}}>
                {
                    element
                }
            </div>
        );
    }
}



function matchStateToProps(state){
    return {
        modalStatus:state.modalStatus,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(matchStateToProps,mapDispatchToProps)(Modal);
