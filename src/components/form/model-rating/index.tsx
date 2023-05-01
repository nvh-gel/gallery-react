import { Form, InputNumber } from "antd";
import { useState } from "react";
import { CrawlItemProp } from "../../../interface/CrawlItemProp";
import { ModelData, calculateAverage } from "../../../interface/ModelData";
import "./model-rating.css";

function RatingForm(props: CrawlItemProp) {

    const { item, editData, setEditData } = props;
    const [current, setCurrent] = useState(item)
    const [form] = Form.useForm();

    function handleFormValueChange(e: any) {
        let editing: ModelData = { ...current, ...e };
        const fc = +editing.fc;
        const bd = +editing.bd;
        const sx = +editing.sx;
        const ct = +editing.ct;
        const bb = +editing.bb;
        const wa = +editing.wa;
        const hi = +editing.hi;
        const numberOfAlbum = editing.numberOfAlbum > 10 ? 10 : editing.numberOfAlbum;
        editing.fc = fc;
        editing.bd = bd;
        editing.sx = sx;
        editing.ct = ct;
        editing.bb = bb;
        editing.wa = wa;
        editing.hi = hi;
        const avg = calculateAverage([fc, bd, sx, ct, bb, wa, hi, numberOfAlbum]);
        editing.avg = avg;
        setCurrent(editing);
        if (editData && setEditData) {
            editData[editing.objectId] = editing;
            setEditData(editData);
        }
        form.setFieldValue("avg", avg);
    }

    return (
        <Form name="rating"
            layout="inline"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            size="small"
            onValuesChange={handleFormValueChange}
        >
            <Form.Item label="FC" labelAlign="right" name="fc" className="form-rating-item"
                initialValue={current.fc}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="BD" labelAlign="right" name="bd" className="form-rating-item"
                initialValue={current.bd}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="SX" labelAlign="right" name="sx" className="form-rating-item"
                initialValue={current.sx}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="CT" labelAlign="right" name="ct" className="form-rating-item"
                initialValue={current.ct}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="BB" labelAlign="right" name="bb" className="form-rating-item"
                initialValue={current.bb}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="WA" labelAlign="right" name="wa" className="form-rating-item"
                initialValue={current.wa}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item labelAlign="right" className="form-rating-item" label="HI" name="hi"
                initialValue={current.hi}>
                <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="AVG" labelAlign="right" name="avg" className="form-rating-item"
                initialValue={current.avg}>
                <InputNumber disabled />
            </Form.Item>
        </Form>
    );
}

export default RatingForm;
