import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WayConversationItem } from "way-sdk-test/dist/types";
import { RootState } from "..";
import { CveActionTypes, CveState, SET_CUR_CVE, SET_CVE_LIST } from "../types/cve";



let initialState: CveState = {
    cves: [],
    curCve: null,
}

const lastUid = localStorage.getItem('lastimuid') || ''
const lastCveStore = localStorage.getItem(`${lastUid}cveStore`)
if (lastCveStore) {
    const tmp = JSON.parse(lastCveStore!)
    tmp.curCve = null
    initialState = tmp
}


export const cveSlice = createSlice({
    name: 'cves',
    initialState,
    reducers: {
        setCveList: (state, action: PayloadAction<WayConversationItem[]>) => {
            state.cves = action.payload
        },
        setCurCve: (state, action: PayloadAction<WayConversationItem>) => {
            state.curCve = action.payload
        }
    }
})

export const { setCveList, setCurCve } = cveSlice.actions
export const selectCveList = (state: RootState) => state.cves.cves

export const cveReducer = cveSlice.reducer