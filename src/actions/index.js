//import actiontypes.
import * as types from './ActionTypes';

//change content
export function change_content(page,content) {
  return {
      type: types.CONTENT_CHANGE,
      page,
      content
  };
}
export function edit_content_title(page,title) {
  return {
    type: types.CONTENT_EDIT_TITLE,
    page,
    title
  }
}
//change editpage
export function change_editpage(page){
  return {
    type: types.EDITPAGE_CHANGE,
    page
  }
}
//add docunemt
export function add_document(){
  return {
    type: types.DOCUMENT_ADD
  }
}
//remove docunemt
export function remove_document(page){
  return {
    type: types.DOCUMENT_REMOVE,
    page
  }
}
//change selection
export function change_selection(offset){
  return {
    type: types.SELECTION_CHANGE,
    offset
  }
}
//insert wysiwyg
export function insert_wysiwyg(page,target,offset){
  return{
    type: types.WYSIWYG_INSERT,
    page,
    target,
    offset
  }
}