import { Modal } from "antd";
import LoginForm from "../form";

export default function LoginModal(props: any) {

    const { setCurrentUser, modalLoginOpen, setModalLoginOpen, setSpinning } = props;

    return (
        <Modal title="Login"
            centered
            open={modalLoginOpen}
            onCancel={() => setModalLoginOpen(false)}
            width={800}
            footer={null}
        >
            <LoginForm
                setCurrentUser={setCurrentUser}
                setModalLoginOpen={setModalLoginOpen}
                setSpinning={setSpinning} />
        </Modal>
    );
};
