import React, { useState, useRef, useEffect, useCallback, } from 'react';

import styles from './dragTest.module.scss';

function DragTest() {
  const leftDom: any = useRef(null);
  const [xDown, setXDown] = useState(0);
  const [isDown, setIsDow] = useState(false);
  
  const onMouseDown = useCallback((e: MouseEvent) => {
    if ((e.target as HTMLElement).dataset.type === 'hover') {
      setXDown(e.screenX);
      setIsDow(true);
    }
  }, []);
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDown) {
      const currentX = e.screenX;
      const currentWidth = leftDom.current.clientWidth;
      const delta = currentX - xDown;

      leftDom.current.style.width = `${currentWidth + delta}px`;
      
      setXDown(currentX);
    }
  }, [xDown, isDown]);
  const onMouseUp= useCallback(() => {
    setXDown(0);
    setIsDow(false);
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    }
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return <div className={styles['drag-wrapper']} >
    <div
      className={styles['drag-left']}
      ref={leftDom}
    >
      <div
        data-type="hover"
        className={styles['hover-border']}
      ></div>
    </div>
    <div className={styles['drag-right']} >
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
      DragTest DragTest DragTest DragTest DragTest DragTest DragTest DragTest
    </div>
  </div>
}

export default DragTest;
