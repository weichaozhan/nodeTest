import React, { useEffect, useRef, } from 'react';
import { Button, } from 'antd';

function openDB(dbMsg: {
  name: string;
  version?: number;
  objStore?: string;
  optionalParameters?: {
    keyPath: string;
    autoIncrement?: boolean;
  };
}, cb: (db: IDBDatabase) => any) {
  const { name, version, objStore, optionalParameters, } = dbMsg;
  let request = window.indexedDB.open(name, version);

  request.addEventListener('error', (event) => {
    const target: IDBOpenDBRequest = event.target as IDBOpenDBRequest;
    console.error('连接数据库失败！', target.error?.message);
  });

  request.addEventListener('success', (event: Event) => {
    const tartget: IDBOpenDBRequest = event.target as IDBOpenDBRequest;
    const db = tartget.result;
    
    cb(db);
    console.log('连接数据库成功！');
  });

  request.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
    const tartget: IDBOpenDBRequest = event.target as IDBOpenDBRequest;
    const db = tartget.result;

    if (objStore && !db.objectStoreNames.contains(objStore)) {
      db.createObjectStore(objStore, { ...optionalParameters, });
    }
    cb(db);
  });
}

function TestDB (props: any) {
  let db: IDBDatabase;

  useEffect(() => {
    openDB({
      name: 'TestDB',
      version: 2,
      objStore: 'Person',
    }, (dbReturn: IDBDatabase): void => {
      db = dbReturn;
      db.onerror = (event: any) => {
        console.log(event);
      };
    });
  }, []);

  return <div className="p10 mb10" >
    <Button type="primary" >新增</Button>
    <Button className="ml10" type="danger" >删除</Button>
  </div>;
}

export default TestDB;
