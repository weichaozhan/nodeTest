import React, { useEffect, useRef, useState, } from 'react';
import { Button, message, Input, Radio, InputNumber, } from 'antd';

import styles from './index.module.scss';

interface IObjIndex {
  indexName: string;
  keyPath: string;
  action: 'add' | 'delete';
  options?: {
    unique?: boolean;
    multiEntry?: boolean;
    locale?: string;
  };
}
interface IDBMsg {
  name: string;
  version?: number;
  objStore?: string;
  objectStoreOptions?: {
    keyPath?: string;
    autoIncrement?: boolean;
  };
  indexes?: IObjIndex[];
}

function changeIndex(objStoreGet: IDBObjectStore, indexes: IObjIndex[]) {
  indexes.forEach(item => {
    if (!objStoreGet.indexNames.contains(item.indexName) && item.action === 'add') {
      objStoreGet.createIndex(item.indexName, item.keyPath, item.options);
    } else if (objStoreGet.indexNames.contains(item.indexName) && item.action === 'delete') {
      objStoreGet.deleteIndex(item.indexName);
    }
  });
}

function openDB(dbMsg: IDBMsg, cb: (db: IDBDatabase) => any) {
  const { name, version, objStore, objectStoreOptions = {}, indexes = [], } = dbMsg;
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
    const target: IDBOpenDBRequest = event.target as IDBOpenDBRequest;
    const db = target.result;
    let objStoreGet: IDBObjectStore;

    if (objStore) {
      if (!db.objectStoreNames.contains(objStore)) {
        objStoreGet = db.createObjectStore(objStore, { ...objectStoreOptions, });
        changeIndex(objStoreGet, indexes);
      } else {
        objStoreGet = target.transaction?.objectStore(objStore as string) as IDBObjectStore;
        changeIndex(objStoreGet, indexes);
      }
    }
    cb(db);
  });
}

function add(db: IDBDatabase, storeName: string, record: any) {
  const action: IDBRequest<IDBValidKey> = db.transaction(storeName, 'readwrite').objectStore(storeName).add(record);

  action.addEventListener('success', (event) => {
    message.success(`添加成功！主键：${(event.target as IDBRequest).result}`);
  });
}

function get(target: any, options: {
  db: IDBDatabase;
  storeName: string;
  indexName?: string;
  cb?: (value: any) => any;
}) {
  const { db, storeName, indexName, cb, } = options;
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
  const index = indexName && store.index(indexName);
  
  const action = index ? index.getAll(target) : store.get(target);
  
  action.addEventListener('success', (event) => {
    cb && cb((event.target as IDBRequest).result);
  });
}

function getAll(db: IDBDatabase, storeName: string, cb?: (value: any) => any) {
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
  let result: any[] = [];

  store.openCursor().addEventListener('success', (event) => {
    const target = event.target as IDBRequest;
    const cursor: IDBCursorWithValue = target.result;
    
    if (cursor) {
      result.push(cursor.value);
      cursor.continue();
    } else {
      cb && cb(result);
    }
  });
}

function update(db: IDBDatabase, storeName: string, target: number, newName: string) {
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
  const action = store.put({
    id: target,
    name: newName,
    test: `${target}_${newName}`,
  });

  action.addEventListener('success', () => {
    message.success(`更新成功！主键：${target}`);
  })
}

function remove(db: IDBDatabase, storeName: string, target: number) {
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
  const action = store.delete(target);

  action.addEventListener('success', () => {
    message.success(`删除成功！主键：${target}`);
  })
}

function TestDB () {
  const [valueSearch, setValueSearch]: [number | string, Function] = useState('');
  const [typeSearch, setTypeSearch]: [number, Function] = useState(0);
  const [resultSearch, setResultSearch]: [any, Function] = useState('');
  const db: React.MutableRefObject<IDBDatabase | null> = useRef(null);

  useEffect(() => {
    openDB({
      name: 'TestDB',
      version: 10,
      objStore: 'Person',
      objectStoreOptions: {
        keyPath: 'id',
        autoIncrement: true,
      },
      indexes: [
        { indexName: 'name', keyPath: 'name', action: 'add', },
        { indexName: 'name2', keyPath: 'name3', action: 'delete', },
      ],
    }, (dbReturn: IDBDatabase): void => {
      db.current = dbReturn;
      db.current.onerror = (event: any) => {
        message.error(event?.target?.error?.message);
      };
    });
  }, []);
  useEffect(() => {
    if (valueSearch) {
      get(valueSearch, {
        db: db.current as IDBDatabase, 
        storeName: 'Person',
        indexName: typeSearch === 0 ? undefined : 'name',
        cb: (value: any) => setResultSearch(value),
      });
    }
  }, [valueSearch, typeSearch]);
  
  return <div className={`p10 mb10 ${styles['indexeddb-wrapper']}`} >
    <h1>
      IndexedDB
    </h1>

    <div>
      <Button type="primary" onClick={() => {
        const result = window.prompt('请输入 name ！');

        if (result) {
          add(db.current as IDBDatabase, 'Person', {
            id: Date.now(),
            name: result,
            test: `${Date.now()}_${result}`,
          });
        }
      }} >新增</Button>
      <Button className="ml10" onClick={() => {
        getAll(db.current as IDBDatabase, 'Person', (value: any[]) => console.log(value));
      }} >获取所有</Button>
      <Button className="ml10" onClick={() => {
        const result = window.prompt('请输入要更新的 id 和 新的 name（格式：id_name） ！')?.split('_');

        if (result && result[0] && result[1]) {
          const target = parseInt(result[0]) ? parseInt(result[0]) : '';

          if (target) {
            update(db.current as IDBDatabase, 'Person', target, result[1]);
          }
        }
      }} >更新</Button>
      <Button className="ml10" type="danger" onClick={() => {
        const result = window.prompt('请输入要删除的 id ！') || '';

        const target = parseInt(result) ? parseInt(result) : 0;

        if (target) {
          remove(db.current as IDBDatabase, 'Person', target);
        }
      }} >删除</Button>

      <div className="m10 p10">
        {typeSearch === 1 ? <Input style={{ width: '500px', }} placeholder="输入查询 Name" onChange={e => {
          setValueSearch(e.target.value);
        }} /> : <InputNumber style={{ width: '500px', }} placeholder="输入查询 ID" onChange={value => {
          setValueSearch(value);
        }} />}
        
        <div className="m10">
          查询方式
          <Radio.Group className="ml10" value={typeSearch} onChange={e => {
            setTypeSearch(e.target.value);
          }} >
            <Radio value={0} >
              id
            </Radio>
            <Radio value={1} >
              name
            </Radio>
          </Radio.Group>
        </div>

        <div className="p10 m10" >
          {resultSearch && JSON.stringify(resultSearch, null, 2)}
        </div>
      </div>
    </div>
  </div>;
}

export default TestDB;
