import { Pages } from "../utils/Pages";

interface User {
    username: string,
    token: string,
    level: number,
    defaultUrl: string,
}

export default User;

export function hasAccessTo(user: User, page: string) {
    return user.level >= Pages[page];
}
