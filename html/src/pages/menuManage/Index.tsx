import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, } from 'react-router-dom';

import G6, { TreeGraph } from '@antv/g6';
import { TreeGraphData } from '@antv/g6/lib/types';
// import DraftCM from './DraftCM';

let graph: TreeGraph;
const data: TreeGraphData = {
  id: 'root',
  label: 'root',
  children: [
    {
      id: 'subTree1',
      label: 'subTree1',
      children: [
        {
          id: 'subTree1Child',
          label: 'subTree1Child',
        },
      ],
    },
    {
      id: 'subTree2',
      label: 'subTree2',
      children: [
        {
          id: 'subTree1Child',
          label: 'subTree1Child',
        },
      ],
    }
  ]
};

const MenuManage = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!graph && ref.current) {
      const dom = ReactDOM.findDOMNode(ref.current) as HTMLElement;
      const width = 900;
      const height = 800;

      graph = new G6.TreeGraph({
        container: dom, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width,
        height,
        linkCenter: true,
        modes: {
          default: [
            'zoom-canvas',
            'drag-node',
            'click-select'
          ],
        },
        layout: {
          type: 'compactBox',
          direction: 'TB',
        },
        defaultNode: {
          type: 'rect',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
        },
        // defaultEdge: {
        //   type: 'polyline',
        //   style: {
        //     stroke: '#000000',
        //   },
        // },
        nodeStateStyles: {
          selected: {
            stroke: 'red'
          }
        },
      });

      graph.data(data); // 读取 Step 2 中的数据源到图上
      console.log(graph.getNodes());
      graph.render(); // 渲染图
      graph.fitView()
    }
  }, []);

  return <div>
    {/* <DraftCM/> */}
    <div ref={ref} ></div>
  </div>;
}

export default withRouter(MenuManage);
