import React, {useEffect, useState} from "react";
import {Button, Carousel, Col, Divider, Form, Image, List, Row, Space, Tag, Tooltip, Typography} from "antd";
import axios from "axios";
import URL_CONFIG from "../../utils/URL_CONFIG";
import ModelData from "../../interface/ModelData";
import {DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined} from "@ant-design/icons";
import {InputNumber} from "antd/lib";
import "./crawler.css";
import {PaginationConfig} from "antd/es/pagination";

const {Link} = Typography;

function CrawlerPage(props: any) {

    const {setSpinning} = props;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const paging: PaginationConfig = {
        onChange: handlePageChange,
        pageSize: pageSize,
        total: total,
        responsive: true,
        hideOnSinglePage: true,
        showQuickJumper: false,
        showSizeChanger: false,
        showLessItems: true,
    }

    useEffect(() => {
        const loadData = (page: number, pageSize: number) => {
            setSpinning(true);
            const pagingParam = `/${page}/${pageSize}`;
            const url = URL_CONFIG.BASE + URL_CONFIG.CRAWL_MODEL + pagingParam;
            const token = localStorage.getItem("token");
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).catch((e: Error) => {
                setSpinning(false);
                alert(e.message)
            }).then((response) => {
                const result = response?.data;
                result.forEach((m: ModelData) => {
                    m.key = m.objectId
                });
                setData(result);
                setTotal(200);
                setSpinning(false);
            });
        }

        loadData(page, pageSize);
    }, [page, pageSize, setSpinning]);

    const meta = (item: ModelData) => {
        return (
            <List.Item.Meta
                title={
                    <Space direction="vertical">
                        <Link href={item.url}>{item.name}</Link>
                        <Divider/>
                    </Space>
                }
                description={item.rel.map((tag) => {
                    let color = tag.length > 8 ? "blue" : "green";
                    color = tag.length > 15 ? "red" : color;
                    return <Tag key={tag} color={color} className="model-tag">{tag.toUpperCase()}</Tag>;
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
                            <Image key={`${image}-${key}`} src={image} width={600} height={360}/>
                        );
                    })}
                </Carousel>
            </Image.PreviewGroup>

        );
    }

    const ratingForm = (item: ModelData) => {
        return (
            <Form name="rating"
                  layout="inline"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 14}}
            >
                <Form.Item label="FC" className="form-rating-item">
                    <InputNumber value={item.fc}/>
                </Form.Item>
                <Form.Item label="BD" className="form-rating-item">
                    <InputNumber value={item.bd}/>
                </Form.Item>
                <Form.Item label="SX" className="form-rating-item">
                    <InputNumber value={item.sx}/>
                </Form.Item>
                <Form.Item label="CT" className="form-rating-item">
                    <InputNumber value={item.ct}/>
                </Form.Item>
                <Form.Item label="BB" className="form-rating-item">
                    <InputNumber value={item.bb}/>
                </Form.Item>
                <Form.Item label="WA" className="form-rating-item">
                    <InputNumber value={item.wa}/>
                </Form.Item>
                <Form.Item label="HI" className="form-rating-item">
                    <InputNumber value={item.hi}/>
                </Form.Item>
                <Form.Item label="AVG" className="form-rating-item">
                    <InputNumber value={item.avg} disabled/>
                </Form.Item>
            </Form>
        );
    }

    const action = () => {
        return (
            <Space size="middle" direction="vertical">
                <Tooltip placement="right" title="Save">
                    <Button type="primary" shape="circle" name="save"><DownloadOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Move">
                    <Button type="default" shape="circle"><LoginOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Link">
                    <Button type="dashed" shape="circle"><SwapOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Skip">
                    <Button type="default" shape="circle" danger><DeleteOutlined/></Button>
                </Tooltip>
            </Space>
        );
    }

    function handlePageChange(pageNumber: number, pageSize: number) {
        setSpinning(true)
        setPage(pageNumber);
        setPageSize(pageSize);
    }

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
                            <Col span={6}>{ratingForm(item)}</Col>
                            <Col span={2}>{action()}</Col>
                        </Row>
                    </List.Item>
                );
            }}
        />
    );
}

export default CrawlerPage;
