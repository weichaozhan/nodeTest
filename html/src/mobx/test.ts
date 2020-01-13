import { observable, autorun, } from 'mobx';

class Todo {
  public id = Math.random();
  @observable list: any = [];

  public constructor() {
    autorun(() => console.log(this.lengthUnfinished));
  }

  public get lengthUnfinished() {
    console.log('computed');
    return this.list.filter((item: any) => !item.finished).length;
  }

  public addItem(str: string) {
    this.list.push({
      str,
      finished: false
    });
  }
}

export default new Todo();
