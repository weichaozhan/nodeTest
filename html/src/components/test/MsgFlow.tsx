/**
 * @description msg flow
 * @author weichaozhan
 */

import React, { Component, } from 'react';
import cNames from 'classnames';
import MsgFlowItem, { IItem, } from './MsgFlowItem';

import styles from './msgFlow.module.scss';

interface IMsgFlowProps {
  items: IItem[]; // msg data list
  className?: string;
  style?: React.CSSProperties;
}

class MsgFlow extends Component<IMsgFlowProps> {
  static defaultProps = {

  }

  constructor(props: IMsgFlowProps) {
    super(props);
  }

  buildChildren() {
    const { items, } = this.props;
    let childrenDom = items.map((item, index) => <MsgFlowItem key={index} {...item} ></MsgFlowItem>);
    
    return childrenDom;
  }

  render(){
    const { className, style, } = this.props;

    return <div className={cNames(styles['wrapper--msgflow'], className)} style={style} >
      {this.buildChildren()}
    </div>
  }
}

export default MsgFlow;
