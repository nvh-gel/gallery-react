import React from "react";
import {Button, Form, Input} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

function LoginForm() {

    return (
        <Form name="login"
              className="form"
              labelCol={{span: 6}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username">
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password">
                <Input type="password"/>
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{offset: 6, span: 8}}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 6, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm
