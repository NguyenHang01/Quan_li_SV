import React, { Component } from "react";
import { Button, Table } from "antd";
import { listSinhVien } from "../service/handleRequest";
import "../assets/css/base.css";
import "../assets/css/container.css";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import GeneralModal from "./GeneralModal";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isAdd: false,
    };
  }

  async getListSV() {
    let students = [];
    await listSinhVien()
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
    const students = await this.getListSV();
    this.setState({
      students,
    });
  }

  handleButtonAdd = () => {
    this.setState({
      isAdd: true,
    });
  };

  reloadData = async () => {
    const students = await this.getListSV();
    await this.setState({
      students,
      isAdd: false,
    });
  };

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
    const { students, isAdd } = this.state;
    return (
      <div>
        <div className="header-list">
          <h1 className="title-list">Danh sách sinh viên</h1>
          <Button
            onClick={this.handleButtonAdd}
            className="button-add"
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
        <GeneralModal isVisible={isAdd} reloadData={this.reloadData} />
      </div>
    );
  }
}
export default Container;
