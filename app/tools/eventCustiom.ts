class EventCustom {
  protected listeners: {
    [propsname: string]: Function[] | undefined;
  } = {};

  public on(name: string, listener: Function) {
    const nameListener = this.listeners[name];

    if (!nameListener) {
      this.listeners[name] = [listener];
    } else {
      if (!nameListener.includes(listener)) {
        nameListener.push(listener);
      }
    }
  }

  public off(name: string,  listener?: Function) {
    const nameListener = this.listeners[name];
    
    if (nameListener) {
      if (listener) {
        const index = nameListener.indexOf(listener);

        index > -1 && (nameListener.splice(index, 1));
      } else {
        this.listeners[name] = undefined;
      }
    }
  }

  public emit(name: string) {
    const nameListener = this.listeners[name];
    
    if (nameListener) {
      nameListener.forEach(item => item());
    }
  }
}

export const event = new EventCustom();
