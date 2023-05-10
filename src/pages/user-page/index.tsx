import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import PageMenu from "../../components/menu/user-menu";
import AboutPage from "./about";
import AlbumPage from "./album";
import ContactPage from "./contact";
import HomePage from "./home";
import LoginPage from "./login";
import ModelPage from "./model";
import OAuth2CallBackPage from "./oauth";

export default function UserPage(props: any) {

    const { currentUser, setCurrentUser, setSpinning } = props;

    return (
        <Layout className="app layout">
            <Header className="layout-header">
                <PageMenu currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setSpinning={setSpinning} />
            </Header>
            <Content className="content">
                <Routes>
                    <Route path="/" key="home"
                        element={<HomePage />}
                    />
                    <Route path="/model" key="model"
                        element={<ModelPage />}
                    />
                    <Route path="/album" key="album"
                        element={<AlbumPage />}
                    />
                    <Route path="/about" key="about"
                        element={<AboutPage />}
                    />
                    <Route path="/contact" key="contact"
                        element={<ContactPage />}
                    />
                    <Route path="/login" key="login"
                        element={<LoginPage
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setSpinning={setSpinning}
                        />}
                    />
                    <Route path="/oauth2/callback" key="oauth2"
                        element={<OAuth2CallBackPage  setCurrentUser={setCurrentUser}/>}
                    />
                </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Developed by Eden. Contact us at nvhien2703@outlook.com
            </Footer>
        </Layout>
    );
};
