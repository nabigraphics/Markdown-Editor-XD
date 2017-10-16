import * as types from '../actions/ActionTypes';

const initialState = {
    content:""
}

export default function (state = initialState, action){
  switch(action.type){
    case types.CONTENT_CHANGE :
      return {
        ...state,
        content:action.content
      } 
    default :
      return state;
  }
}