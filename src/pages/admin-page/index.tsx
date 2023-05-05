import { Breadcrumb, Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import AdminMenu from "../../components/menu/admin-menu";
import "./admin-page.css";
import CrawlerPage from "./crawler";
import ModelManager from "./model";
import UserManager from "./user";

function AdminPage(props: any) {

    const { colorBgContainer } = theme.useToken().token;
    const { currentUser, setCurrentUser, setSpinning } = props;

    return (
        <Layout>
            <Header className="header">
                <div className="logo-admin" />
                <AdminMenu currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </Header>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={
                        [{ title: "Home" }, { title: "Admin" }, { title: "Crawler" }]
                    } />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Routes>
                            <Route key="crawler" path="/admin/crawler" element={<CrawlerPage setSpinning={setSpinning} />} />
                            <Route key="user" path="/admin/user" element={<UserManager setSpinning={setSpinning} />} />
                            <Route key="model" path="/admin/model" element={<ModelManager setSpinning={setSpinning} />} />
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Developed by Eden. Contact us at nvhien2703@outlook.com
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default AdminPage;
