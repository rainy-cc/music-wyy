/**
 * 需要付费提示
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actions';

import LoginModal from './login';

import '../../static/css/loginBox.css';

class Modal extends React.Component {

    hideModal(){
        this.props.actions.changeModalStatus('0');
    }
    render(){
        let element;

        switch(this.props.modalStatus){
            case 'login':
                element = <LoginModal hideModal={this.hideModal.bind(this)} />;
            default:
        }
        return(

            <div className="modal_mask" style={{display:this.props.modalStatus =='pay'?'block':'none'}}>
                {
                    element
                }
                <div className="modal">
                    <div className="modal_hd">
                        <div className="md_title">提示</div>
                        <span onClick={this.hideModal.bind(this)} className="md_close_btn"></span>
                    </div>
                    <div className="modal_bd">
                        <div className="cnt">
                            <div className="info">
                                <i></i>
                                <p>版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享</p>
                            </div>
                        </div>
                        <div className="choose">
                            <a className="now" href="javascript:;"><span>立即订购</span></a>
                            <a  onClick={this.hideModal.bind(this)} className="later" href="javascript:;"><span>以后再说</span></a>
                        </div>
                    </div>
                </div>

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
