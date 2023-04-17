import React, {useEffect, useState} from "react";
import {Col, Menu, Row, Space} from "antd";
import './menu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";

function PageMenu() {

    const location = useLocation().pathname;
    const [currentSelect, setCurrentSelect] = useState(location);

    const menuColors = {
        "/": 'rgba(116,204,238,0.7)',
        "/model": 'rgba(125,90,248,0.7)',
        "/gallery": 'rgba(237,84,76,0.7)',
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
        key: '/gallery',
        label: <NavLink to="/gallery">Gallery</NavLink>,
        style: defineMenuItemStyle("/gallery"),
    }, {
        key: '/about',
        label: <NavLink to="/about">About Us</NavLink>,
        style: defineMenuItemStyle("/about"),
    }, {
        key: '/contact',
        label: <NavLink to="/contact">Contact</NavLink>,
        style: defineMenuItemStyle("/contact"),
    },];

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
