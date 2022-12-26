
import { WayConversationItem } from "way-sdk-test/dist/types"


export type CveState = {
    cves: WayConversationItem[]
    curCve: WayConversationItem | null

}

export const SET_CVE_LIST = "SET_CVE_LIST";
export const SET_CUR_CVE = "SET_CUR_CVE";
type SetCveList = {
    type: typeof SET_CVE_LIST;
    payload: WayConversationItem[];
};

type SetCurCve = {
    type: typeof SET_CUR_CVE;
    payload: WayConversationItem | null;
};

export type CveActionTypes = SetCveList | SetCurCve 