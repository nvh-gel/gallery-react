export interface ModelData {
    key: string,
    objectId: string,
    name: string,
    url: string,
    rel: ModelTag[],
    images: string[],
    fc: number,
    bb: number,
    wa: number,
    hi: number,
    bd: number,
    sx: number,
    ct: number,
    avg: number,
    numberOfAlbum: number,
};

export interface ModelTag {
    name: string,
    url: string,
    isPublisher: boolean,
    isCategory: boolean,
};

export function calculateAverage(numbers: number[]) {

    return Math.round(
        numbers.reduce((sum, current) => sum + current, 0) / numbers.length * 100
    ) / 100;
};

export interface Dictionary<T> {
    [id: string]: T
};
