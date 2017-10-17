//import actiontypes.
import * as types from './ActionTypes';

//change content 문서 내용 실시간 변경 액션
export function change_content(page,content) {
  return {
      type: types.CONTENT_CHANGE,
      page,
      content
  };
}
//edit content title 문서 이름 변경 액션
export function edit_content_title(page,title) {
  return {
    type: types.CONTENT_EDIT_TITLE,
    page,
    title
  }
}
//change editpage 다른 문서로 이동 액션
export function change_editpage(page){
  return {
    type: types.EDITPAGE_CHANGE,
    page
  }
}
//load document 문서 불러오기 액션
export function load_document(filename,content){
  return {
    type: types.DOCUMENT_LOAD,
    filename,
    content
  }
}
//add docunemt 문서 추가 액션
export function add_document(){
  return {
    type: types.DOCUMENT_ADD
  }
}
//remove docunemt 문서 삭제 액션
export function remove_document(page){
  return {
    type: types.DOCUMENT_REMOVE,
    page
  }
}
//change selection textarea 텍스트 선택 액션
export function change_selection(offset){
  return {
    type: types.SELECTION_CHANGE,
    offset
  }
}
//insert wysiwyg 위지위그 작동 액션
export function insert_wysiwyg(page,offset,content){
  return{
    type: types.WYSIWYG_INSERT,
    page,
    offset,
    content
  }
}