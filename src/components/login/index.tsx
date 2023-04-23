import React from "react";
import {Button, Form, Input} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import URL_CONFIG from "../../utils/URL_CONFIG";
import axios from "axios";
import User from "../../interface/User";

function LoginForm(props: any) {

    const {setCurrentUser} = props;

    function attemptLogin(data: any) {
        const url = URL_CONFIG.BASE + URL_CONFIG.AUTH + URL_CONFIG.LOGIN;
        axios.post(url, {
            username: data.username,
            password: data.password
        }).catch((ex: Error) => {
            console.log(ex);
        }).then((response) => {
            const data = response?.data.data;
            const user: User = {
                username: data.username,
                token: data.token,
            }
            setCurrentUser(user);
        });
    }

    return (
        <Form name="login"
              className="form"
              labelCol={{span: 6}}
              wrapperCol={{span: 14}}
              initialValues={{remember: true}}
              autoComplete="off"
              onFinish={attemptLogin}
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
            <Form.Item wrapperCol={{offset: 6, span: 14}}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
