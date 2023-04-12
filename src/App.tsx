import React, {useEffect, useState} from 'react';
import './App.css';
import PageMenu from "./components/menu";
import {ConfigProvider, Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";
import PageFooter from "./components/footer";
import HomePage from "./pages/home";
import GalleryPage from "./pages/gallery";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

const themeBlue = {
    token: {
        colorBgBase: '#74ccee',
    }
}
const themeRed = {
    token: {
        colorBgBase: '#ed544c',
    }
}
const themeYellow = {
    token: {
        colorBgBase: '#eaa319',
    }
}
const themeGreen = {
    token: {
        colorBgBase: '#16b5a3',
    }
}

function Page() {

    const location = useLocation();
    const [currentTheme, setCurrentTheme] = useState(themeBlue);

    function defineTheme(pathname: string) {
        switch (pathname) {
            case "/":
                return themeBlue;
            case "/gallery":
                return themeRed;
            case "/about":
                return themeYellow;
            case "/contact":
                return themeGreen;
            default:
                return themeBlue;
        }
    }

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
                            <Route path="/gallery" key="gallery" element={<GalleryPage/>}/>
                            <Route path="/about" key="about" element={<AboutPage/>}/>
                            <Route path="/contact" key="contact" element={<ContactPage/>}/>
                        </Routes>
                    </Content>
                    <Footer>
                        <PageFooter/>
                    </Footer>

                </Layout>
            </ConfigProvider>
        </div>
    )
        ;
}

const App: React.FC = () => (
    <HashRouter>
        <Page/>
    </HashRouter>
);

export default App;
