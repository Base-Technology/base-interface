import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WayConversationItem, WayID } from "way-sdk-test/dist/types";
import { RootState } from "..";
import { SET_LOGIN_STATUS, SET_IDENTITY, UserActionTypes, UserState } from "../types/user";


let initialState: UserState = {
    identity: {} as WayID,
    isLogin: false
}

const lastUid = localStorage.getItem('lastimuid') || ''
const lastUserStore = localStorage.getItem(`${lastUid}userStore`)
if (lastUserStore) {
    initialState = JSON.parse(lastUserStore!)
}

// export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
//     switch (action.type) {
//         case SET_IDENTITY:
//             return { ...state, identity: action.payload }
//         case SET_LOGIN_STATUS:
//             return { ...state, isLogin: action.payload }
//         default:
//             return state;
//     }

// }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        setIdentity: (state, action: PayloadAction<WayID>) => {
            state.identity = action.payload
        }
    }
})

export const { setLoginStatus, setIdentity } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export const userReducer = userSlice.reducer