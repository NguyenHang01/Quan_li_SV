import "antd/dist/antd.css";
import React from "react";
import { Layout } from "antd";
import logo from "./assets/img/logo_gtvt.png";
import "./assets/css/base.css";
import "./assets/css/app.css";
import Container from "./routes";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <img className="logo" src={logo} alt="logo"></img>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Container/>
        </div>
      </Content>

      <Footer className="footer">
        <span className="footer-text">Trường đại học Giao thông Vận Tải ©2018</span>
      </Footer>
    </Layout>
  );
}

export default App;
