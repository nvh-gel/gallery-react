export default interface ModelData {
    key: string,
    objectId: string,
    name: string,
    url: string,
    rel: string[],
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

export function calculateAverage(numbers: number[]) {

    return Math.round(
        numbers.reduce((sum, current) => sum + current, 0) / numbers.length * 100
    ) / 100;
};

export interface Dictionary<T> {
    [id: string]: T
};
