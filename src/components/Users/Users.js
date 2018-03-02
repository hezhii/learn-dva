import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';

import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

const queryString = require('query-string');

function Users({ dispatch, list: dataSource, loading, total, page: current, isCreate }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id
    });
  }

  function editHandler(e, record) {
    e.preventDefault();
    dispatch({
      type: 'userModal/show',
      payload: {
        isCreate: false,
        record
      }
    });
  }

  function createHandler() {
    dispatch({
      type: 'userModal/show',
      payload: {
        isCreate: true,
        record: {}
      }
    });
  }

  function saveHandler(id, values) {
    console.log(`id:${id};values:${JSON.stringify(values)}`);
    if (isCreate) {
      dispatch({
        type: 'users/create',
        payload: { values }
      });
    } else {
      dispatch({
        type: 'users/patch',
        payload: { id, values }
      });
    }
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      search: queryString.stringify({ page })
    }));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <a href="" onClick={e => editHandler(e, record)}>Edit</a>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
         </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <Button type="primary" onClick={createHandler}>Create User</Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
        <UserModal onOk={saveHandler} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
    isCreate: state.userModal.isCreate
  };
}

export default connect(mapStateToProps)(Users);
