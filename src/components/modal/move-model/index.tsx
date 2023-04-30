import { Button, DatePicker, Divider, Form, InputNumber, Modal, Select, SelectProps, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import { Dictionary, ModelData, ModelTag } from "../../../interface/ModelData";
import ImageBox from "../../image_box";

interface MovingProp {

    showMovingModal: boolean,
    modelData: ModelData | undefined,
    setShowMovingModal: (show: boolean) => void,
    setEditData: Dispatch<SetStateAction<Dictionary<ModelData>>> | undefined,
}

export default function MovingModal(props: MovingProp) {

    const { showMovingModal, setShowMovingModal, setEditData, modelData } = props;
    const [form] = useForm();
    const defaultTags = modelData?.rel
        .filter((tag) => !tag.isCategory && !tag.isPublisher)
        .map((tag) => tag.name);

    function handleCancel(): void {
        setShowMovingModal(false);
    }

    function handleSubmit(data: any): void {
        console.log(data);
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

    function handleDatePick(value: Dayjs | null, dateString: string): void {
        if (value && value !== null && dateString !== null) {
            form.setFieldValue("yob", dayjs(dateString));
        }
    }

    return (
        <Modal
            centered={true}
            open={showMovingModal}
            width={800}
            key={modelData?.objectId}
            footer={[
                <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                <Button form="moving-form" key="submit" htmlType="submit" type="primary">Move</Button>
            ]}
            onCancel={handleCancel}
        >
            <Form form={form}
                className="form"
                layout="horizontal"
                labelAlign="right"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleSubmit}
            >
                <Typography.Title level={3} editable>{modelData?.name}</Typography.Title>
                <ImageBox images={modelData?.images} />
                <Divider />
                <FormItem label="Nicks" name="nicks" initialValue={defaultTags}>
                    <Select mode="tags" options={toSelectProp(modelData?.rel)} allowClear />
                </FormItem>
                <FormItem label="Day of birth" style={{ marginBottom: 0 }}>
                    <FormItem name="dob" style={{ display: 'inline-block' }}>
                        <DatePicker onChange={handleDatePick} />
                    </FormItem>
                    <FormItem name="yob" style={{ display: 'inline-block' }}>
                        <DatePicker picker="year" />
                    </FormItem>
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
