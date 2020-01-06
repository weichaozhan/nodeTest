/**
 * @description Linked List
 */
export class LinkNode {
  public data: any;
  public next: any;

  public constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  public head: LinkNode;
  public length: number;

  public constructor() {
    this.head = null;
    this.length = 0;
  }

  public append(nodeData: any) {
    const newNode = new LinkNode(nodeData);
    let current: LinkNode;
    
    if (this.head === null) {
      this.head = newNode;
    } else {
      current = this.head;
      
      while(current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length ++;
  }

  public insert(nodeData: any, position: number) {
    const newNode = new LinkNode(nodeData);
    let positionHandle = position;
    let current: LinkNode;
    let previous: LinkNode;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position;
      positionHandle = po < 0 ? 0 : this.length + position;
    }

    if (positionHandle === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      current = this.head;
      
      while(index++ < positionHandle) {
        previous = current;
        current = current.next;
      }
      previous.next = newNode;
      newNode.next = current;
    }

    this.length ++;
  }

  public remove(position: number) {
    let positionHandle = position;
    let current: LinkNode;
    let previous: LinkNode;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position;
      positionHandle = po < 0 ? 0 : this.length + position;
    }

    if (positionHandle === 0) {
      this.head = this.head.next;
    } else {
      current = this.head;
      
      while(index++ < positionHandle) {
        previous = current;
        current = current.next;
      }
      previous.next = (current || {}).next;
    }

    this.length --;
  }

  public findByIndex(position: number) {
    let positionHandle = position;
    let current: LinkNode;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position;
      positionHandle = po < 0 ? 0 : this.length + position;
    }

    if (positionHandle === 0) {
      return this.head;
    } else {
      current = this.head;
      
      while(index++ < positionHandle) {
        current = current.next;
      }
      return current;
    }
  }
}

/**
 * Hash Table
 */
export class HashTable {
  public static loseloseHashCode(key: string) {
    let hash = 5381;
    for (let codePoint of key) {
        hash = hash * 33 + codePoint.charCodeAt(0);
    }
    return hash % 1013;
  }

  public table: any[];
  
  public constructor() {
    this.table = [];
  }

  public put(key: string, value: any) {
    const position = HashTable.loseloseHashCode(key);

    console.log(`${position}->${value}`);
    this.table[position] = value;
  }

  public get(key: string): string {
    return this.table[HashTable.loseloseHashCode(key)];
  }

  public remove(key: string) {
    const position = HashTable.loseloseHashCode(key);
    
    console.log(`remove item, ${key}->${this.table[position]}`);

    this.table[position] = undefined;
  }
}

// 二叉搜索树节点 key（为对象时）
interface IBinaryTreeNodeKey {
  keyValue?: number;
  [propsName: string]: any; 
}
// // 二叉搜索树节点 key
type TBinaryTreeNodeKey = IBinaryTreeNodeKey | number;
class BinaryTreeNode {
  public key: TBinaryTreeNodeKey;
  public left: BinaryTreeNode;
  public right: BinaryTreeNode;

  public constructor(key: TBinaryTreeNodeKey) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
/**
 * @description 二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值， 在右侧节点存储（比父节点）大（或者等于）的值。
 */
export class BinarySearchTree {
  /**
   * @description 查找最大或最小值，left 最小，right 最大
   */
  private static findMinMaxNode = (rootNode: BinaryTreeNode, type: 'left' | 'right') => {
    const findNode = (node: BinaryTreeNode) => {
      let nodeNeed = node;

      if (node) {
        nodeNeed = node[type] ? findNode(node[type]) : node;
      }

      return nodeNeed;
    };

    return findNode(rootNode);
  };
  /**
   * @description 返回节点的 key
   */
  private static returnNodeKey = (node: BinaryTreeNode) => {
    return typeof node.key === 'object' ? node.key.keyValue : node.key;
  };

  public root: BinaryTreeNode;

  public constructor(rootKey?: TBinaryTreeNodeKey) {
    this.root = rootKey !== undefined ? {
      key: rootKey,
      left: null,
      right: null,
    } : null;
  }

  public insert(key: TBinaryTreeNodeKey) {
    const newNode = new BinaryTreeNode(key);

    const inserNewNode = (node: BinaryTreeNode, newNode: BinaryTreeNode) => {
      const nodeValue = BinarySearchTree.returnNodeKey(node);
      const newNodeValue = BinarySearchTree.returnNodeKey(newNode);

      if (nodeValue === newNodeValue) {
        console.log(new Error(`The key "${nodeValue}" already used!`));
        return false;
      }

      if (nodeValue > newNodeValue) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          inserNewNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          inserNewNode(node.right, newNode);
        }
      }
    };

