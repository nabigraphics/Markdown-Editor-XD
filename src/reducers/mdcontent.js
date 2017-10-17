import * as types from '../actions/ActionTypes';
// import { Map, List } from 'immutable';
// const initialState =  Map({
//     content:List([]),
//     editpage:0
// });
const initialState = {
  content:[{
    filename:'문서_0',
    content:''
  }],
  editpage:0,
  prevpage:0,
  selection:{
    startOffset:0,
    endOffset:0
  }
}
export default function (state = initialState, action){
  switch(action.type){
    case types.CONTENT_CHANGE:
      let temp = state.content;
      temp[action.page].content = action.content;
      return {
        ...state,
        content:state.content.map((content,i) => i === action.page ? {...content,content:action.content} : content )
      }
    case types.CONTENT_EDIT_TITLE:
      return {
        ...state,
        content:state.content.map((content,i) => i === action.page ? {...content,filename:action.title} : content )
      }
    case types.EDITPAGE_CHANGE:
      return {
        ...state,
        editpage:action.page,
        prevpage:state.editpage
      }
    case types.DOCUMENT_ADD:
      return {
        ...state,
        content:state.content.concat({
          filename:'문서_' + state.content.length,
          content:''
        })
      }
    case types.DOCUMENT_REMOVE:
      if(state.content.length === 1){
        return {
          ...state,
          content:[{
            filename:'문서_0',
            content:''
          }],
          editpage:0,
          prevpage:0
        }
      }else{
        return {
          ...state,
          content:[...state.content.slice(0,action.page), ...state.content.slice(action.page + 1)],
          editpage:( state.prevpage === 0 ? 0 : state.prevpage-1 ),
          prevpage:0
        }
      }
    case types.SELECTION_CHANGE:
      return {
        ...state,
        selection:{
          startOffset:action.offset.startOffset,
          endOffset:action.offset.endOffset,
        }
      }
    case types.WYSIWYG_INSERT:
      let before_content = state.content[action.page].content;
      let insert = before_content.substring(0,action.offset.startOffset) + action.target + before_content.substring(action.offset.startOffset,action.offset.endOffset) + action.target + before_content.substring(action.offset.endOffset,before_content.length);
      return {
        ...state,
        content:state.content.map((content,i) => i === action.page ? {...content,content:insert} : content )
      }
    default:
      return state;
  }
}