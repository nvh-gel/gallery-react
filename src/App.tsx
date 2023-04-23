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

function Page() {

    const location = useLocation();
    const [currentTheme, setCurrentTheme] = useState(defineTheme("/"));

    useEffect(() => {
        setCurrentTheme(defineTheme(location.pathname));
    }, [location]);

    return (
        <div className="container">
            <ConfigProvider theme={currentTheme}>
                <Layout className="app layout">
                    <Header className="layout-header">
                        <PageMenu/>
                    </Header>
                    <Content className="content">
                        <Routes>
                            <Route path="/" key="home" element={<HomePage/>}/>
                            <Route path="/model" key="model" element={<ModelPage/>}/>
                            <Route path="/album" key="album" element={<AlbumPage/>}/>
                            <Route path="/about" key="about" element={<AboutPage/>}/>
                            <Route path="/contact" key="contact" element={<ContactPage/>}/>
                            <Route path="/login" key="login" element={<LoginPage/>}/>
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
