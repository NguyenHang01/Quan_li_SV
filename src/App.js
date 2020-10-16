import React from 'react';
import { Layout, Image } from 'antd';
import logo from './assets/img/logo_gtvt.png';
import './assets/css/home.css'

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <img className="logo" src={logo} alt="logo"></img>
      </Header>
    <Content style={{ padding: '0 50px' }}>
    <div className="site-layout-content">Content</div>
    </Content>
    <Footer className="footer" >
      Trường đại học Giao thông Vận Tải ©2018
    </Footer>
    </Layout>
  );
}



export default App;
