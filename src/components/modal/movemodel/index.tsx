import { DatePicker, Divider, Form, InputNumber, Modal, Select, SelectProps, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { Dictionary, ModelData, ModelTag } from "../../../interface/ModelData";
import ImageBox from "../../image_box";

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

    function toSelectProp(data: ModelTag[] | undefined): SelectProps['options'] {
        if (data) {
            return data.map((d: ModelTag) => {
                return { label: d.name, value: d.name };
            });
        }
        return [];
    }

    const defaultTags = modelData?.rel
        .filter((tag) => !tag.isCategory && !tag.isPublisher)
        .map((tag) => tag.name);

    return (
        <Modal
            centered={true}
            open={showMovingModal}
            onCancel={handleCancel}
            onOk={handleOk}
            width={800}
            key={modelData?.objectId}
        >
            <Form className="form"
                layout="horizontal"
                labelAlign="right"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
            >
                <Typography.Title level={3} editable>{modelData?.name}</Typography.Title>
                <ImageBox images={modelData?.images} />
                <Divider />
                <FormItem label="Nicks">
                    <Select mode="multiple"
                        options={toSelectProp(modelData?.rel)}
                        defaultValue={defaultTags} />
                </FormItem>
                <FormItem label="Day of birth" name="dob">
                    <DatePicker />
                </FormItem>
                <FormItem label="Sizes" style={{ marginBottom: 0 }}>
                    <FormItem name="boob" style={{ display: 'inline-block' }}>
                        <InputNumber min={0} max={100} />
                    </FormItem>
                    {' - '}
                    <FormItem name="waist" style={{ display: 'inline-block' }}>
                        <InputNumber min={0} max={100} />
                    </FormItem>
                    {' - '}
                    <FormItem name="hip" style={{ display: 'inline-block' }}>
                        <InputNumber min={0} max={100} />
                    </FormItem>
                </FormItem>
                <FormItem label="Description" name="description">
                    <TextArea></TextArea>
                </FormItem>
            </Form>
        </Modal >
    );
};
