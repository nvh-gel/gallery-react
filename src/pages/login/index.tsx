import React from "react";
import {Col, Row, Space, Typography} from "antd";
import LoginForm from "../../components/login";

function LoginPage() {

    return (
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Space direction="vertical" className="center-aligned">
                    <Typography.Title level={2}>Login</Typography.Title>
                    <LoginForm/>
                </Space>
            </Col>
        </Row>
    );
}

export default LoginPage;
