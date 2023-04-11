import React from 'react';
import './App.css';
import PageMenu from "./components/menu";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {HashRouter, Route, Routes} from "react-router-dom";
import PageFooter from "./components/footer";
import HomePage from "./pages/home";
import GalleryPage from "./pages/gallery";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

function Page() {
    return (
        <div className="container">
            <Layout className="app layout">
                <Header className="layout-header">
                    <PageMenu/>
                </Header>
                <Content className="content">
                    <Routes>
                        <Route path="/" key="home" element={<HomePage/>}/>
                        <Route path="/gallery" key="gallery" element={<GalleryPage/>}/>
                        <Route path="/about" key="about" element={<AboutPage/>}/>
                        <Route path="/contact" key="contact" element={<ContactPage/>}/>
                    </Routes>
                </Content>
                <Footer>
                    <PageFooter/>
                </Footer>
            </Layout>
        </div>
    );
}

const App: React.FC = () => (
    <HashRouter>
        <Page/>
    </HashRouter>
);

export default App;
