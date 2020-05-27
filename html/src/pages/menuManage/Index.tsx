import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, } from 'react-router-dom';

import { TreeGraph, Graph, } from '@antv/g6';
import { TreeGraphData, } from '@antv/g6/lib/types';

import G6 from './g6tools';
import { NODE_TYPE, } from './g6Constant';

import styles from './G6.module.scss';

// import DraftCM from './DraftCM';

let graph: TreeGraph | undefined;

const data: TreeGraphData = {
  id: 'root',
  label: '业务Q名称',
  data: {
    type: NODE_TYPE.bizQNode,
    show: true,
  },
  children: [
    {
      id: 'child1',
      label: '默认答案',
      data: {
        type: NODE_TYPE.defaultAnswer,
        show: true,
      },
    },
  ],
};

const MenuManage = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!graph && ref.current) {
      setTimeout(() => {
        const dom = ReactDOM.findDOMNode(ref.current) as HTMLElement;

        const width = dom.clientWidth || 900;
        const height = (document.querySelector('main')?.clientHeight || 500) - 50;
  
        graph = new G6.TreeGraph({
        // graph = new G6.Graph({
          container: dom, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
          width,
          height,
          modes: {
            default: [
              'zoom-canvas',
              'drag-node',
              'drag-canvas',
              'click-select',
            ],
          },
          layout: {
            type: 'compactBox',
            // direction: 'TB',
            nodesep: 30,
            ranksep: 100,
          },
          defaultEdge: {
            type: 'line',
            style: {
              radius:5,
              offset:30,
              stroke:'#1890ff',
              // endArrow: {
              //   path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
              // },
            },
          },
          edgeStateStyles: {
            hover: {
              stroke: 'orange',
              fill: 'orange',
              // lineWidth: 3,
              endArrow: {
                path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
                stroke: 'orange',
                fill: 'orange',
              },
            },
          }
        });
  
        graph.node((node: any) => {
          return {
            type: node?.data.type,
            labelCfg: {
              style: {
                text: '',
              }
            },
          };
        });
        graph.data(data); // 读取 Step 2 中的数据源到图上
        
        graph.render(); // 渲染图
        graph.fitView();

        graph.on('node:click', (ev: any) => {
          const nodeType = ev.target?.cfg?.name;
          const id = ev.item?.defaultCfg?.id;

          if (nodeType && id && nodeType === NODE_TYPE.childSelectorBizQ) {
            graph?.addChild({
              id: `child${Date.now()}`,
              label: `规则${Date.now()}`,
              data: {
                type: NODE_TYPE.bizQNode,
                show: true,
              },
            }, id);
          }
        });
        graph.on('edge:mouseenter', (ev: any) => {
          (graph as Graph).setItemState(ev.item, 'hover', true);
        });
        graph.on('edge:mouseleave', (ev: any) => {
          (graph as Graph).setItemState(ev.item, 'hover', false);
        });
      });
    }

    return () => {
      (graph as (TreeGraph | Graph)).destroy();
      graph = undefined;
    }
  }, []);

  return <div className={styles['wrapper-g6']} >
    {/* <DraftCM/> */}
    <div className={styles['g6-container']} ref={ref} ></div>
  </div>;
}

export default withRouter(MenuManage);
