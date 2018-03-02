import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

function UserModal({ dispatch, visible, isCreate, record, form, onOk }) {
  function okHandler() {
    form.validateFields((err, values) => {
      if (!err) {
        onOk(record.id, values);
        hideModelHandler();
      }
    });
  }

  function hideModelHandler() {
    form.resetFields();
    dispatch({
      type: 'userModal/hide'
    });
  }

  const { getFieldDecorator } = form;
  const { name, email, website } = record;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Modal
      title={isCreate ? 'Create User' : 'Edit User'}
      visible={visible}
      onOk={okHandler}
      onCancel={hideModelHandler}
    >
      <Form onSubmit={okHandler}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {
            getFieldDecorator('name', {
              initialValue: name
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Email"
        >
          {
            getFieldDecorator('email', {
              initialValue: email
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Website"
        >
          {
            getFieldDecorator('website', {
              initialValue: website
            })(<Input />)
          }
        </FormItem>
      </Form>
    </Modal>
  );
}

function mapStateToProps(state) {
  const { visible, record, isCreate } = state.userModal;
  return {
    visible,
    isCreate,
    record
  };
}

export default connect(mapStateToProps)(Form.create()(UserModal));
