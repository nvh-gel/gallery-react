import { Carousel, Col, Divider, Image, List, Row, Space, Tag, Typography, message } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Action from "../../components/action";
import RatingForm from "../../components/form/modelrating";
import MovingModal from "../../components/modal/movemodel";
import { Dictionary, ModelData } from "../../interface/ModelData";
import URLS from "../../utils/URLS";
import "./crawler.css";

const { Link } = Typography;

function CrawlerPage(props: any) {

    const { setSpinning } = props;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [size, setSize] = useState(10);
    const [editData, setEditData] = useState<Dictionary<ModelData>>({});
    const [showMovingModal, setShowMovingModal] = useState(false);
    const [movingItem, setMovingItem] = useState<ModelData>();
    const paging: PaginationConfig = {
        onChange: handlePageChange,
        pageSize: size,
        total: total,
        responsive: true,
        hideOnSinglePage: true,
        showQuickJumper: false,
        showSizeChanger: false,
    }
    const token = localStorage.getItem("token");

    const loadData = useCallback((page: number, size: number) => {
        setSpinning(true);
        const pagingParam = `/${page}/${size}`;
        const url = URLS.BASE + URLS.CRAWL_MODEL + pagingParam;
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).catch((e: Error) => {
            setSpinning(false);
            message.error(e.message);
        }).then((response) => {
            const result = response?.data.data;
            result.forEach((m: ModelData) => {
                m.key = m.objectId
            });
            const total: number = response?.data.extra.total
            setData(result);
            setTotal(total);
            setSpinning(false);
        });
    }, [setSpinning, token])

    const meta = (item: ModelData) => {
        return (
            <List.Item.Meta
                title={
                    <Space direction="vertical">
                        <Link href={item.url} target="_blank">{item.name}</Link>
                        <Divider />
                    </Space>
                }
                description={item.rel.map((tag) => {
                    let color = tag.isPublisher ? 'blue' : 'green'
                    color = tag.isCategory ? 'red' : color
                    return <Tag key={tag.name} color={color} className="model-tag">{tag.name.toUpperCase()}</Tag>;
                })}
            />
        );
    }

    const carousel = (item: ModelData) => {
        return (
            <Image.PreviewGroup key={item.objectId}>
                <Carousel autoplay>
                    {item.images.map((image) => {
                        const key = Math.random();
                        return (
                            <Image key={`${image}-${key}`} src={image} width={685} height={360} />
                        );
                    })}
                </Carousel>
            </Image.PreviewGroup>
        );
    }

    function handlePageChange(pageNumber: number, pageSize: number) {
        setSpinning(true);
        setData([]);
        setPage(pageNumber);
        setSize(pageSize);
    }

    useEffect(() => {
        loadData(page, size);
    }, [page, size, setSpinning, token, loadData])

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={paging}
            renderItem={(item: ModelData) => {
                return (
                    <List.Item key={item.objectId}>
                        <Row align="middle" justify="space-between">
                            <Col span={4}>{meta(item)}</Col>
                            <Col span={12}>{carousel(item)}</Col>
                            <Col span={6}>
                                <RatingForm
                                    item={item}
                                    editData={editData}
                                    setEditData={setEditData}
                                />
                            </Col>
                            <Col span={2}>
                                <Action
                                    item={item}
                                    setSpinning={setSpinning}
                                    loadData={loadData}
                                    page={page}
                                    size={size}
                                    editData={editData}
                                    setEditData={setEditData}
                                    setShowMovingModal={setShowMovingModal}
                                    setMovingItem={setMovingItem}
                                />
                            </Col>
                        </Row>
                    </List.Item>
                );
            }}
        >
            <MovingModal showMovingModal={showMovingModal}
                setShowMovingModal={setShowMovingModal}
                modelData={movingItem}
                setEditData={setEditData}
            />
        </List>
    );
}

export default CrawlerPage;
