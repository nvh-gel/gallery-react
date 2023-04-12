import React from "react";
import {Col, Menu, Row, Space} from "antd";
import './menu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";

const menuItems = [{
    key: '/',
    label: <NavLink to="/">Home</NavLink>,
    color: '#74ccee',
}, {
    key: '/gallery',
    label: <NavLink to="/gallery">Gallery</NavLink>,
    color: '#ed544c',
}, {
    key: '/about',
    label: <NavLink to="/about">About Us</NavLink>,
    color: '#eaa319',
}, {
    key: '/contact',
    label: <NavLink to="/contact">Contact</NavLink>,
    color: '#16b5a3',
},];

function PageMenu() {

    const location = useLocation();

    return (
        <Row justify="space-around" className="nav-bar" align="bottom">
            <Col span={8}>
                <NavLink to="/">
                    <Space direction="horizontal">
                        <FontAwesomeIcon icon="gears" size="2xl"/>
                        <div className="logo">MULTICOLOR</div>
                    </Space>
                </NavLink>
            </Col>
            <Col span={8}>
                <Menu
                    className="nav-bar"
                    mode="horizontal"
                    items={menuItems}
                    selectedKeys={[location.pathname]}
                    style={{float: "right"}}
                />
            </Col>
        </Row>
    );
}

export default PageMenu;
