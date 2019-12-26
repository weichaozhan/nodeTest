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
    let current: LinkNode = undefined;
    
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
    let current: LinkNode = undefined;
    let previous: LinkNode = undefined;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position
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
    let current: LinkNode = undefined;
    let previous: LinkNode = undefined;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position
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
    let current: LinkNode = undefined;
    let index = 0;

    if (position > this.length) {
      positionHandle = this.length;
    } else if (position < 0) {
      const po = this.length + position
      positionHandle = po < 0 ? 0 : this.length + position;
    }

    if (positionHandle === 0) {
      return this.head;
    } else {
      current = this.head;
      
      while(index++ < positionHandle) {
        current = current.next;
      }
      return current
    }
  }
}
