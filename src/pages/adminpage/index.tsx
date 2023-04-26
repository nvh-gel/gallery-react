import React from "react";
import {Breadcrumb, Layout, theme} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./adminpage.css"
import AdminSider from "../../components/menu/adminSider";
import AdminMenu from "../../components/menu/adminMenu";
import {Route, Routes} from "react-router-dom";
import CrawlerPage from "../crawler";


function AdminPage(props: any) {

    const {colorBgContainer} = theme.useToken().token;
    const {currentUser, setCurrentUser, setSpinning} = props;

    return (
        <Layout>
            <Header className="header">
                <div className="logo-admin"/>
                <AdminMenu currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Header>
            <Layout>
                <AdminSider/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}} items={
                        [{title: "Home"}, {title: "Admin"}, {title: "Crawler"}]
                    }/>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Routes>
                            <Route key="crawler" path="/admin/crawler" element={<CrawlerPage setSpinning={setSpinning}/>}/>
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
