import React from "react";
import {Breadcrumb, Layout, theme} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./adminpage.css"
import AdminSider from "../../components/menu/adminSider";
import AdminMenu from "../../components/menu/adminMenu";
import {Route, Routes} from "react-router-dom";
import CrawlerPage from "../crawler";


function AdminPage() {

    const {colorBgContainer} = theme.useToken().token;

    return (
        <Layout>
            <Header className="header">
                <div className="logo-admin"/>
                <AdminMenu/>
            </Header>
            <Layout>
                <AdminSider/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Routes>
                            <Route key="crawler" path="/admin/crawler" element={<CrawlerPage/>}/>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: "center"}}>
                        Developed by Eden. Contact us at nvhien2703@outlook.com
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default AdminPage;
