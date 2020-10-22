import React, { Component } from "react";
import { getStudent, getFaculty } from "../service/handleRequest";
import { Button, Col, Row } from "antd";
import { UserOutlined, EditTwoTone } from "@ant-design/icons";
import "../assets/css/detailScreen.css";
import { convertUnixDate } from "../service/convertDate";

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      faculty: {},
    };
  }

  getDetailStudent = async (id) => {
    await getStudent(id)
      .then((res) => {
        const student = res.data;
        this.setState({
          student,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDetailFaculty = (id) => {
    getFaculty(id)
      .then((res) => {
        const faculty = res.data;
        this.setState({
          faculty,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async componentDidMount() {
    await this.getDetailStudent(this.props.match.params.id);
    this.getDetailFaculty(this.state.student.khoa);
  }
  render() {
    const { student, faculty } = this.state;
    console.log(student);
    return (
      <div className="detail-content">
        <Row>
          <Col span={10}>
            <div className="avatar">
              <div className="avatar-img">
                <img src="https://kenh14cdn.com/2019/8/10/photo-1-1565418850012849840930.jpeg" />
              </div>
              <div className="avatar-contact">
                <div className="contact-group">
                  <span className="contact-group-title">Email: </span>
                  <span className="contact-group-infor">
                    nguyenlinhchi@gmail.com{" "}
                  </span>
                </div>
                <div className="contact-group">
                  <span className="contact-group-title">Số điện thoại: </span>
                  <span className="contact-group-infor">0988 070 478 </span>
                </div>
                <div className="contact-group">
                  <span className="contact-group-title">Microsoft Teams: </span>
                  <span className="contact-group-infor">
                    linhchi17120324@st.utc.edu.vn
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={14}>
            <div className="profile">
              <Row>
                <div className="profile-content" style={{ width: "100%" }}>
                  <Row>
                    <Col span={8}>
                      <h3>Mã sinh viên: </h3>
                    </Col>
                    <Col span={10}>000{student.id}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Họ và tên đệm: </h3>
                    </Col>
                    <Col span={10}>{student.ho}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Tên: </h3>
                    </Col>
                    <Col span={10}>{student.ten}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Giới tính: </h3>
                    </Col>
                    <Col span={10}>{student.gioi_tinh ? "Nam" : "Nữ"}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Ngày sinh: </h3>
                    </Col>
                    <Col span={10}>{convertUnixDate(student.ngay_sinh)}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Quê quán: </h3>
                    </Col>
                    <Col span={10}>{student.que_quan}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Khóa: </h3>
                    </Col>
                    <Col span={10}>K{student.khoa_so}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Khoa: </h3>
                    </Col>
                    <Col span={10}>{faculty.ten_khoa}</Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      <h3>Lớp: </h3>
                    </Col>
                    <Col span={10}>{student.lop}</Col>
                  </Row>
                </div>
              </Row>
              <Row>
                <div className="profile-action">
                  <Button
                    // onClick={this.handleButtonAdd}
                    className="btn-edit btn-primary"
                    icon={
                      <EditTwoTone
                        className="button-edit-icon"
                        twoToneColor="rgb(37, 132, 195)"
                      />
                    }
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailScreen;
