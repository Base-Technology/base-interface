import { im } from "@/utils";
import { Dispatch } from "redux";
import { WayConversationItem } from "way-sdk-test/dist/types";
import { setCveList } from "../reducers/cve";




export const getCveList = () => {
    return (dispatch: Dispatch) => {
        im.listAllConversation()
            .then(res => {
                console.log(res.data);
                dispatch(setCveList(res.data))

            })
    }
}