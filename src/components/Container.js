import React, { Component } from "react";
import { Button, Table } from "antd";
import { listStudents } from "../service/handleRequest";
import "../assets/css/base.css";
import "../assets/css/container.css";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import AddModal from "./AddModal";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isVisibleModalAdd: false,
    };
  }

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
            ngay_sinh: student.ngay_sinh,
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

  addOk= async () => {
    const students = await this.getListStudents();
    await this.setState({
      students,
      isVisibleModalAdd: false,
    });
  };

  addCancel=async()=>{
    await this.setState({
      isVisibleModalAdd: false
    })
  }

  columns = [
    {
      title: "MSV",
      dataIndex: "msv",
      className: "column-list",
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
      render: () => (
        <div>
          <DeleteOutlined className="icon-action icon-delete" />
          <EditOutlined className="icon-action icon-edit" />
        </div>
      ),
    },
  ];

  render() {
    const { students, isVisibleModalAdd } = this.state;
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
          bordered
        />
        <AddModal isVisible={isVisibleModalAdd} addOk={this.addOk}  addCancel={this.addCancel}/>
      </div>
    );
  }
}
export default Container;
