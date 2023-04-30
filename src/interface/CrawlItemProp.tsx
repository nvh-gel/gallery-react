import { Dispatch, SetStateAction } from "react";
import { Dictionary, ModelData } from "./ModelData";

export default interface CrawlItemProp {
    item: ModelData,
    setSpinning?: Dispatch<SetStateAction<boolean>>,
    loadData?: (page: number, size: number) => void,
    page?: number,
    size?: number,
    editData?: Dictionary<ModelData>,
    setEditData?: Dispatch<SetStateAction<Dictionary<ModelData>>>,
};
