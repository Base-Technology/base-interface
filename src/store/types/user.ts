import { WayID } from '@way-network/way-im/dist/types'

export type UserState = {
    identity: WayID
    isLogin: boolean
}

export const SET_IDENTITY = 'SET_IDENTITY'
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'

type SetIdentity = {
    type: typeof SET_IDENTITY
    payload: WayID
}

type SetLoginStatus = {
    type: typeof SET_LOGIN_STATUS
    payload: boolean
}

export type UserActionTypes = SetIdentity | SetLoginStatus