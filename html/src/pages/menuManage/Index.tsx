import React, { useState, } from 'react';
// import ReactDom from 'react-dom';
import { withRouter, } from 'react-router-dom';
import { Editor, EditorState, } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MenuManage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorState: any) => setEditorState(editorState);

  console.log('editorState', editorState.toJS());
  return <div>
    <Editor
      editorState={editorState}
      onChange={onChange} 
      // blockRenderMap={(block: any) => {
      //   const type = block.getType();

      //   if (type === 'atomic') {
      //     return {
      //       component: <div>new div</div>,
      //       editable: false,
      //       props: {
      //         foo: 'bar',
      //       },
      //     };
      //   }
      //   return null;
      // }}
    />
  </div>;
}

export default withRouter(MenuManage);
