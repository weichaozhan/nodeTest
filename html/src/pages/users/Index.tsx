import React, { useState, useEffect, Fragment, } from 'react';
import { Button, Form, message, Table, Popconfirm, Modal, } from 'antd';
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';

import styles from './index.module.scss';

import { CODE_REQUEST, } from '../../constants/http';
import { ROLE_CODE, } from '../../constants/global';
import {
  getUsersAPI,
  registeredUserAPI,
  updateUsersAPI,
  deleteUsersAPI,
} from '../../api/user';
import { IUser, } from '../../typings/user';
import { http, } from '../../typings/http';

import UserForm from '../../components/form/UserForm';

const { Column, } = Table;

const Users = () => {
  const [form] = Form.useForm();

  const [action, setAction]: ['add' | 'edit', Function] = useState('add');

  const [usersSelected, setUsersSelected]: [any[], Function] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const [visible, setVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [userData, setUserData]: [IUser | undefined, Function] = useState();
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoadingTable(true);

    getUsersAPI()
      .then((res: any) => {
        if (res.code === CODE_REQUEST.success) {
          const result = res as http.IResponse;

          setUsers(result.data);
        }
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  const deleteUsers = (users: (string | number)[]) => {
    deleteUsersAPI({
      _id: users,
    })
      .then((res: any) => {
        const result = res as http.IResponse;

        if (result.code === CODE_REQUEST.success) {
          message.success(result.msg);
          getUsers();
          setUsersSelected([]);
        } else {
          message.error(result.msg);
        }
      });
  }

  const closeModal = () => {
    setVisible(false);
    setLoadingSubmit(false);
    setUserData(undefined);
    setTimeout(() => {
      form.resetFields();
    });
  };

  const openModal = (record?: IUser) => {
    setAction(record ? 'edit' : 'add');
    setVisible(true);
    setUserData(record);
  }

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const api = action === 'add' ? registeredUserAPI : updateUsersAPI;
        
        setLoadingSubmit(true);
        
        api({
          _id: userData?._id,
          ...values,
        } as IUser)
          .then((res: any) => {
            const result = res as http.IResponse;

            if (result.code === CODE_REQUEST.success) {
              getUsers();
              message.success(result.msg);
              closeModal();
            } else {
              message.error(result.msg);
            }
          })
          .finally(() => {
            setLoadingSubmit(false);
          });
      });
  }

  return <div>
    <div className={styles['actions-wrapper']} >
      <Button type="primary" onClick={() => openModal()} >添加用户</Button>
      
      <Popconfirm title="确认删除？" disabled={usersSelected.length === 0} onConfirm={() => {
        deleteUsers(usersSelected);
      }} >
        <Button className="ml10" type="danger" disabled={usersSelected.length === 0} >删除</Button>
      </Popconfirm>
    </div>

    <Table
      rowKey="_id"
      dataSource={users}
      bordered={true}
      loading={loadingTable}
      rowSelection={{
        onChange: (values: any[]) => {
          setUsersSelected(values);
        }
      }}
    >
      <Column title="ID" dataIndex="_id" ></Column>
      <Column title="姓名" dataIndex="name" ></Column>
      <Column title="邮箱" dataIndex="email" ></Column>
      <Column title="角色" dataIndex="role" render={(keyValue: number[]) => keyValue.map((item: any) => item.name).join('、')} ></Column>
      <Column title="操作" key="action" render={(record: IUser) => {
        const roleCodes = record?.role?.map(r => r?.code);
        const isAdmin = roleCodes?.includes(ROLE_CODE.admin);
        
        return (isAdmin && record.account === ROLE_CODE.admin) ? '' : <Fragment>
            <Button type="primary" size="small" shape="circle" icon={<EditOutlined />} onClick={() => openModal(record)} ></Button>

            <Popconfirm title="确认删除？" onConfirm={() => deleteUsers([record._id as string | number])} >
              <Button className="ml10" type="danger" size="small" shape="circle" icon={<DeleteOutlined />} ></Button>
            </Popconfirm>
        </Fragment>;
      }} ></Column>
    </Table>

    <Modal
      title={`${action === 'add' ? '添加' : '编辑'}用户`}
      visible={visible}
      width="600px"
      onCancel={closeModal}
      confirmLoading={loadingSubmit}
      onOk={() => onSubmit()}
    >
      <UserForm form={form} action={action} initialValues={userData} />
    </Modal>
  </div>
}

export default Users;
