import ModelData from "./ModelData";

export default interface CrawlItemProp {
    item: ModelData,
    setSpinning?: (spinnin: boolean) => {},
    loadData?: (page: number, size: number) => void,
}
