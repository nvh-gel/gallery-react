import { Dispatch, SetStateAction } from "react";
import ModelData, { Dictionary } from "./ModelData";

export default interface CrawlItemProp {
    item: ModelData,
    setSpinning?: (spinnin: boolean) => {},
    loadData?: (page: number, size: number) => void,
    page?: number,
    size?: number,
    editData?: Dictionary<ModelData>,
    setEditData?: Dispatch<SetStateAction<Dictionary<ModelData>>>,
    setShowMovingModal?: Dispatch<SetStateAction<boolean>>,
    setMovingItem?: Dispatch<SetStateAction<ModelData | undefined>>,
};
