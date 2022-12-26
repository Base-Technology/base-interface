import { im } from "@/utils";
import { Dispatch } from "redux";
import { WayConversationItem } from "way-sdk-test/dist/types";
import { CveActionTypes, SET_CUR_CVE, SET_CVE_LIST } from "../types/cve";

export const setCveList = (value: WayConversationItem[]): CveActionTypes => {
    return {
        type: SET_CVE_LIST,
        payload: value,
    };
};

export const setCurCve = (value: WayConversationItem | null): CveActionTypes => {
    return {
        type: SET_CUR_CVE,
        payload: value,
    };
};

export const getCveList = () => {
    return (dispatch: Dispatch) => {
        im.listAllConversation()
            .then(res => {
                // console.log(JSON.parse(res.data));
                dispatch(setCveList(JSON.parse(res.data)))

            })
    }
}
