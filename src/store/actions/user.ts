import { im } from "@/utils";
import { Dispatch } from "redux";
import { WayID } from "way-sdk-test/dist/types";
import { SET_LOGIN_STATUS, SET_IDENTITY, UserActionTypes } from "../types/user";





export const setIdentity = (value: WayID): UserActionTypes => {
    return {
        type: SET_IDENTITY,
        payload: value
    }
}

export const setLoginStatus = (value: boolean): UserActionTypes => {
    return {
        type: SET_LOGIN_STATUS,
        payload: value,
    };
};

