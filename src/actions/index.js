//import actiontypes.
import * as types from './ActionTypes';

//content actions
export function change_content(content) {
  return {
      type: types.CONTENT_CHANGE,
      content
  };
}