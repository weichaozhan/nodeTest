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
        callback(node.key);
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
        callback(node.key);
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
        callback(node.key);
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

  public search(key: TBinaryTreeNodeKey) {
    let result = null;

    const searchNode = (node: BinaryTreeNode) => {
      if (node) {
        const nodeKey = BinarySearchTree.returnNodeKey(node);

        if (key === nodeKey) {
          result = node;          
        } else {
          key <= nodeKey ? searchNode(node.left) : searchNode(node.right);
        }
      }
    };

    searchNode(this.root);
    return result;
  }
}

const bstTree = new BinarySearchTree();

bstTree.insert(10);
bstTree.insert(9);
bstTree.insert(100);
bstTree.insert(1);
bstTree.insert(60);
bstTree.insert(1);
bstTree.insert(17);

console.log(bstTree.root);

console.log('\n先序\n');
bstTree.preOrderTraverse(value => console.log(value));
console.log('\n中序\n');
bstTree.inOrderTraverse(value => console.log(value));
console.log('\n后序\n');
bstTree.postOrderTraverse(value => console.log(value));

console.log('\nmin', bstTree.min(null));
console.log('\nmax', bstTree.max(null));

console.log('\nsearch', bstTree.search(1));
