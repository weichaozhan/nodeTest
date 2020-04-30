import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, } from 'react-router-dom';

import { TreeGraph, Graph } from '@antv/g6';
import { TreeGraphData, GraphData } from '@antv/g6/lib/types';
// import { G6s as G6 } from './g6tools';
import G6 from './g6tools';

import styles from './G6.module.scss';

// import DraftCM from './DraftCM';

let graph: TreeGraph | Graph | undefined;
const data: TreeGraphData | GraphData = {
  id: 'root',
  label: 'root',
  data: {
    show: true,
  },
  children: [
    {
      id: 'child1',
      label: 'child1',
      data: {
        show: true,
      },
    },
    {
      id: 'child2',
      label: 'child2',
      data: {
        show: true,
      },
    },
  ],
};
// const data: GraphData = {
//   nodes: [
//     {
//       id: 'node1',
//       label: 'node1',
//     },
//     {
//       id: 'node2',
//       label: 'node2',
//     },
//   ],
//   edges: [
//     {
//       source: 'node1',
//       target: 'node2',
//     },
//   ],
// };

const MenuManage = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!graph && ref.current) {
      setTimeout(() => {
        const dom = ReactDOM.findDOMNode(ref.current) as HTMLElement;

        const width = dom.clientWidth || 900;
        const height = (document.querySelector('main')?.clientHeight || 500) - 100;
  
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
            // type: 'dagre',
            direction: 'TB',
            nodesep: 30,
            ranksep: 100,
          },
          defaultNode: {
            type: 'bizQNode',
            labelCfg: {
              style: {
                fill: '#000000A6',
                fontSize: 10,
              },
            },
          },
          defaultEdge: {
            type: 'customPolyline',
          },
        });
  
        graph.data(data); // 读取 Step 2 中的数据源到图上
        graph.render(); // 渲染图
        graph.fitView();
      });
    }

    return () => {
      (graph as (TreeGraph | Graph)).destroy();
      graph = undefined;
    }
  }, []);

  return <div style={{ overflow: 'visible', }} >
    {/* <DraftCM/> */}
    <div className={styles['wrapper-g6']} ref={ref} ></div>
  </div>;
}

export default withRouter(MenuManage);
