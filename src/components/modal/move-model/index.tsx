import {
    Button, DatePicker, Divider, Form, Input, InputNumber, Modal, Select, SelectProps, Typography, message
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useState } from "react";
import { Model, ModelData, ModelTag } from "../../../interface/ModelData";
import { config } from "../../../utils/Requests";
import { Urls } from "../../../utils/Urls";
import ImageBox from "../../image-box";

interface MovingProp {

    showMovingModal: boolean,
    modelData?: ModelData,
    setShowMovingModal: (show: boolean) => void,
    setSpinning?: Dispatch<SetStateAction<boolean>>,
    loadData?: (p: number, s: number) => void,
    page?: number,
    size?: number,
}

export default function MovingModal(props: MovingProp) {

    const { showMovingModal, setShowMovingModal, modelData, setSpinning, loadData, page, size }
        = props;
    const [form] = useForm();
    const defaultTags = modelData?.rel
        .filter((tag) => !tag.isCategory && !tag.isPublisher)
        .map((tag) => tag.name);
    const [currentIndex, setCurrentIndex] = useState(0);
    const spinning = setSpinning ? setSpinning : () => { };

    function handleCancel(): void {
        setShowMovingModal(false);
    }

    function handleSubmit(data: any): void {
        setShowMovingModal(false);
        spinning(true);
        const moveData = prepareMoveData(data);
        const url = Urls.BASE + Urls.CRAWL_MODEL + Urls.MOVE;
        axios.post(url, moveData, config)
            .catch((ex: Error) => {
                message.error(ex.message);
                spinning(false);
            })
            .then((response) => {
                message.success(response?.data.message);
                if (loadData && page && size) {
                    loadData(page, size);
                }
            })
    }

    function prepareMoveData(data: any): Model {
        return {
            objectId: modelData?.objectId,
            name: modelData?.name,
            nativeName: data.nativeName,
            url: modelData?.url,
            thumbnail: modelData?.images[currentIndex],
            dateOfBirth: data.dob?.toDate(),
            yearOfBirth: data.yob?.year(),
            boob: data.boob,
            waist: data.waist,
            hip: data.hip,
            description: data.description,
            nicknames: modelData?.rel
                .filter((t) => data.nicks?.includes(t.name))
                .map((t) => { return { nick: t.name, url: t.url } }),
        }
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
                name="moving-form"
                className="form"
                layout="horizontal"
                labelAlign="right"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleSubmit}
            >
                <Typography.Title level={3} editable>{modelData?.name}</Typography.Title>
                <ImageBox images={modelData?.images}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex} />
                <Divider />
                <FormItem label="Native name" name="nativeName">
                    <Input />
                </FormItem>
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
                    <TextArea />
                </FormItem>
            </Form>
        </Modal >
    );
};
