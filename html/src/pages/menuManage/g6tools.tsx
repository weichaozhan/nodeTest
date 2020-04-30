import G6 from '@antv/g6';
import { ModelConfig } from '@antv/g6/lib/types';
import GGroup from '@antv/g-canvas/lib/group';

const colorMap = {
  antBlue: '#1890ff',
  white: '#ffffff',
  fontColor: '#666',
};

G6.registerNode('bizQNode', {
  options: {
  },
  linkPoints: {
    top: true,
    right: true,
    bottom: true,
    left: true,
  },
  draw: (cfg: ModelConfig, group: GGroup) => {
    const width = 100;
    const stroke = cfg.style?.stroke || colorMap.antBlue;
    const fill = cfg.style?.fill || colorMap.white;
    
    let rect = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -15,
        width,
        height: 30,
        radius: 10,
        stroke,
        fill: fill || 'red',
        lineWidth: 1.2,
        fillOpacity: 1,
      },
      draggable: true,
      name: 'bizQNode',
    });
    group.addShape('text', {
      attrs: {
        x: 0, // 居中
        y: 0,
        textAlign: 'center',
        textBaseline: 'middle',
        text: cfg.label || '',
        fill: colorMap.fontColor,
      },
      name: 'text-shape',
      draggable: true
    });
    return rect;
  },
  getAnchorPoints: () => {
    return [
      [0.5, 0],
      [0.5, 1],
    ];
  },
}, 'rect');

G6.registerEdge('customPolyline', {
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
