import G6 from '@antv/g6';
import { ModelConfig } from '@antv/g6/lib/types';
import GGroup from '@antv/g-canvas/lib/group';

import {
  NODE_TYPE,
  LINE_TYPE,
  WIDTH_RECT_NODE,
  colorMap,
} from './g6Constant';

const getAnchorPoints = () => {
  return [
    [0.5, 0],
    [0.5, 1],
  ];
};

G6.registerNode(NODE_TYPE.bizQNode, {
  draw: (cfg: ModelConfig, group: GGroup) => {
    const width = WIDTH_RECT_NODE;
    
    let rect = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -15,
        width,
        height: 30,
        radius: 10,
        stroke: cfg.style?.stroke || colorMap.bizQBG,
        fill: cfg.style?.fill || colorMap.bizQBG,
        lineWidth: 1.2,
        fillOpacity: 1,
      },
      draggable: true,
      name: NODE_TYPE.bizQNodeRect,
    });
    group.addShape('polygon', {
      attrs: {
        x: -5,
        y: 20,
        points: [
          [5, 20],
          [-5, 20],
          [0, 29],
        ],
        fill: colorMap.antBlue,
        cursor: 'pointer',
      },
      name: NODE_TYPE.childSelectorBizQ,
    });
    group.addShape('text', {
      attrs: {
        x: 0, // 居中
        y: 0,
        textAlign: 'center',
        textBaseline: 'middle',
        text: cfg.label || '',
        fill: colorMap.white,
      },
      name: NODE_TYPE.bizQText,
      draggable: true
    });
    return rect;
  },
  getAnchorPoints: getAnchorPoints,
}, 'rect');

G6.registerNode(NODE_TYPE.defaultAnswer, {
  draw: (cfg: ModelConfig, group: GGroup) => {
    const width = WIDTH_RECT_NODE;
    
    let rect = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -15,
        width,
        height: 30,
        radius: 10,
        stroke: colorMap.daBG,
        fill: colorMap.daBG,
        lineWidth: 1.2,
        fillOpacity: 1,
      },
      draggable: true,
      name: NODE_TYPE.defaultAnswerRect,
    });
    group.addShape('text', {
      attrs: {
        x: 0, // 居中
        y: 0,
        textAlign: 'center',
        textBaseline: 'middle',
        text: cfg.label || '',
        fill: colorMap.white,
      },
      name: NODE_TYPE.defaultAnswerText,
      draggable: true
    });
    return rect;
  },
  getAnchorPoints: getAnchorPoints,
}, 'rect');

G6.registerEdge(LINE_TYPE.customPolyline, {
  draw: (cfg: ModelConfig, group: GGroup) => {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const sX = startPoint?.x || 0;
    const sY = startPoint?.y || 0;
    const eX = endPoint?.x || 0;
    const eY = endPoint?.y || 0;
    
    let lineDash = group.addShape('path', {
      attrs: {
        stroke: colorMap.antBlue,
        path: [
          ['M', sX, sY],
          ['L', sX, (sY + eY) / 2],
          ['L', eX, (sY + eY) / 2],
          ['L', eX, eY],
        ],
        lineDash: [2,2,2],
      },
      name: 'lineDash',
    });
    return lineDash;
  },
});

export default G6;
