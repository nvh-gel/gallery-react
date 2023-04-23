import React, {useEffect, useState} from "react";
import {Col, Menu, Row, Space, Typography} from "antd";
import './menu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

function PageMenu(props: any) {

    const location = useLocation().pathname;
    const [currentSelect, setCurrentSelect] = useState(location);

    const {currentUser} = props;

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
        label:
            <Typography.Link>
                {currentUser !== null
                    ? <UserOutlined style={{fontSize: 24}}/>
                    : <LockOutlined style={{fontSize: 24}}/>
                }
            </Typography.Link>
    }];

    function defineMenuItemStyle(key: ObjectKey): {} {
        if (currentSelect === key) {
            return {backgroundColor: menuColors[key]};
        }
        return {};
    }

    useEffect(() => {
        setCurrentSelect(location);
    }, [location]);

    return (
        <Row justify="space-around" className="nav-bar" align="bottom">
            <Col span={8}>
                <NavLink to="/">
                    <Space direction="horizontal">
                        <FontAwesomeIcon icon="gears" size="2xl"/>
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
                />
            </Col>
        </Row>
    );
}

export default PageMenu;
