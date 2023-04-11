import React from "react";
import {Col, Menu, Row, Space} from "antd";
import './menu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";

const menuItems = [{
    key: '/',
    label: <NavLink to="/">Home</NavLink>,
}, {
    key: '/gallery',
    label: <NavLink to="/gallery">Gallery</NavLink>,
}, {
    key: '/about',
    label: <NavLink to="/about">About Us</NavLink>,
}, {
    key: '/contact',
    label: <NavLink to="/contact">Contact</NavLink>,
},];

function PageMenu() {

    const location = useLocation();

    return (
        <Row justify="space-between" className="nav-bar" align="middle">
            <Col span={4}/>
            <Col span={8}>
                <NavLink to="/">
                    <Space direction="horizontal">
                        <FontAwesomeIcon icon="gears" size="2xl"/>
                        <div className="logo">MULTICOLOR</div>
                    </Space>
                </NavLink>
            </Col>
            <Col span={4}/>
            <Col span={8}>
                <Menu className="menu nav-bar"
                      mode="horizontal"
                      items={menuItems}
                      selectedKeys={[location.pathname]}
                />
            </Col>
        </Row>
    );
}

export default PageMenu;
