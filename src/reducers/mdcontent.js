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
    default:
      return state;
  }
}
// export default function (state = initialState, action){
//   const content_get = state.get('content');
//   const editpage_get = state.get('editpage');
//   // console.log(content_get.toJS());
//   switch(action.type){
//     case types.CONTENT_CHANGE :
//       // localStorage.setItem('content',content_get.update(editpage_get,(res) => res.set('content',action.content)));
//       return state.set('content',content_get.update(editpage_get,(res) => res.set('content',action.content)));
//     case types.CONTENT_LOAD :
//       return state.set('content',List(action.content));
//     case types.CONTENT_INIT :
//       // console.log(List([Map({filename:'untitle_0',content:'# hello markdown!'})]).toArray());
//       // localStorage.setItem('editpage',0);
//       // localStorage.setItem('content',List([Map({filename:'untitle_0',content:'# hello markdown!'})]).toJS());
//       return state.set('content',List([Map({filename:'untitle_0',content:'# hello markdown!'})]))

//     case types.EDITPAGE_LOAD :
//       return state.set('editpage',Number(action.page));
//     case types.EDITPAGE_CHANGE :
//       // localStorage.setItem('editpage',action.page);
//       return state.set('editpage',action.page);
//     default :
//       return state;
//   }
// }