import { im } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WayConversationItem } from "way-sdk-test/dist/types";
import { RootState } from "..";
import { CveState, DisplayConversationItem } from "../types/cve";



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
            state.cves = convertFunc(action.payload)
        },
        setCurCve: (state, action: PayloadAction<WayConversationItem>) => {
            state.curCve = conversationItemTruncator(action.payload)
        },

    }
})

const conversationItemTruncator = (c: WayConversationItem): DisplayConversationItem => {
    return {
        ...c,
        checked: false
    }
}
const convertFunc = (cs: WayConversationItem[]): DisplayConversationItem[] => {
    let res = [] as DisplayConversationItem[]
    for (let i = 0; i < cs.length; i++) {
        res.push(conversationItemTruncator(cs[i]))
    }
    return res
}

export const { setCveList, setCurCve } = cveSlice.actions
export const selectCveList = (state: RootState) => state.cves.cves

export const cveReducer = cveSlice.reducer