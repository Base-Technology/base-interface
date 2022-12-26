
import { WayConversationItem } from "way-sdk-test/dist/types"

export interface DisplayConversationItem extends WayConversationItem {
    checked: boolean
}

export type CveState = {
    cves: DisplayConversationItem[]
    curCve: DisplayConversationItem | null
}

