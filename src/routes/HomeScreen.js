import React, { Component } from "react";
import { Button, Table, Popconfirm, notification } from "antd";
import {
  listStudents,
  deleteStudent,
  getStudent,
} from "../service/handleRequest";
import { convertUnixDate } from "../service/convertDate";
import {Link, Route, Switch} from "react-router-dom";
import "../assets/css/base.css";
import "../assets/css/homeScreen.css";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isVisibleModalEdit: false,
      isVisibleModalAdd: false,
      studentEdit: {},
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  async getListStudents() {
    let students = [];
    await listStudents()
      .then((res) => {
        students = res.data.map((student) => {
          return {
            msv: student.id,
            ten: student.ho + " " + student.ten,
            gioi_tinh: student.gioi_tinh ? "nam" : "nữ",
            lop: student.lop + "-K" + student.khoa_so,
            que_quan: student.que_quan,
            ngay_sinh: convertUnixDate(student.ngay_sinh),
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return students;
  }

  async componentDidMount() {
    const students = await this.getListStudents();
    this.setState({
      students,
    });
  }

  handleButtonAdd = () => {
    this.setState({
      isVisibleModalAdd: true,
    });
  };

  addOk = async () => {
    const students = await this.getListStudents();
    await this.setState({
      students,
      isVisibleModalAdd: false,
      isVisibleModalEdit: false,
    });
  };

  addCancel = async () => {
    await this.setState({
      isVisibleModalAdd: false,
      isVisibleModalEdit: false,
    });
  };

  handleButtonDelete = async (id) => {
    const { students } = this.state;
    deleteStudent(id)
      .then((res) => {
        this.openNotificationWithIcon("success", "Xóa thành công!");
        const newStudents = students.filter((item) => item.msv !== id);
        this.setState({
          students: newStudents,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDetailStudent = async (id) => {
    await getStudent(id)
      .then((res) => {
        const student = res.data;
        this.setState({
          studentEdit: student,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setId = async (id) => {
    await this.getDetailStudent(id);
    this.setState({
      isVisibleModalEdit: true,
    });
  };

  columns = [
    {
      title: "MSV",
      dataIndex: "msv",
      className: "column-list",
      render: (text, record) => (
        <div>
          <Link to={`/detail/${record.msv}`}>{text}</Link>
         
        </div>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "ten",
      className: "column-list",
    },
    {
      title: "Giới tính",
      dataIndex: "gioi_tinh",
      className: "column-list",
    },
    {
      title: "Lớp",
      dataIndex: "lop",
      className: "column-list",
      visible: false
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngay_sinh",
      className: "column-list",
    },
    {
      title: "Quê quán",
      dataIndex: "que_quan",
      className: "column-list",
    },
    {
      title: "",
      key: "action",
      className: "column-list",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => this.handleButtonDelete(record.msv)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="icon-action icon-delete" />
          </Popconfirm>

          <EditOutlined
            onClick={() => this.setId(record.msv)}
            className="icon-action icon-edit"
          />
        </div>
      ),
    },
  ];

  render() {
    const {
      students,
      isVisibleModalAdd,
      isVisibleModalEdit,
      studentEdit,
    } = this.state;
    return (
      <div>
        <div className="header-list">
          <h1 className="title-list">Danh sách sinh viên</h1>
          <Button
            onClick={this.handleButtonAdd}
            className="btn-add btn-primary"
            icon={
              <PlusCircleTwoTone
                className="button-add-icon"
                twoToneColor="rgb(37, 132, 195)"
              />
            }
          >
            Sinh viên
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={students}
          pagination={false}
          scroll={{ x: 1000 }}
          bordered
        />
        {isVisibleModalAdd ? (
          <AddModal
            isVisible={isVisibleModalAdd}
            addOk={this.addOk}
            addCancel={this.addCancel}
          />
        ) : null}
        {isVisibleModalEdit ? (
          <EditModal
            student={studentEdit}
            isVisible={isVisibleModalEdit}
            addOk={this.addOk}
            addCancel={this.addCancel}
          />
        ) : null}
      </div>
    );
  }
}
export default HomeScreen;
