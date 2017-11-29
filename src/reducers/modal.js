/*
    控制对话框的reducer
 */
import {CHNAGE_MODAL_STATUS} from '../constants/index';

export default function modalStatus(state="none",action){
     switch(action.type){
         case CHNAGE_MODAL_STATUS:
             return action.status;
         default:
             return state;
     }
 }
