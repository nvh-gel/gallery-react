import { Breadcrumb, Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminMenu from "../../components/menu/admin-menu";
import "./admin-page.css";
import CrawlerPage from "./crawler";
import AdminHome from "./home";
import AdminLogin from "./login";
import ModelManager from "./model";
import Unauthorized from "./unauthorized";
import UserManager from "./user";

function AdminPage(props: any) {

    const { colorBgContainer } = theme.useToken().token;
    const { currentUser, setCurrentUser, setSpinning } = props;
    const navigate = useNavigate();
    const location = useLocation();

    return currentUser
        ? (
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
                                <Route key="crawler"
                                    path="/admin/crawler"
                                    element={<CrawlerPage setSpinning={setSpinning} />} />
                                <Route key="user"
                                    path="/admin/user"
                                    element={<UserManager
                                        currentUser={currentUser}
                                        setSpinning={setSpinning}
                                        navigate={navigate}
                                    />}
                                />
                                <Route key="model"
                                    path="/admin/model"
                                    element={<ModelManager setSpinning={setSpinning} />} />
                                <Route key="unauthorized"
                                    path="/admin/unauthorized"
                                    element={<Unauthorized />}
                                />
                                <Route key="home"
                                    path="/admin"
                                    element={<AdminHome />}
                                />
                                <Route key="login"
                                    path="/admin/login"
                                    element={<AdminHome />}
                                />
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            Developed by Eden. Contact us at nvhien2703@outlook.com
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
        : <AdminLogin
            currentUser={currentUser}
            setSpinning={setSpinning}
            setCurrentUser={setCurrentUser}
            target={location.pathname}
        />
}

export default AdminPage;
