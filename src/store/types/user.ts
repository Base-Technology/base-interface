import { WayID } from 'way-sdk-test/dist/types'

export type UserState = {
    identity: WayID
    token: string
}

export const SET_IDENTITY = 'SET_IDENTITY'
export const SET_ADMIN_TOKEN = 'SET_ADMIN_TOKEN'

type SetIdentity = {
    type: typeof SET_IDENTITY
    payload: WayID
}

type SetSelfToken = {
    type: typeof SET_ADMIN_TOKEN
    payload: string
}

export type UserActionTypes = SetIdentity | SetSelfToken