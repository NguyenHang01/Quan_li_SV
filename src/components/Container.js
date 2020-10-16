import React, { Component } from "react";
import { Table } from "antd";
import { listSinhVien } from "../service/handleRequest";

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
          ngay_sinh: student.ngay_sinh
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
      width: 100,
      dataIndex: "msv",
      key: "msv",
    },
    {
      title: "Họ và tên",
      width: 100,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giới tính",
      width: 100,
      dataIndex: "gioi_tinh",
      key: "gioi_tinh",
    },
    {
      title: "Lớp",
      width: 100,
      dataIndex: "lop",
      key: "lop",
    },
    {
      title: "Ngày sinh",
      width: 100,
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
    },
    {
      title: "Quê quán",
      width: 100,
      dataIndex: "que_quan",
      key: "que_quan",
    },
    {
      title: "Xóa",
      key: "xoa",
      width: 100,
      render: () => (
        <a>
          delete
          {/* <DeleteOutlined /> */}
        </a>
      ),
    },
  ];

  render() {
    const { students } = this.state;
    return (
      <div>
        <Table
        bordered={true}
          columns={this.columns}
          dataSource={students}
          scroll={{ x: 900 }}
          pagination={false}
          //   scroll={{ x: 1500, y: 300 }}
        />
      </div>
    );
  }
}
export default Container;
