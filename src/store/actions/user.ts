import { WayID } from "way-sdk-test/dist/types";
import { SET_ADMIN_TOKEN, SET_IDENTITY, UserActionTypes } from "../types/user";





export const setIdentity = (value: WayID): UserActionTypes => {
    return {
        type: SET_IDENTITY,
        payload: value
    }
}

export const setAdminToken = (value: string): UserActionTypes => {
    return {
        type: SET_ADMIN_TOKEN,
        payload: value,
    };
};

