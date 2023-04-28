import { Divider, Form, Image, Modal, Select, SelectProps, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import ModelData, { Dictionary } from "../../../interface/ModelData";

interface MovingProp {

    showMovingModal: boolean,
    modelData: ModelData | undefined,
    setShowMovingModal: (show: boolean) => void,
    setEditData: (data: Dictionary<ModelData>) => void,
}

export default function MovingModal(props: MovingProp) {

    const { showMovingModal, setShowMovingModal, setEditData, modelData } = props;

    function handleCancel(): void {
        setShowMovingModal(false);
    }

    function handleOk(): void {
        setShowMovingModal(false);
    }

    function toSelectProp(data: string[] | undefined): SelectProps['options'] {

        if (data) {
            return data.map((d: string) => { return { label: d, value: d }; });
        }
        return [];
    }

    return (
        <Modal
            centered={true}
            open={showMovingModal}
            onCancel={handleCancel}
            onOk={handleOk}
            width={640}
        >
            <Form className="form" title="Moving model" layout="horizontal" labelAlign="right">
                <Typography.Title level={3}>{modelData?.name}</Typography.Title>
                <Image src={modelData?.images[0]} preview={false} />
                <Divider />
                <FormItem label="Tags">
                    <Select mode="multiple" options={toSelectProp(modelData?.rel)} defaultValue={modelData?.rel}/>
                </FormItem>
            </Form>
        </Modal>
    );
};
