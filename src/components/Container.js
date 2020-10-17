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
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    listSinhVien().then((res) => {
      const students = res.data.map((student) => {
        return {
          msv: student.id,
          ten: student.ho + " " + student.ten,
          gioi_tinh: student.gioi_tinh ? "nam" : "nữ",
          lop: student.lop + "-K" + student.khoa_so,
          que_quan: student.que_quan,
          ngay_sinh: student.ngay_sinh,
        };
      });
      this.setState({
        students,
      });
    });
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
      title: "Xóa",
      key: "xoa",
      className: "column-list",
      render: () => (
        <div>
          <DeleteOutlined className="icon-action" />
          <EditOutlined className="icon-action" />
        </div>
      ),
    },
  ];

  render() {
    const { students } = this.state;
    return (
      <div>
        <div>
          <h3 className="title-list">Danh sách sinh viên</h3>
          <Button
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
          scroll={{ x: 1000 }}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}
export default Container;
