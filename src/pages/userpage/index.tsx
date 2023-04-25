import React from "react";
import {Layout} from "antd";
import PageMenu from "../../components/menu/userMenu";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import HomePage from "../home";
import ModelPage from "../model";
import AlbumPage from "../album";
import AboutPage from "../about";
import ContactPage from "../contact";
import LoginPage from "../login";

function UserPage(props: any) {

    const {currentUser, setCurrentUser} = props;

    return (
        <Layout className="app layout">
            <Header className="layout-header">
                <PageMenu currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Header>
            <Content className="content">
                <Routes>
                    <Route path="/" key="home"
                           element={<HomePage/>}
                    />
                    <Route path="/model" key="model"
                           element={<ModelPage/>}
                    />
                    <Route path="/album" key="album"
                           element={<AlbumPage/>}
                    />
                    <Route path="/about" key="about"
                           element={<AboutPage/>}
                    />
                    <Route path="/contact" key="contact"
                           element={<ContactPage/>}
                    />
                    <Route path="/login" key="login"
                           element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
                    />
                </Routes>
            </Content>
            <Footer style={{textAlign: "center"}}>
                Developed by Eden. Contact us at nvhien2703@outlook.com
            </Footer>
        </Layout>
    );
}

export default UserPage;
