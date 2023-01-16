
import { WayConversationItem } from "@way-network/way-im/dist/types"

export interface DisplayConversationItem extends WayConversationItem {
    checked: boolean
}

export type CveState = {
    cves: WayConversationItem[]
    curCve: WayConversationItem | null
}

