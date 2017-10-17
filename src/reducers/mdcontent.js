import * as types from '../actions/ActionTypes';
const initialState = {
  content:[{
    filename:'Hello Markdown!',
    content:`
![markdown_logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)  

**Hello Markdown!**
======= 


안녕하세요! **마크다운**을 처음 접하시나요?  
하단에 적혀져있는 유용한 강좌들을 한번 읽어보세요!  

----


[ihoneymon님의 마크다운 사용법 글](https://gist.github.com/ihoneymon/652be052a0727ad59601)  
[Ji Heon Kim님의 허니몬의 마크다운 사용기](https://www.slideshare.net/ihoneymon/ss-40575068)`
  },
  {
    filename:'readme',
    content:`
Markdown Editor
===
![preview](https://github.com/nabigraphics/fd-test/blob/master/preview.png?raw=true)  

무겁지않고~~(...?)~~ 심플한 react 마크다운 에디터 입니다.  

---

### 기능

>1. 실시간 프리뷰 지원
2. 에디터창과 프리뷰 화면 크기 조절 지원
3. 에디터 툴바 지원
4. 다중 문서기능 지원
5. md(markdown)파일 저장 불러오기 지원
6. 자동 저장기능 지원
7. ~~초심자를 위한 마크다운 사용법 링크 첨부 (?!)~~ 

---

### 사용한 라이브러리(Library)
>react  
react-redux  
react-splitter-layout  
react-motion  
react-notipoix3  
redux  
redux-localstorage  
redux-devtools-extension  
marked  
babel  
webpack  
sass  
lodash  
etc...`
  }
  ],
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
        }),
        editpage:state.content.length,
        prevpage:state.editpage
      }
    case types.DOCUMENT_LOAD:
      return {
        ...state,
        content:state.content.concat({
          filename:action.filename,
          content:action.content
        }),
        editpage:state.content.length,
        prevpage:state.editpage
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
      let insert = before_content.substring(0,action.offset.startOffset) + action.content + before_content.substring(action.offset.endOffset,before_content.length);
      return {
        ...state,
        content:state.content.map((content,i) => i === action.page ? {...content,content:insert} : content )
      }
    default:
      return state;
  }
}