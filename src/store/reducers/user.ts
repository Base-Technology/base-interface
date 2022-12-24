import { WayID } from "way-sdk-test/dist/types";
import { SET_ADMIN_TOKEN, SET_IDENTITY, UserActionTypes, UserState } from "../types/user";


let initialState: UserState = {
    identity: {} as WayID,
    token: ""
}

const lastUid = localStorage.getItem('lastimuid') || ''
const lastUserStore = localStorage.getItem(`${lastUid}userStore`)
if (lastUserStore) {
    initialState = JSON.parse(lastUserStore!)
}

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_IDENTITY:
            return { ...state, identity: action.payload }
        case SET_ADMIN_TOKEN:
            return { ...state, token: action.payload }
        default:
            return state;
    }

}