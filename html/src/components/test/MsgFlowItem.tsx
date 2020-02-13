/**
 * @description msg flow item
 * @author 詹伟超
 */

import React, { Component, } from 'react';
import cNames from 'classnames';

import styles from './msgFlow.module.scss';
import headImg from './head.png';

export interface IItem {
  type: number; // 0: text, 1: img, 2: system msg, 3: customize,
  content: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  itemAlign?: 'left' | 'right' | 'center'; // msg position
  headSrc?: string;
}

const CONTENT_TYPE = {
  text: 0,
  img: 1,
  systemMsg: 2,
  customize: 3,
};
const ONLY_CONTENT_TYPE = [2, 3];

class MsgFlowItem extends Component<IItem> {
  constructor(props: IItem) {
    super(props);
  }

  buildItem() {
    const props = this.props;
    const { type, content, className, style, } = props;
    let node = undefined;
    
    /**
     * @description Get node based on content type
     */
    const getItemNode = (nodeDefault: React.ReactNode): React.ReactNode => {
      return typeof content === 'string' ? nodeDefault : <div className={className} style={style} >
        {content}
      </div>;
    };
    
    switch(type) {
      case 0: node = getItemNode(<p className={cNames(styles['text--msgFlowItem'], className)} style={style} >
          {content}
        </p>);
        break;
      case 1: node = getItemNode(<img width="100" src={content as string} className={cNames(className)} style={style} ></img>);
        break;
      case 2: node = getItemNode(<p className={cNames(styles['system-msg--msgFlowItem'], className)} style={style} >
          {content}
        </p>);
        break;
      case 3: node = content;
        break;
      default: node = <p className={cNames(styles['text--msgFlowItem'], className)} >
          Unknown message type
        </p>;
        break;
    }

    return node;
  }

  render(){
    const { headSrc, type, itemAlign, } = this.props;
    const item = this.buildItem();
    
    return <div className={cNames(styles['wrapper--msgFlowItem'], {
      [styles['tal-l']]: itemAlign === 'left',
      [styles['tal-c']]: itemAlign === 'center' || type === CONTENT_TYPE.systemMsg, // System message centered
      [styles['tal-r']]: itemAlign === 'right',
    })} >
      {ONLY_CONTENT_TYPE.includes(type) ? item : <div className={cNames(styles['msgFlowItem--dialog__wrapper'], {
        [styles['msgFlowItem--dialog__wrapper--right-mode']] : itemAlign === 'right', // Dialogue items with avatars, different according to itemAlign style
      })} >
        <img className={styles['msgFlowItem__head']} width="30" height="30" src={headSrc || headImg} />
        
        <div className={cNames(styles['content--msgFlowItem'], {
          [styles['tal-r']]: type === CONTENT_TYPE.img, 
        })} >
          {item}
        </div>
      </div>}
    </div>
  }
}

export default MsgFlowItem;
