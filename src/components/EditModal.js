import React, { Component } from "react";
import {
  listFacultys,
  listCourses,
  listClasses,
  getStudent,
  editStudent,
} from "../service/handleRequest";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Select,
  notification,
} from "antd";
import "../assets/css/base.css";
import "../assets/css/addModal.css";
import { convertUnixDate } from "../service/convertDate";

const { Option } = Select;
class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultys: [],
      courses: [],
      classes: [],
      student: this.props.student,
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

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

  getDetailStudent = (id) => {
    getStudent(id).then((res) => {
      const student = res.data;
      this.setState({
        student,
      });
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
    console.log(e);
    this.props.addCancel();
  };

  handleEdit = (values) => {
    // values.ngay_sinh = Date.parse(values.ngay_sinh) / 1000;
    // editStudent(this.props.id, values).then((res) => {
    //   this.openNotificationWithIcon("success", "Sửa thành công!");
    //   this.props.addOk();
    // });
    console.log(values);
  };

  render() {
    const { courses, facultys, classes, student } = this.state;
    console.log(student.lop.slice(0, -1));
    return (
      <div>
        <Modal
          title="Thêm sinh viên"
          visible={this.props.isVisible}
          width={800}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          onCancel={this.handleCancel}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            name="basic"
            onFinish={this.handleAdd}
          >
            <Form.Item
              label="Họ và tên đệm"
              name="ho"
              initialValue={student.ho}
              rules={[
                { required: true, message: "Bạn chưa nhập họ và tên đệm!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tên"
              initialValue={student.ten}
              name="ten"
              rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              initialValue={student.que_quan}
              label="Quê quán"
              name="que_quan"
            >
              <Input />
            </Form.Item>

            <Form.Item name="ngay_sinh" label="Ngày sinh">
              <DatePicker />
            </Form.Item>

            <Form.Item initialValue={student.gioi_tinh} name="gioi_tinh" label="Giới tính">
              <Radio.Group>
                <Radio value={false}>Nữ</Radio>
                <Radio value={true}>Nam</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="khoa_so"
              label="Khóa"
              initialValue={student.khoa_so}
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
              initialValue={student.lop.slice(0, -1)}
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
              initialValue={student.lop}
              rules={[{ required: true, message: "Bạn chưa chọn lớp!" }]}
            >
              <Select placeholder="Chọn lớp">
                {classes.map((Class, index) => (
                  <Option key={index} value={Class.id}>
                    {Class.id}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div
              style={{ display: "flex", marginTop: "40px", marginLeft: "50px" }}
            >
              <Form.Item>
                <Button size="middle" className="btn-primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  size="middle"
                  className="btn"
                  onClick={this.handleCancel}
                >
                  Thoát
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default EditModal;
