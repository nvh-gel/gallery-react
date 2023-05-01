import { SearchOutlined } from "@ant-design/icons";
import { Button, Image, Input, List, Modal, Tag, Typography, message } from "antd";
import Link from "antd/es/typography/Link";
import axios from "axios";
import VirtualList from 'rc-virtual-list';
import React, { Dispatch, SetStateAction } from "react";
import { Model } from "../../../interface/ModelData";
import { config } from "../../../utils/Requests";
import { Urls } from "../../../utils/Urls";

interface LinkModelProp {
    showLinkModal: boolean,
    setShowLinkModel: Dispatch<SetStateAction<boolean>>,
    objectId: string,
    setSpinning: Dispatch<SetStateAction<boolean>>,
    loadData?: (p: number, z: number) => void,
    page?: number,
    size?: number,
}

interface LinkModelState {
    searchData: [],
    selected: boolean,
}

class LinkModel extends React.Component<LinkModelProp, LinkModelState> {

    constructor(props: LinkModelProp) {
        super(props);
        this.state = {
            searchData: [],
            selected: false,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event: any): void {
        const searchStr = event.target.value;
        if (searchStr === '') {
            this.setState({ searchData: [] });
        } else {
            const url = Urls.BASE + Urls.MODEL + Urls.SEARCH;
            const searchData = {
                criteria: {
                    name: event.target.value,
                }
            };
            axios.post(url, searchData, config)
                .catch((err: Error) => { })
                .then((response) => {
                    this.setState({ searchData: response?.data.data });
                });
        }
    }

    handleLink(modelId?: number, objectId?: string): void {

        this.props.setSpinning(true);
        if (!modelId || !objectId) { return; }
        let url = `${Urls.BASE}${Urls.CRAWL_MODEL}${Urls.LINK}`;
        url += `?modelId=${modelId}&objectId=${objectId}`;
        axios.post(url, null, config)
            .catch((err: Error) => {
                message.error(err.message)
                    .then(() => this.props.setSpinning(false));
            })
            .then((response) => {
                message.success(`${response?.data.message} ${response?.data.data}`)
                    .then(() => {
                        if (this.props.loadData && this.props.page && this.props.size) {
                            this.props.loadData(this.props.page, this.props.size)
                        }
                    });
            });
    }

    render() {
        const data = this.state.searchData;
        const listComponent = <List>
            <VirtualList
                data={data}
                height={500}
                itemKey="id"
            >
                {(item: Model) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={item.thumbnail}
                                preview={false}
                                width={200}
                                style={{ borderRadius: '20px' }}
                            />}
                            title={<Link target="_blank" href={item.url}>{item.name}</Link>}
                            description={<>
                                <Typography.Text style={{ paddingBottom: '20px' }}>
                                    {item.nativeName}
                                </Typography.Text>
                                <br />
                                {item.nicknames?.map((nick) => (
                                    <Tag color="green"
                                        style={{ marginTop: '10px' }}
                                        key={nick.nick}
                                    >
                                        {nick.nick}
                                    </Tag>
                                ))}
                            </>}
                        />
                        <Button type="link"
                            onClick={() => this.handleLink(item.id, this.props.objectId)}
                        >
                            Link
                        </Button>
                    </List.Item>
                )}
            </VirtualList>
        </List>

        return (
            <Modal
                zIndex={800}
                open={this.props.showLinkModal}
                onCancel={() => this.props.setShowLinkModel(false)}
                closable={false}
                width={800}
                footer={false}
            >
                <Input name="search-box"
                    placeholder="input model name"
                    size="large"
                    onInput={this.handleSearch}
                    prefix={<SearchOutlined />}
                />
                {data.length > 0 ? listComponent : ''}
            </Modal>
        );
    }
}

export default LinkModel;
