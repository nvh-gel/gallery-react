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

export interface Model {
    id?: number,
    objectId?: string,
    name?: string,
    nativeName?: string,
    url?: string,
    thumbnail?: string,
    dateOfBirth?: Date,
    yearOfBirth?: number,
    boob?: number,
    waist?: number,
    hip?: number,
    description?: string,
    nicknames?: Nickname[],
}

export interface Nickname {
    id?: number,
    nick?: string,
    url?: string,
    modelId?: number,
}
