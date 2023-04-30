import { DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, message } from "antd";
import axios from "axios";
import { useState } from "react";
import CrawlItemProp from "../../interface/CrawlItemProp";
import { ModelData } from "../../interface/ModelData";
import URLS from "../../utils/URLS";
import MovingModal from "../modal/move-model";

export default function Action(props: CrawlItemProp) {

    const { item, setSpinning, loadData, page, size, editData, setEditData } = props;
    const token = localStorage.getItem('token');
    const spinning = setSpinning ? setSpinning : (spin: boolean) => { };
    const [showMovingModal, setShowMovingModal] = useState(false);
    const [movingItem, setMovingItem] = useState<ModelData>();

    function handleSkip() {
        spinning(true);
        const url = URLS.BASE + URLS.CRAWL_MODEL + URLS.SKIP + '/' + item.objectId;
        axios.put(url, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((e: Error) => {
            spinning(false);
            message.error(e.message);
        }).then((response) => {
            if (loadData && page && size) {
                message.success(response?.data.message).then(() => loadData(page, size));
            }
        });
    }

    function retrieveData(): ModelData {
        return editData && editData[item.objectId] && editData[item.objectId] !== null
            ? editData[item.objectId]
            : item;
    }

    function handleSave() {
        spinning(true);
        const saveData = retrieveData();
        const url = URLS.BASE + URLS.CRAWL_MODEL;
        axios.put(url, saveData, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch((e: Error) => {
            spinning(false);
            message.error(e.message);
        }).then((response) => {
            if (loadData && page && size) {
                message.success(`${response?.data.message} ${response?.data.data}`)
                    .then(() => loadData(page, size));
            }
            if (editData && editData[item.objectId] && setEditData) {
                delete editData[item.objectId];
                setEditData(editData);
            }
        });
    }

    function handleMove() {
        const moveData = retrieveData();
        if (setShowMovingModal && setMovingItem) {
            setMovingItem(moveData);
            setShowMovingModal(true);
        }
    }

    return (
        <Space size="middle" direction="vertical">
            <Tooltip placement="right" title="Save">
                <Button type="primary" shape="circle" name="save" onClick={handleSave}>
                    <DownloadOutlined />
                </Button>
            </Tooltip>
            <Tooltip placement="right" title="Move">
                <Button type="default" shape="circle" name="move" onClick={handleMove}>
                    <LoginOutlined />
                </Button>
            </Tooltip>
            <MovingModal showMovingModal={showMovingModal}
                setShowMovingModal={setShowMovingModal}
                modelData={movingItem}
                setEditData={setEditData}
            />
            <Tooltip placement="right" title="Link">
                <Button type="dashed" shape="circle">
                    <SwapOutlined />
                </Button>
            </Tooltip>
            <Tooltip placement="right" title="Skip">
                <Button type="default" shape="circle" danger onClick={handleSkip}>
                    <DeleteOutlined />
                </Button>
            </Tooltip>
        </Space>
    );
};
