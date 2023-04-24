import React, {useEffect, useState} from 'react';
import './App.css';
import PageMenu from "./components/menu";
import {ConfigProvider, Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";
import PageFooter from "./components/footer";
import HomePage from "./pages/home";
import AlbumPage from "./pages/album";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import defineTheme from "./Theme";
import ModelPage from "./pages/model";
import LoginPage from "./pages/login";
import User from "./interface/User";

function Page() {

    const location = useLocation();
    const [currentTheme, setCurrentTheme]
        = useState(defineTheme("/"));
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        setCurrentTheme(defineTheme(location.pathname));

        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if (username !== null && token !== null) {
            const loggedInUser: User = {
                username: username,
                token: token,
            }
            console.log(loggedInUser);
            setCurrentUser(loggedInUser);
        }
    }, [location]);

    return (
        <div className="container">
            <ConfigProvider theme={currentTheme}>
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
                    <Footer>
                        <PageFooter/>
                    </Footer>

                </Layout>
            </ConfigProvider>
        </div>
    );
}

const App: React.FC = () => (
    <HashRouter>
        <Page/>
    </HashRouter>
);

export default App;
