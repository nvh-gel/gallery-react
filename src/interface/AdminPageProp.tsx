import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router";
import User from "./User";

export interface AdminPageProp {
    currentUser: User,
    setSpinning: Dispatch<SetStateAction<boolean>>,
    navigate: NavigateFunction,
}
