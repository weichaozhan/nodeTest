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
class HashTable {
  public table: any[];
  
  public static loseloseHashCode(key: string) {
    let hash = 0;
    for (let codePoint of key ) {
      hash += codePoint.charCodeAt(0);
    }

    return hash % 37;
  }

  constructor() {
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
    console.log(`remove item, ${key}->${this.table[position]}`)
    this.table[position] = undefined;
  }
}
