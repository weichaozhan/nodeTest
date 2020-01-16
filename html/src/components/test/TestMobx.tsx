import React, { Component, } from 'react';
import ReactDom from 'react-dom';
import { observer, } from 'mobx-react';

import 'react-virtualized/styles.css';
import { WindowScroller, List, AutoSizer, } from 'react-virtualized';

import styles from './index.module.scss';

@observer
class TestMobx extends Component<any, any> {
  heights: any[] = [];
  
  constructor(props: any) {
    super(props);
    this.state = {
      dom: [],
    };
    this.heights = [];
  }
  
  componentDidMount() {
    this.renderDiv(50);
  }

  renderDiv(num: number) {
    const dom: any[] = [];
    
    for (let i = 0; i < num; i++) {
      const domSub = [];
      const count = Math.ceil(Math.random() * 10);

      for (let j = 0; j < count; j++) {
        domSub.push(<h1 key={`${i}_${j}`} >
          {`${i}_${j}`}
        </h1>);
      }

      dom.push(<div key={i} >
        {domSub}
      </div>);
    }

    const node = document.createElement('div');
    node.style.opacity = '0';
    node.style.position = 'fixed';
    node.style.zIndex = '-999999';
    node.classList.add(styles['test-mobx']);
    document.body.appendChild(node);

    ReactDom.render(dom, node, () => {
      this.heights = [];
      
      Array.prototype.forEach.call(node.children, item => {
        this.heights.push(item.clientHeight);
      });
      document.body.removeChild(node);

      console.log('this.heights', this.heights);
      this.setState({ dom, });
    });
    
  }

  render() {
    const { dom } = this.state;
    
    return <div className={styles['test-mobx']} >
      test mobx

      {/* <WindowScroller> */}

        {/* {({
          width,
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
        }) => <AutoSizer>
            {() => <List
            autoHeight
            scrollTop={scrollTop}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            width={width}
            height={height}
            overscanRowCount={2}
            rowCount={10000}
            rowHeight={300}
            rowRenderer={({ index, key, style, }) => <div style={style} key={key} className={styles['rv-render']} >
              {this.renderDiv(index)}
            </div>}
          />}
        </AutoSizer>} */}
        {this.heights.length > 0 && <AutoSizer>
          {({
            width,
            height,
          }) => {
            // console.log('width, height', width, height);
            return <List
              width={width}
              height={height}
              rowCount={dom.length}
              rowHeight={({ index, }) => this.heights[index]}
              rowRenderer={({ index, key, style, }) => <div style={style} key={key} className={styles['rv-render']} >
                {dom[index]}
              </div>}
            />;
          }}
        </AutoSizer>}
      {/* </WindowScroller> */}
    </div>;
  }
}

export default TestMobx;
