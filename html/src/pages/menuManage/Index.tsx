import React, { useState, useEffect, useRef, } from 'react';
// import ReactDom from 'react-dom';
import { Button, Modal, Input, } from 'antd';
import { EditFilled, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { withRouter, } from 'react-router-dom';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  // ContentBlock,
  // RichUtils,
  Modifier,
  Entity,
  convertToRaw,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import styles from './index.module.scss';

const NewDiv = (props: any) => {
  return <span className={styles['new-div']} onClick={() => console.log('div')} >
    {props.content || `I'm new div`}
  </span>;
};

const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          
          if (entityKey !== null && contentState.getEntity(entityKey).getType() === 'mycustom') {
            console.log(contentState.getEntity(entityKey).getData());
          }

          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'mycustom'
          );
        },
        callback
      );
    },
    component: NewDiv,
    props: {
      content: `I'm new div`,
    },
  },
]);

// const myBlockRenderer = (contentBlock: ContentBlock) => {
//   const type = contentBlock.getType();
//   if (type === 'atomic') {
//     return {
//       component: newDiv,
//       editable: false,
//       props: {
//         foo: 'bar',
//       },
//     };
//   } else {
//     return null;
//   }
// };

const MenuManage = () => {
  const editorRef = useRef(null);

  const [editable, setEditable] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editable) {
      setFocus();
    }
  }, [editable]);

  const setFocus = () => (editorRef.current as any)?.focus();
  const onChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const clickInsert = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = Entity.create(
      'mycustom',
      'IMMUTABLE',
      {
        // action: 'insert',
        content: content,
      },
    );

    const selection = editorState.getSelection();
    
    const firstBlank = Modifier.replaceText(
      contentState,
      selection,
      " ",
      undefined,
      undefined
    );
    const withEntity = Modifier.insertText(
      firstBlank,
      firstBlank.getSelectionAfter(),
      " ",
      undefined,
      contentStateWithEntity
    );
  
    const withBlank = Modifier.insertText(
      withEntity,
      withEntity.getSelectionAfter(),
      " ",
      undefined,
      undefined,
    );

    const newEditorState = EditorState.push(editorState, withBlank, 'insert-fragment');
    
    setEditorState(newEditorState);
  }

  return <div style={{ border: '1px solid orange', borderRadius: '6px', padding: '10px 20px', textAlign: 'left', }} >
    <Button  type={editable ? 'danger' : 'primary'} icon={editable ? <DeleteOutlined/> : <EditOutlined/>} onClick={() => setEditable(!editable)} ></Button>
    <Button className="mb10 ml10" type="primary" icon={<EditFilled/>} onClick={() => setVisible(true)} ></Button>

    <Editor
      ref={editorRef}
      readOnly={!editable}
      editorState={editorState}
      onChange={onChange}
      // blockRendererFn={myBlockRenderer}
    />

    <Modal
      title="输入"
      onOk={() => {
        clickInsert();
        setVisible(false);
      }}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Input placeholder="请输入内容" onChange={e => setContent(e.target.value)} />
    </Modal>
  </div>;
}

export default withRouter(MenuManage);
