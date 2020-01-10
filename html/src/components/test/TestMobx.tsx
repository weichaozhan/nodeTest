import React, { Component, } from 'react';
import { observer, } from 'mobx-react';

// import styles from './index.module.scss';

@observer
class TestMobx extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>
      test mobx
    </div>;
  }
}

export default TestMobx;
