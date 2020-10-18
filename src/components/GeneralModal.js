import React, { Component } from "react";
import { Modal, Form, Input, Button } from "antd";
class GeneralModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = (e) => {
    this.props.reloadData();
  };

  handleCancel = (e) => {};

  render() {
    const {} = this.state;
    return (
      <div>
        <Modal
          title="Thêm sinh viên"
          visible={this.props.isVisible}
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            name="basic"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item wrapperCol= {{ offset: 8, span: 16 }} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item wrapperCol= {{ offset: 8, span: 16 }} >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default GeneralModal;