    if (!this.root) {
      this.root = newNode;
    } else {
      inserNewNode(this.root, newNode);
    }
  }

  /**
   * @description 先序遍历 root -> left -> right
   * @param callback 
   */
  public preOrderTraverse(callback?: Function) {
    const preOrderTraverseNode = (node: BinaryTreeNode, callback: Function) => {
      if (node !== null) {
        callback(node.key, node);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
      }
    };

    preOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 中序序遍历 left -> root -> right
   * @param callback 
   */
  public inOrderTraverse(callback?: Function) {
    const inOrderTraverseNode = (node: BinaryTreeNode, callback: Function) => {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key, node);
        inOrderTraverseNode(node.right, callback);
      }
    };

    inOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 后序序遍历 left -> right -> root
   * @param callback 
   */
  public postOrderTraverse(callback?: Function) {
    const postOrderTraverseNode = (node: BinaryTreeNode, callback: Function) => {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.key, node);
      }
    };

    postOrderTraverseNode(this.root, callback);
  }

  /**
   * @description 查找 key 最小节点
   * @param {BinaryTreeNode} node 
   */
  public min(node: BinaryTreeNode) {
    return BinarySearchTree.findMinMaxNode(node || this.root, 'left');
  }

  /**
   * @description 查找 key 最大节点
   * @param {BinaryTreeNode} node 
   */
  public max(node: BinaryTreeNode) {
    return BinarySearchTree.findMinMaxNode(node || this.root, 'right');
  }

  /**
   * @description 查找指定节点
   * @param {TBinaryTreeNodeKey} key 节点值
   */
  public search(key: TBinaryTreeNodeKey) {
    let parentSave = null;
    let sideSave = '';
    let result = null;

    const searchNode = (node: BinaryTreeNode, parent: BinaryTreeNode, side: string) => {
      if (node) {
        const nodeKey = BinarySearchTree.returnNodeKey(node);

        if (key === nodeKey) {
          result = node;
          parentSave = parent;
          sideSave = side;
        } else {
          key <= nodeKey ? searchNode(node.left, node, 'left') : searchNode(node.right, node, 'right');
        }
      }
    };

    searchNode(this.root, null, '');

    const sideSaveBool = !!sideSave;
    return [result, parentSave, sideSaveBool ? sideSave : null];
  }

  /**
   * @description 删除指定节点
   * @param {TBinaryTreeNodeKey} key
   */
  public delete(key: TBinaryTreeNodeKey) {
    const resultSearch = this.search(key);
    
    const parentNode = resultSearch[1];
    const parentSide = resultSearch[2];
    
    const node = resultSearch[0];
    const leftChildTree = node.left;
    const rightChildTree = node.right;

    if (node === null) {
      return `Node ${key} does not exist!`;
    } else if (parentNode === null) {
      this.root = null;
      return 'Delete root';
    } else {
      // 没有左子树
      if (leftChildTree === null) {
        parentNode[parentSide] = rightChildTree;
      } else if (rightChildTree === null) {// 没有右子树
        parentNode[parentSide] = leftChildTree;
      } else {// 有左右子树
        // 右子树没有自己的左子树
        if (rightChildTree.left === null) {
          parentNode[parentSide] = rightChildTree;
          rightChildTree.left = leftChildTree;
        } else {
          const findLeftLeafNode = (currentNode: BinaryTreeNode, cParentNode: BinaryTreeNode, cParentSide: 'left' | 'right') => {
            if (currentNode.left === null && currentNode.right === null) {
              cParentNode[cParentSide] = null;
              currentNode.left = leftChildTree;
              currentNode.right = rightChildTree;
              parentNode[parentSide] = currentNode;
            } else {
              if (currentNode.left) {
                findLeftLeafNode(currentNode.left, cParentNode, 'left');
              } else {
                findLeftLeafNode(currentNode.right, cParentNode, 'right');
              }
            }
          };
          findLeftLeafNode(rightChildTree.left, rightChildTree, 'left');
        }
      }
      
      return {
        currentNode: parentNode[parentSide],
        parentNode,
      };
    }
  }
}


type TGVertice = string | number;
/**
 * Graph
 */
export class Graph {
  public vertices: (string | number)[];
  public adjList: Map<TGVertice, any[]>;

  public constructor() {
    this.vertices = [];
    this.adjList = new Map();
  }

  /**
   * @description 添加顶点
   * @param {TGVertice} v 顶点
   */
  public addVertex(v: TGVertice) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  /**
   * @description 添加边
   * @param {TGVertice} v 路径顶点
   * @param {TGVertice} w 路径顶点
   */
  public addEdge(v: TGVertice, w: TGVertice) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  public toString() {
    return this.vertices.reduce((r, v) => {
      return r + this.adjList.get(v).reduce((r, k) => {
        return `${r} ${k}`;
      }, `\n${v} => `);
    }, '');
  }

  /**
   * @description 深度优先遍历
   */
  public bfs(v: TGVertice, calllback = (key: TGVertice) => {}) {
    const predecessor = {};
    const distance = {};

    const adjList = this.adjList;
    const pending = [v];
    const read = [];

    const bfsSearch = (vertices: TGVertice[]) => {
      vertices.forEach(item => {
        distance[item] = distance[item] || 0;
        predecessor[item] = predecessor[item] || null;

        pending.shift();
        read.push(item);

        adjList.get(item).forEach(nItem => {
          if (!read.includes(nItem)) {
            distance[nItem] = distance[item] + 1;
            predecessor[nItem] = item;

            pending.push(nItem);
          }
        });

        calllback(item);
        
      });

      if (pending.length > 0) {
        bfsSearch([...pending]);
      }
    };

    bfsSearch([...pending]);

    return {
      predecessor,
      distance,
    };
  }

  /**
   * @description 顶点到其他顶点的最短路径
   * @param {TGVertice} v
   */
  public minPath(v: TGVertice) {
    const { distance, predecessor, } = this.bfs(v);
    const vertices = this.vertices;

    vertices.forEach(item => {
      if (!!distance && item !== v) {
        let preVertice = predecessor[item];
        let path = '';

        while(preVertice !== v) {
          path = `--${preVertice}${path}`;
          preVertice = predecessor[preVertice];
        }

        path = `${v}${path}--${item}`;
        console.log(path);
      }
    });
  }
}

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('C', 'G');
graph.addEdge('G', 'H');
graph.addEdge('G', 'I');

console.log(graph.toString());

const dp = graph.bfs('A', k => console.log(k));

console.log(dp);
graph.minPath('A');
