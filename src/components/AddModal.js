import React, { Component } from "react";
import {
  listFacultys,
  listCourses,
  listClasses,
} from "../service/handleRequest";
import { Modal, Form, Input, Button, DatePicker, Radio, Select } from "antd";
import "../assets/css/base.css";
import "../assets/css/addModal.css";

const { Option } = Select;
class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultys: [],
      courses: [],
      classes: [],
      student: {},
    };
  }
  getListFacultys = () => {
    listFacultys()
      .then((res) => {
        const facultys = res.data.map((faculty) => {
          return {
            id: faculty.id,
            ten_khoa: faculty.ten_khoa,
          };
        });
        this.setState({
          facultys,
        });
        console.log(this.state.facultys);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getListCourses = () => {
    listCourses()
      .then((res) => {
        const courses = res.data.map((course) => {
          return {
            id: course.id,
          };
        });
        this.setState({
          courses,
        });
        console.log(this.state.classes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getListClasses = (idKhoa) => {
    listClasses(idKhoa)
      .then((res) => {
        const classes = res.data.map((Class) => {
          return {
            id: Class.id,
          };
        });
        this.setState({
          classes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getListFacultys();
    this.getListCourses();
  }

  handleChangeFaculty = (idKhoa) => {
    this.getListClasses(idKhoa);
  };

  handleOk = (e) => {
    this.props.addOk();
  };

  handleCancel = (e) => {
    this.props.addCancel();
  };

  handleAdd = async (e) => {
    const values = await this.form.setFieldTouched();
    console.log("Success:", values);
  };

  render() {
    const { courses, facultys, classes, student } = this.state;
    return (
      <div>
        <Modal
          title="Thêm sinh viên"
          visible={this.props.isVisible}
          width={800}
          okButtonProps={{ style: { display: "none" } }}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          
        >
          <Form
            form={this.form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            name="basic"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Mã sinh viên"
              name="msv"
              rules={[
                { required: true, message: "Bạn chưa nhập mã sinh viên!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Họ và tên đệm"
              name="ho"
              rules={[
                { required: true, message: "Bạn chưa nhập họ và tên đệm!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="ten"
              rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Quê quán" name="que">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày sinh">
              <DatePicker />
            </Form.Item>

            <Form.Item name="radio-group" label="Giới tính">
              <Radio.Group>
                <Radio value="a">Nữ</Radio>
                <Radio value="b">Nam</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="khoa_so"
              label="Khóa"
              rules={[{ required: true, message: "Bạn chưa chọn khóa!" }]}
            >
              <Select placeholder="Chọn khóa học">
                {courses.map((course, index) => (
                  <Option key={index} value={course.id}>
                    Khóa {course.id}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="khoa"
              label="Khoa"
              rules={[{ required: true, message: "Bạn chưa chọn khoa!" }]}
            >
              <Select
                onChange={this.handleChangeFaculty}
                placeholder="Chọn khoa"
              >
                {facultys.map((faculty, index) => (
                  <Option key={index} value={faculty.id}>
                    {faculty.ten_khoa}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="lop"
              label="lớp"
              rules={[{ required: true, message: "Bạn chưa chọn lớp!" }]}
            >
              <Select placeholder="Chọn khóa học">
                {classes.map((Class, index) => (
                  <Option key={index} value={Class.id}>
                    {Class.id}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                className="btn-primary"
                htmlType="submit"
                onClick={this.handleAdd}
              >
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default AddModal;
