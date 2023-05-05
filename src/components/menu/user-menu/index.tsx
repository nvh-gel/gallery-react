import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Menu, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { SyntheticEventData } from "react-dom/test-utils";
import { NavLink, useLocation } from "react-router-dom";
import LoginModal from "../../modal/login";
import './menu.css';

function PageMenu(props: any) {

    const location = useLocation().pathname;
    const [currentSelect, setCurrentSelect] = useState(location);
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const { currentUser, setCurrentUser, setSpinning } = props;

    const menuColors = {
        "/": 'rgba(116,204,238,0.7)',
        "/model": 'rgba(125,90,248,0.7)',
        "/album": 'rgba(237,84,76,0.7)',
        "/about": 'rgba(234,163,25,0.7)',
        "/contact": 'rgba(22,181,163,0.7)',
    };
    type ObjectKey = keyof typeof menuColors;

    const menuItems = [{
        key: '/',
        label: <NavLink to="/">Home</NavLink>,
        style: defineMenuItemStyle("/"),
    }, {
        key: '/model',
        label: <NavLink to="/model">Model</NavLink>,
        style: defineMenuItemStyle("/model"),
    }, {
        key: '/album',
        label: <NavLink to="/album">Album</NavLink>,
        style: defineMenuItemStyle("/album"),
    }, {
        key: '/about',
        label: <NavLink to="/about">About Us</NavLink>,
        style: defineMenuItemStyle("/about"),
    }, {
        key: '/contact',
        label: <NavLink to="/contact">Contact</NavLink>,
        style: defineMenuItemStyle("/contact"),
    }, {
        key: '/login',
        icon: currentUser === null
            ? <LockOutlined style={{ fontSize: 20 }} />
            : <UserOutlined style={{ fontSize: 20 }} />,
        children: currentUser === null ? null : [{
            label: currentUser.username,
            key: '/account',
        }, {
            label: 'Logout',
            key: '/logout',
        }],
    }];

    function defineMenuItemStyle(key: ObjectKey): {} {
        if (currentSelect === key) {
            return { backgroundColor: menuColors[key] };
        }
        return {};
    }

    function logout() {
        setCurrentUser(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('level');
        localStorage.removeItem('defaultUrl');
    }

    function handleClick(e: SyntheticEventData) {
        if (e.key === '/login') {
            setModalLoginOpen(true);
        }
        if (e.key === '/logout') {
            return logout();
        }
    }

    useEffect(() => {
        setCurrentSelect(location);
    }, [location]);

    return (
        <Row justify="space-around" className="nav-bar" align="bottom">
            <Col span={8}>
                <NavLink to="/">
                    <Space direction="horizontal">
                        <FontAwesomeIcon icon="gears" size="2xl" />
                        <div className="logo">GALLERY</div>
                    </Space>
                </NavLink>
            </Col>
            <Col span={8}>
                <Menu
                    className="nav-bar"
                    mode="horizontal"
                    selectedKeys={[location]}
                    items={menuItems}
                    onClick={handleClick}
                />
            </Col>
            <LoginModal
                setCurrentUser={setCurrentUser}
                modalLoginOpen={modalLoginOpen}
                setModalLoginOpen={setModalLoginOpen}
                setSpinning={setSpinning}
            />
        </Row>
    );
}

export default PageMenu;
