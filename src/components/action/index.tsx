import { DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, message } from "antd";
import axios from "axios";
import { useState } from "react";
import {CrawlItemProp} from "../../interface/CrawlItemProp";
import { ModelData } from "../../interface/ModelData";
import { Urls } from "../../utils/Urls";
import LinkModel from "../modal/link-model";
import MovingModal from "../modal/move-model";

export default function Action(props: CrawlItemProp) {

    const { item, setSpinning, loadData, page, size, editData, setEditData } = props;
    const token = localStorage.getItem('token');
    const [showMovingModal, setShowMovingModal] = useState(false);
    const [movingItem, setMovingItem] = useState<ModelData>();
    const [showLinkModal, setShowLinkModal] = useState(false);

    function handleSkip() {
        setSpinning(true);
        const url = `${Urls.BASE}${Urls.CRAWL}${Urls.MODEL}${Urls.SKIP}/${item.objectId}`;
        axios.put(url, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((e: Error) => {
            setSpinning(false);
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
        setSpinning(true);
        const saveData = retrieveData();
        const url = Urls.BASE + Urls.CRAWL + Urls.MODEL;
        axios.put(url, saveData, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch((e: Error) => {
            setSpinning(false);
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

    function handleLink() {
        setShowLinkModal(true);
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
                setSpinning={setSpinning}
                loadData={loadData}
                page={page}
                size={size}
            />
            <Tooltip placement="right" title="Link">
                <Button type="dashed" shape="circle" onClick={handleLink}>
                    <SwapOutlined />
                </Button>
            </Tooltip>
            <LinkModel showLinkModal={showLinkModal}
                setShowLinkModel={setShowLinkModal}
                objectId={item.objectId}
                setSpinning={setSpinning}
                loadData={loadData}
                page={page}
                size={size}
            />
            <Tooltip placement="right" title="Skip">
                <Button type="default" shape="circle" danger onClick={handleSkip}>
                    <DeleteOutlined />
                </Button>
            </Tooltip>
        </Space>
    );
};
