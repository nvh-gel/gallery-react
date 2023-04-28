import { Col, Row, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/login/form";

function LoginPage(props: any) {

    const { currentUser, setCurrentUser, setSpinning } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser !== null) {
            navigate(-1);
        }
    }, [currentUser, navigate]);

    return (
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Space direction="vertical" className="center-aligned">
                    {
                        currentUser === null
                            ? <LoginForm
                                setCurrentUser={setCurrentUser}
                                setSpinning={setSpinning} />
                            : ""
                    }
                </Space>
            </Col>
        </Row>
    );
}

export default LoginPage;
